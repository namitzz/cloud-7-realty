export function validateProperty(row: any) {
  const issues: string[] = [];

  if (!row.id) issues.push("Missing ID");
  if (!row.title) issues.push("Missing title");
  if (!row.location) issues.push("Missing location");

  if (!row.images || row.images.length === 0) {
    issues.push("No images found");
  }

  return issues;
}
