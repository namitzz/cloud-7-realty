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
    // ✅ HARD BLOCK invalid folder names
    if (
      !folderName ||
      folderName === "." ||
      folderName === "-" ||
      folderName.trim() === ""
    ) {
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

    const folderRes = await drive.files.list({
      q: `'${rootFolderId}' in parents 
          and name contains '${folderName}'
 
          and mimeType='application/vnd.google-apps.folder' 
          and trashed=false`,
      fields: "files(id)",
    });

    const folder = folderRes.data.files?.[0];
    if (!folder?.id) {
      return [];
    }

    const imagesRes = await drive.files.list({
      q: `'${folder.id}' in parents 
          and mimeType contains 'image/' 
          and trashed=false`,
      fields: "files(id)",
      orderBy: "name",
      pageSize: 50,
    });

    const images =
  imagesRes.data.files?.map(
    (file) => `https://drive.google.com/uc?export=view&id=${file.id}`
  ) ?? [];


    imageCache.set(folderName, {
      images,
      expiresAt: now + CACHE_TTL,
    });

    return images;
  } catch {
    return [];
  }
}
