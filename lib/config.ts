/**
 * Centralized configuration for the application
 * 
 * This file consolidates all configuration values to avoid hardcoding them
 * throughout the codebase. Makes it easier to maintain and update settings.
 */

/**
 * WhatsApp Configuration
 */
export const WHATSAPP_CONFIG = {
  // Default WhatsApp number - fallback when env var is not set
  DEFAULT_NUMBER: '+919906599038',
  // Get WhatsApp number from env or use default
  getNumber: () => process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || WHATSAPP_CONFIG.DEFAULT_NUMBER,
} as const;

/**
 * Caching & Revalidation Configuration
 */
export const CACHE_CONFIG = {
  // Revalidate property data every 5 minutes (300 seconds)
  // This prevents excessive Google API calls while keeping data reasonably fresh
  PROPERTY_REVALIDATE_SECONDS: 300,
} as const;

/**
 * Default Images & Fallbacks
 */
export const IMAGE_CONFIG = {
  // Default fallback image when property images are not available
  // Used consistently across all property image scenarios
  DEFAULT_PROPERTY_IMAGE: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
} as const;

/**
 * Google API Configuration
 */
export const GOOGLE_CONFIG = {
  // Default range for Google Sheets (includes property_id in column A)
  DEFAULT_SHEETS_RANGE: 'Properties!A2:I',
  // Supported image formats for Google Drive
  SUPPORTED_IMAGE_FORMATS: ['image/jpeg', 'image/jpg', 'image/png'] as const,
  // Maximum images to fetch per property
  MAX_IMAGES_PER_PROPERTY: 100,
} as const;

/**
 * Property Status Configuration
 */
export const PROPERTY_CONFIG = {
  // Valid property status values
  VALID_STATUSES: ['Buy', 'Rent', 'Land'] as const,
  // Default status when invalid status is provided
  DEFAULT_STATUS: 'Buy' as const,
} as const;

/**
 * Check if Google Sheets is configured
 */
export function isGoogleSheetsConfigured(): boolean {
  return !!(
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID &&
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    process.env.GOOGLE_PRIVATE_KEY
  );
}

/**
 * Check if Google Drive is configured
 */
export function isGoogleDriveConfigured(): boolean {
  return !!(
    process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID &&
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    process.env.GOOGLE_PRIVATE_KEY
  );
}

/**
 * Validate property status value
 * Returns a valid status or the default status
 */
export function validatePropertyStatus(status: string): 'Buy' | 'Rent' | 'Land' {
  const normalizedStatus = status as 'Buy' | 'Rent' | 'Land';
  if (PROPERTY_CONFIG.VALID_STATUSES.includes(normalizedStatus)) {
    return normalizedStatus;
  }
  return PROPERTY_CONFIG.DEFAULT_STATUS;
}
