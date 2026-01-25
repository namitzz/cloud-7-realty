import { google } from "googleapis";

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
    const drive = getDriveClient();
    const rootFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    if (!rootFolderId) {
      throw new Error("Missing GOOGLE_DRIVE_FOLDER_ID");
    }


    // 1️⃣ Find subfolder
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
        // ✅ THIS IS THE FIX
        return `https://lh3.googleusercontent.com/d/${file.id}=w2000`;
      }) ?? [];


    return images;
  } catch (err) {
    console.error("❌ Error fetching images from Drive:", err);
    return [];
  }
}
