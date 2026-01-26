import { google } from "googleapis";
import { getImagesFromFolder } from "./drive";

export interface SheetProperty {
  id: string;
  title: string;
  location: string;
  area: string;
  status: string;
  price: string;
  images: string[];
  description?: string;
  featured: boolean;
}

function getSheetsClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !key) {
    throw new Error("Google Sheets credentials not configured");
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: email,
      private_key: key,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  return google.sheets({ version: "v4", auth });
}

export async function fetchPropertiesFromSheet(): Promise<SheetProperty[]> {
  const sheets = getSheetsClient();

  const spreadsheetId =
    process.env.GOOGLE_SHEET_ID ||
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!spreadsheetId) {
    throw new Error("Missing GOOGLE_SHEET_ID");
  }

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Projects!A2:I",
  });

  const rows = res.data.values ?? [];

  return Promise.all(
    rows.map(async (row) => {
      const rawFolder = row[6]?.toString().trim();
      const folderName =
        rawFolder && rawFolder !== "." && rawFolder !== "-"
          ? rawFolder
          : null;

      const rawFeatured = row[8];
      const featured =
        typeof rawFeatured === "boolean"
          ? rawFeatured
          : typeof rawFeatured === "string"
          ? rawFeatured.trim().toLowerCase() === "true"
          : false;

      return {
        id: row[0]?.toString().trim() ?? "",
        title: row[1]?.toString().trim() ?? "",
        location: row[2]?.toString().trim() ?? "",
        area: row[3]?.toString().trim() ?? "",
        status: row[4]?.toString().trim() ?? "",
        price: row[5]?.toString().trim() ?? "",

      const images = folderName
  ? await getImagesFromFolder(folderName)
  : [];

console.log("IMAGES FOR", folderName, images);

return {
  ...
  images,
};



        description: row[7]?.toString().trim() ?? "",
        featured,
      };
    })
  );
}
