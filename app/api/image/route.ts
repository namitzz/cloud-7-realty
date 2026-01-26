import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get("id");

  if (!fileId) {
    return new NextResponse("Missing image ID", { status: 400 });
  }

  const SERVICE_ACCOUNT = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!);

  const auth = new google.auth.GoogleAuth({
    credentials: SERVICE_ACCOUNT,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });

  const drive = google.drive({ version: "v3", auth });

  try {
    // Get MIME type
    const meta = await drive.files.get({
      fileId,
      fields: "mimeType",
    });

    const mime = meta.data.mimeType || "image/jpeg";

    // Stream file
    const file = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "stream" }
    );

    const stream = file.data as any;

    return new Response(stream, {
      headers: {
        "Content-Type": mime,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    console.error("Image proxy error:", err);
    return new NextResponse("Failed to fetch image", { status: 500 });
  }
}
