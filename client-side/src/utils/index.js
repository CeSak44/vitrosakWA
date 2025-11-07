/**
 * Creates a URL path for a given page name
 * @param {string} pageName - The name of the page (e.g., "Home", "Products", "About", "Gallery")
 * @returns {string} - The URL path for the page
 */
export function createPageUrl(pageName) {
  // Convert page name to lowercase for URL
  const normalizedName = pageName.toLowerCase();
  
  // Special case: Home page should be "/"
  if (normalizedName === "home") {
    return "/";
  }
  
  // For other pages, return "/pagename"
  return `/${normalizedName}`;
}

