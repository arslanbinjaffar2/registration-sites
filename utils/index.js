// utils.js

/**
 * Function to strip script tags from a given string but preserve their content
 * @param {string} htmlString - The input string containing potential script tags
 * @returns {string} - The cleaned string with script tags removed but their content preserved
 */
export function removeScriptTags(htmlString) {
  // Check if document is defined (browser environment)
  if (typeof document !== 'undefined') {
      // Create a temporary DOM element
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlString;

      // Select all <script> tags
      const scriptTags = tempDiv.querySelectorAll('script');

      // Replace each <script> tag with its content
      scriptTags.forEach(script => {
          const scriptContent = document.createTextNode(script.innerHTML);
          script.parentNode.replaceChild(scriptContent, script);
      });

      // Return the modified HTML string
      return tempDiv.innerHTML;
  } else {
      // Server-side environment: use a regex-based approach to remove script tags but keep their content
      return htmlString.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, '$1');
  }
}
