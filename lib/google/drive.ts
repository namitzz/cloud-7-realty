import { google } from "googleapis";

/**
 * Simple in-memory cache for folder images
 * Key   → folderName (e.g. "PROP 001")
 * Value → images + expiry timestamp
 */
const imageCache = new Map<
  string,
  { images: string[]; expiresAt: number }
>();

// Cache duration: 10 minutes
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
 * Fetch all images inside:
 * ROOT_FOLDER / <folderName>
 *
 * Returns TRUE raw image URLs (Next.js compatible)
 */
export async function getImagesFromFolder(
  folderName: string
): Promise<string[]> {
  try {
    // 🔹 0️⃣ Check cache first
    const now = Date.now();
    const cached = imageCache.get(folderName);

    if (cached && cached.expiresAt > now) {
      return cached.images;
    }

    const drive = getDriveClient();
    const rootFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    if (!rootFolderId) {
      throw new Error("Missing GOOGLE_DRIVE_FOLDER_ID");
    }

    // 1️⃣ Find subfolder (PROP 001, PROP 002, etc.)
    const folderRes = await drive.files.list({
      q: `'${rootFolderId}' in parents 
          and name='${folderName}' 
          and mimeType='application/vnd.google-apps.folder' 
          and trashed=false`,
      fields: "files(id, name)",
    });

    const folder = folderRes.data.files?.[0];

    if (!folder?.id) {
      return [];
    }

    // 2️⃣ Fetch image files only
    const imagesRes = await drive.files.list({
      q: `'${folder.id}' in parents 
          and mimeType contains 'image/' 
          and trashed=false`,
      fields: "files(id, name)",
      orderBy: "name",
      pageSize: 50,
    });

    // 3️⃣ Convert to RAW image URLs
    const images =
      imagesRes.data.files?.map((file) => {
        return `https://lh3.googleusercontent.com/d/${file.id}=w2000`;
      }) ?? [];

    // 🔹 4️⃣ Store in cache
    imageCache.set(folderName, {
      images,
      expiresAt: now + CACHE_TTL,
    });

    return images;
  } catch (err) {
    console.error("❌ Error fetching images from Drive:", err);
    return [];
  }
}
