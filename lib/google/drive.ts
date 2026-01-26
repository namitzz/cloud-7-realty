import { google } from "googleapis";

/**
 * Simple in-memory cache for folder images
 */
const imageCache = new Map<
  string,
  { images: string[]; expiresAt: number }
>();

const CACHE_TTL = 1000 * 60 * 10;

/**
 * Creates a Google Drive client using a service account
 */
function getDriveClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !key) {
    throw new Error("Google Drive credentials not configured");
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: email,
      private_key: key,
    },
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });

  return google.drive({ version: "v3", auth });
}

/**
 * Fetch images from:
 * ROOT_FOLDER / <folderName>
 */
export async function getImagesFromFolder(
  folderName: string
): Promise<string[]> {
  try {
    // ❌ block bad names
    if (!folderName || folderName.trim() === "-" || folderName.trim() === ".") {
      return [];
    }

    const now = Date.now();
    const cached = imageCache.get(folderName);
    if (cached && cached.expiresAt > now) {
      return cached.images;
    }

    const drive = getDriveClient();
    const rootFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    if (!rootFolderId) {
      return [];
    }

    // 1️⃣ list all subfolders under root
    const foldersRes = await drive.files.list({
      q: `'${rootFolderId}' in parents 
          and mimeType='application/vnd.google-apps.folder'
          and trashed=false`,
      fields: "files(id, name)",
      pageSize: 100,
    });

    const folders = foldersRes.data.files ?? [];

    // 2️⃣ normalize names
    const normalize = (s: string) =>
      s.trim().toLowerCase().replace(/\s+/g, " ");

    // 3️⃣ find matching folder
    const target = folders.find(
      (f) => normalize(f.name) === normalize(folderName)
    );

    if (!target?.id) {
      console.log("DRIVE MISS →", folderName);
      return [];
    }

    // 4️⃣ list images inside folder ✅ FIXED LINE
    const imagesRes = await drive.files.list({
      q: `'${target.id}' in parents 
          and mimeType contains 'image/' 
          and trashed=false`,
      fields: "files(id)",
      orderBy: "name",
      pageSize: 50,
    });

    const images =
      imagesRes.data.files?.map(
        (file) =>
          `https://drive.google.com/uc?export=view&id=${file.id}`
      ) ?? [];

    imageCache.set(folderName, {
      images,
      expiresAt: now + CACHE_TTL,
    });

    console.log("DRIVE OK →", folderName, images.length);

    return images;
  } catch (err) {
    console.error("DRIVE ERROR →", folderName, err);
    return [];
  }
}
