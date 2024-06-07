// utils.js

/**
 * Function to strip script tags from a given string
 * @param {string} text - The input string containing potential script tags
 * @returns {string} - The cleaned string with script tags removed
 */
export function removeScriptTags (htmlString) {
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
}

