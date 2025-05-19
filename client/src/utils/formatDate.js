export function formatDate(isoString) {
  const date = new Date(isoString);
  
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-US', options); // e.g., "15 May 2025"
}
