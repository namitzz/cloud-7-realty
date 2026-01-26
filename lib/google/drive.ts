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
    console.error("❌ DRIVE → Missing service account credentials");
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
    console.log("📂 DRIVE START →", folderName);

    if (!folderName || folderName.trim() === "-" || folderName.trim() === ".") {
      console.log("⛔ DRIVE SKIP (invalid name)");
      return [];
    }

    // Cache
    const now = Date.now();
    const cached = imageCache.get(folderName);
    if (cached && cached.expiresAt > now) {
      console.log("⚡ DRIVE CACHE HIT →", folderName, cached.images.length);
      return cached.images;
    }

    const drive = getDriveClient();
    const rootFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    if (!rootFolderId) {
      console.error("❌ DRIVE → Missing GOOGLE_DRIVE_FOLDER_ID");
      return [];
    }

    console.log("📁 DRIVE ROOT ID →", rootFolderId);

    /**
     * 1️⃣ List ALL folders under root
     */
    const foldersRes = await drive.files.list({
      q: `'${rootFolderId}' in parents 
          and mimeType='application/vnd.google-apps.folder'
          and trashed=false`,
      fields: "files(id, name)",
      pageSize: 100,
    });

    const folders = foldersRes.data.files ?? [];

    console.log("📦 DRIVE ROOT SUBFOLDERS →", folders.map((f) => f.name));

    const normalize = (s: string) =>
      s.trim().toLowerCase().replace(/\s+/g, " ");

    /**
     * 2️⃣ Find matching folder
     */
    const target = folders.find(
      (f) => normalize(f.name) === normalize(folderName)
    );

    if (!target?.id) {
      console.log("❌ DRIVE MISS →", folderName);
      return [];
    }

    console.log("✅ DRIVE FOLDER FOUND →", target.name, target.id);

    /**
     * 3️⃣ List images inside folder
     */
    const imagesRes = await drive.files.list({
      q: `'${target.id}' in parents 
          and (mimeType='image/jpeg' or mimeType='image/png' or mimeType='image/webp')
          and trashed=false`,
      fields: "files(id, name, mimeType)",
      orderBy: "name",
      pageSize: 100,
    });

    const files = imagesRes.data.files ?? [];

    console.log("🖼️ DRIVE FILES →", files.map((f) => f.name));

    /**
     * 4️⃣ Convert to PROXY URLs (important!)
     */
    const images = files.map((file) => `/api/image?id=${file.id}`);

    console.log("🎉 DRIVE OK →", folderName, images.length);

    imageCache.set(folderName, {
      images,
      expiresAt: now + CACHE_TTL,
    });

    return images;
  } catch (err) {
    console.error("🔥 DRIVE ERROR →", folderName, err);
    return [];
  }
}
