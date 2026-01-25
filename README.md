# Cloud Seven Realty Website

A modern real estate website powered entirely by Google Sheets and Google Drive. All content is managed through Google Sheets with no code deployment required for content updates.

## What This Website Does

This website showcases your real estate properties and projects to potential clients. Visitors can:
- Browse available properties (for sale, rent, or land)
- View project listings with details
- View property and project details with image galleries
- Filter properties by type and location
- Contact you directly via WhatsApp or contact form
- Learn about your company and services

## How Content Updates Work

**🎉 No Code Deployment Required for Content Updates!**

All property and project data is managed through Google Sheets and Google Drive:

1. **Edit Your Google Sheet** - Add, update, or remove properties and projects
2. **Update Photos in Google Drive** - Upload or replace images in Drive folders
3. **Wait 5 Minutes** - Changes automatically appear on your website

That's it! No developer needed, no code changes, no redeployment.

### Data Source Architecture

**Google Sheets** is the single source of truth for ALL content:
- ✅ **Properties** - Listings, prices, descriptions, status
- ✅ **Projects** - Project information, pricing, highlights
- ✅ **Featured Projects** - First 3 projects from the sheet appear on homepage

**Google Drive** stores ALL images:
- ✅ **Property Images** - Organized in folders by property ID
- ✅ **Project Images** - Organized in folders by project ID

### How Updates Appear on the Website

The website uses **Incremental Static Regeneration (ISR)** with a 5-minute cache:
- First visitor after an update triggers a rebuild
- Subsequent visitors see cached version for performance
- Cache refreshes every 5 minutes
- **Maximum delay: 5 minutes** from saving your sheet to seeing changes live

## Managing Your Content

### Google Sheets - Your Content Database

Your Google Sheets spreadsheet contains TWO sheets:

#### Sheet 1: "Properties"

Columns:
- **id** - Unique identifier (e.g., "PROP_001") - must match Google Drive folder name
- **title** - Property name (e.g., "Luxury Villa in Downtown")
- **location** - Area or locality (e.g., "Downtown")
- **price** - Price with units (e.g., "2.5Cr" or "25K/month")
- **description** - Full property description
- **image_file_id** - Google Drive folder ID or folder name for images
- **size** - Property size (e.g., "3500 sqft" or "2 kanal")
- **status** - Property type: "Buy", "Rent", or "Land"

#### Sheet 2: "Projects"

Columns:
- **id** - Unique identifier (e.g., "PROJ_001") - must match Google Drive folder name
- **title** - Project name (e.g., "Sunrise Valley")
- **location** - Project location (e.g., "Downtown, Near Highway")
- **price** - Price range (e.g., "From ₹45 Lakhs")
- **description** - Full project description
- **image_file_id** - Google Drive folder ID or folder name for images
- **size** - Size range (e.g., "5-10 kanal")
- **status** - Project status (e.g., "Launching", "Ready", "Sold Out")
- **tagline** - Short tagline for project card
- **highlights** - Comma-separated list (e.g., "Gated community, 24/7 security, Near highway")

### Managing Content in Google Sheets

**To add a new property or project:**
1. Open your Google Sheet
2. Go to the appropriate tab (Properties or Projects)
3. Add a new row with all the required information
4. Save the sheet
5. Wait 5 minutes - it will appear on your website!

**To edit existing content:**
1. Find the row in your sheet
2. Update any column values
3. Save the sheet
4. Wait 5 minutes - changes will be live!

**To remove content:**
1. Delete the entire row
2. Save the sheet
3. Wait 5 minutes - it will be removed from your website!

### Google Drive - Photo Management

Your photos are organized in Google Drive:

**Folder Structure:**
```
📁 Main Content Folder (set in GOOGLE_DRIVE_FOLDER_ID)
  ├── 📁 PROP_001 (property ID)
  │   ├── 🖼️ image1.jpg
  │   ├── 🖼️ image2.jpg
  │   └── 🖼️ image3.jpg
  ├── 📁 PROP_002
  │   └── 🖼️ ...
  ├── 📁 PROJ_001 (project ID)
  │   ├── 🖼️ hero.jpg
  │   ├── 🖼️ gallery1.jpg
  │   └── 🖼️ ...
  └── 📁 PROJ_002
      └── 🖼️ ...
```

**Photo Requirements:**
- Supported formats: JPG, JPEG, PNG
- Recommended size: At least 1200px wide
- Photos display in alphabetical order by filename
- First photo becomes the featured/hero image

**To add photos:**
1. Open your Google Drive
2. Navigate to your main content folder
3. Find the folder matching your property/project ID
4. Upload new photos
5. Wait 5 minutes - they'll appear in the gallery!

**To update photos:**
1. Replace or rename existing photos in Drive
2. Wait 5 minutes - changes will be live!

### What You Can Update Without a Developer

✅ **Property listings** - Add, edit, remove via Google Sheets  
✅ **Project listings** - Add, edit, remove via Google Sheets  
✅ **Featured projects** - First 3 projects automatically featured  
✅ **Photos** - Upload, replace, organize in Google Drive  
✅ **Prices and descriptions** - Edit directly in the sheet  
✅ **Status updates** - Change property/project status  

### What Requires a Developer (Code Changes)

❌ **Site design** - Layout, colors, fonts, navigation  
❌ **Site settings** - WhatsApp number, analytics  
❌ **New features** - Additional pages or functionality  
❌ **Site structure** - Menu items, page organization  

## Running the Website Locally

### First-Time Setup

1. **Install Node.js**: Download and install from [nodejs.org](https://nodejs.org) (version 20 or newer)

2. **Download the project files**:
   ```bash
   # If using Git
   git clone https://github.com/namitzz/cloudsevenrealty.git
   cd cloudsevenrealty
   ```

3. **Install required packages**:
   ```bash
   npm install
   ```

4. **Configure your settings** (see "Configuration" section below)

### Starting the Website

```bash
# Start the development server
npm run dev
```

Open your browser and go to: `http://localhost:3000`

The website will automatically reload when you make changes.

### Building for Production

```bash
# Create an optimized production build
npm run build

# Start the production server
npm start
```

### Checking for Issues

```bash
# Check code style
npm run lint

# Check for type errors
npm run type-check
```

## Configuration

### Required Settings

The website needs certain information to work properly. These are stored in a file called `.env.local` in your project folder.

**To set up:**
1. Copy the `.env.example` file and rename it to `.env.local`
2. Fill in your specific values (see below)

### Environment Variables Explained

```env
# Website URL
# Use http://localhost:3000 for local development
# Use your actual domain for production (e.g., https://cloudsevenrealty.com)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# WhatsApp Contact Number
# Your WhatsApp business number (include country code)
# Example: 919876543210 for an Indian number
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210

# Google Sheets - ALL Content Data Source
# Get these from your Google Cloud service account (see docs/GOOGLE_SHEETS_SETUP.md)
# Your spreadsheet MUST have two sheets: "Properties" and "Projects"
GOOGLE_SHEET_ID=                        # ID from your Google Sheet URL
GOOGLE_SERVICE_ACCOUNT_EMAIL=           # Service account email
GOOGLE_PRIVATE_KEY=                     # Service account private key (with \n for newlines)

# Google Drive - ALL Content Images
# Uses same service account as Google Sheets
# This folder contains subfolders for each property/project (named by ID)
GOOGLE_DRIVE_FOLDER_ID=                 # Your main content folder ID from Drive

# Optional: Analytics
# Only needed if you want to track website visitors
GA_MEASUREMENT_ID=                      # Google Analytics measurement ID
```

**Important Notes:**
- The Google Sheets and Drive integration requires a one-time setup (see `docs/GOOGLE_SHEETS_SETUP.md`)
- Without Google Sheets/Drive configured, the website will show no content
- Your spreadsheet MUST have TWO sheets named exactly: "Properties" and "Projects"
- Never share your `.env.local` file or commit it to version control
- Keep your private keys secret

### Quick Setup Guide

For detailed instructions on setting up Google Sheets and Drive integration, see:
- **Google Sheets Setup**: `docs/GOOGLE_SHEETS_SETUP.md`
- **Google Drive Setup**: `docs/GOOGLE_DRIVE_INTEGRATION.md`

## Deploying Your Website

### Option 1: Vercel (Recommended - Best for Dynamic Content)

Vercel is the recommended hosting platform because it fully supports server-side rendering and Incremental Static Regeneration (ISR):

1. **Sign up** at [vercel.com](https://vercel.com) (free for personal projects)
2. **Connect your GitHub** account
3. **Import your repository**
4. **Add environment variables** from your `.env.local` file (see below)
5. **Deploy** - Your site will be live in minutes!

**Benefits:**
- Automatic deployments when you push code changes
- Full support for server-side rendering
- ISR caching for performance (5-minute refresh)
- Free SSL certificate (https)
- Fast global CDN
- Contact forms and API routes work perfectly

### Option 2: Other Node.js Hosting

You can also deploy to any platform that supports Node.js and Next.js:
- **Netlify** - Supports Next.js with server functions
- **Railway** - Simple Node.js hosting
- **DigitalOcean App Platform** - Managed Node.js hosting
- **AWS Amplify** - Full-featured AWS deployment

**Note:** Do NOT use static export hosting (like GitHub Pages) as this site requires server-side data fetching.

### Important: Environment Variables in Production

When deploying, remember to add ALL your environment variables from `.env.local` to your hosting platform:
- `GOOGLE_SHEET_ID` (or `GOOGLE_SHEETS_SPREADSHEET_ID` for backward compatibility)
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_DRIVE_FOLDER_ID`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_SITE_URL`

**Never commit your `.env.local` file to Git!**

## Project Structure (For Developers)

This section is for developers who need to understand the codebase.

```
cloudsevenrealty/
├── app/                      # Page routes (App Router)
│   ├── properties/           # Properties listing & detail pages
│   ├── projects/             # Projects listing & detail pages
│   ├── contact/              # Contact form
│   └── page.tsx              # Home page
├── components/               # Reusable UI components
│   ├── Navbar.tsx            # Navigation menu
│   ├── Footer.tsx            # Footer
│   ├── PropertyCard.tsx      # Property display card
│   ├── ProjectCard.tsx       # Project display card
│   ├── FeaturedProjects.tsx  # Featured projects component
│   └── Gallery.tsx           # Image gallery
├── lib/                      # Backend logic & data layer
│   ├── google/               # Google API integrations
│   │   ├── sheets.ts         # Fetch from Google Sheets
│   │   └── drive.ts          # Fetch images from Google Drive
│   ├── data.ts               # Unified data layer (combines Sheets + Drive)
│   └── types.ts              # TypeScript type definitions
├── docs/                     # Documentation
│   ├── GOOGLE_SHEETS_SETUP.md
│   └── GOOGLE_DRIVE_INTEGRATION.md
└── public/                   # Static files (logo, favicon, etc.)
```

### Key Files to Know

**For Content Management:**
- No files to edit! All content is in Google Sheets/Drive

**For Developers:**
- `lib/google/sheets.ts` - Google Sheets API integration
- `lib/google/drive.ts` - Google Drive API integration  
- `lib/data.ts` - Main data layer that combines Sheets + Drive
- `app/properties/page.tsx` - Properties listing page
- `app/projects/page.tsx` - Projects listing page
- `components/FeaturedProjects.tsx` - Homepage featured projects

## Troubleshooting

### No Properties or Projects Showing Up?

1. **Check your Google Sheet**:
   - Is it shared with your service account email?
   - Does it have TWO sheets named exactly "Properties" and "Projects"?
   - Does each sheet have the correct column headers?
   - Is data starting from row 2 (row 1 is headers)?

2. **Check environment variables**:
   - Are all Google-related variables set correctly?
   - Is the `GOOGLE_PRIVATE_KEY` properly formatted (with `\n` for line breaks)?
   - Is the spreadsheet ID correct?
   - Is the Drive folder ID correct?

3. **Check the console**:
   - Run `npm run dev` and look for error messages in the terminal
   - Open browser DevTools (F12) and check for errors

4. **Restart the server**:
   - Stop the dev server (Ctrl+C)
   - Start it again with `npm run dev`

### Images Not Loading?

1. **Check Google Drive folder**:
   - Is the folder ID correct in your `.env.local`?
   - Are the subfolder names matching IDs from your sheet (property_id or project_id)?
   - Are images in JPG, JPEG, or PNG format?

2. **Check folder permissions**:
   - Is the main content folder shared with your service account?
   - Are subfolders inheriting permissions?

3. **Check folder naming**:
   - Folder names must EXACTLY match the ID column in your sheet
   - Example: Sheet has "PROP_001" → Drive folder must be named "PROP_001"

### Content Not Updating?

1. **Wait 5 minutes**: ISR caching means changes take up to 5 minutes to appear
2. **Clear cache**: In development, restart the dev server
3. **Check your changes were saved**: Ensure you saved the Google Sheet after editing
4. **Hard refresh**: In browser, press Ctrl+Shift+R (or Cmd+Shift+R on Mac)

### Build Errors?

Common issues:
- **"Google Sheets not configured"**: Normal warning if env vars not set - won't prevent build
- **TypeScript errors**: Check that all required columns exist in your sheet structure
- **Image errors**: Ensure Google Drive images are publicly accessible or service account has permissions

2. **Check folder permissions**:
   - Is the main "Properties" folder shared with your service account?
   - Are subfolders inheriting permissions?

### Website Shows Sample Properties

This is normal! If Google Sheets/Drive is not configured, the website displays sample properties. This lets you:
- See how the website looks and works
- Test locally without setting up Google integration first
- Develop and design without backend dependencies

To use your real property data, complete the Google Sheets and Drive setup.

## Getting Help

**For setup and configuration questions:**
- Check `docs/GOOGLE_SHEETS_SETUP.md` for detailed setup instructions
- Review the error messages in your terminal
- Verify your environment variables are correct

**For technical/development issues:**
- Open an issue on GitHub
- Include error messages and what you tried
- Specify if it's local development or production

## Support

For questions or assistance:
- 📧 Email: info@cloudsevenrealty.com
- 💬 WhatsApp: (link in website footer)
- 🐛 GitHub Issues: For technical problems

---

**Built with ❤️ using Next.js 14**
