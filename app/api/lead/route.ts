import { google } from "googleapis";
import { NextResponse } from "next/server";

const SHEET_ID = process.env.GOOGLE_SHEET_ID!;
const SERVICE_ACCOUNT = JSON.parse(
  process.env.GOOGLE_SERVICE_ACCOUNT_JSON!
);

// Sheet tabs
const SHEET_TABS = {
  contact: "Contacted Messages", // TAB 3 ✅
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email = "",
      phone,
      message = "",
      type = "contact",
      timestamp,
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "Name and phone are required" },
        { status: 400 }
      );
    }

    // Auth
    const auth = new google.auth.GoogleAuth({
      credentials: SERVICE_ACCOUNT,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Append to TAB 3
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_TABS.contact}!A1`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            new Date(timestamp || Date.now()).toLocaleString(),
            name,
            email,
            phone,
            message,
            type,
          ],
        ],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead submission failed:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save lead" },
      { status: 500 }
    );
  }
}
