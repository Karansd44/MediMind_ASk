/**
 * Debugging Guide for Symptom Analysis Issues
 * 
 * If you're seeing "We're currently unable to analyze your symptoms" error:
 * 
 * 1. Open Browser Developer Console (F12)
 * 2. Go to Console tab
 * 3. Look for error messages that start with:
 *    - "Error analyzing symptoms:"
 *    - "API Response Error:"
 *    - "Making API request to:"
 * 
 * Common Issues and Solutions:
 * 
 * Issue 1: "API key not found in environment variables"
 * Solution: 
 *   - Stop the development server (Ctrl+C)
 *   - Verify .env file has REACT_APP_GEMINI_API_KEY=AIzaSyCETKavjf6ZJdPYtmmbZdl_1s1HNLQ7Ddo
 *   - Restart: npm start
 * 
 * Issue 2: "API request failed: 400 Bad Request"
 * Solution:
 *   - Check if API key is valid
 *   - Test with: node quick-test.js
 *   - If test passes, it's a React build issue - clear build cache
 * 
 * Issue 3: "API request failed: 403 Forbidden"
 * Solution:
 *   - API key might be restricted or quota exceeded
 *   - Check Google Cloud Console for API restrictions
 *   - Verify API key has Generative Language API enabled
 * 
 * Issue 4: Network/CORS errors
 * Solution:
 *   - Check internet connection
 *   - Try disabling browser extensions
 *   - Check if company/school firewall is blocking API
 * 
 * Issue 5: JSON parsing errors
 * Solution:
 *   - This is now handled automatically with fallbacks
 *   - Check console for "Parsing API response JSON..." messages
 * 
 * Testing Steps:
 * 
 * 1. Test API independently:
 *    node quick-test.js
 * 
 * 2. If Step 1 works, restart React app:
 *    - Stop server (Ctrl+C)
 *    - Delete node_modules/.cache (if exists)
 *    - npm start
 * 
 * 3. Open browser console and submit symptoms
 * 
 * 4. Check console for detailed error messages
 * 
 * 5. Common console messages and what they mean:
 * 
 *    "Making API request to: https://generativelanguage..."
 *    → API call is being attempted (good sign)
 * 
 *    "API Response received, checking for candidates..."
 *    → API responded successfully (good sign)
 * 
 *    "JSON parsed successfully. Predictions found: 3"
 *    → Everything working correctly
 * 
 *    "API Response Error: 400"
 *    → Bad request - likely API key or payload issue
 * 
 *    "API Response Error: 429"
 *    → Rate limit exceeded - wait a minute and try again
 * 
 *    "Failed to fetch"
 *    → Network issue or CORS problem
 * 
 * Manual API Test (Browser Console):
 * 
 * Paste this in browser console to test API directly:
 * 
 * ```javascript
 * fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCETKavjf6ZJdPYtmmbZdl_1s1HNLQ7Ddo', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     contents: [{ parts: [{ text: "Test" }] }]
 *   })
 * })
 * .then(r => r.json())
 * .then(d => console.log('API Test Result:', d))
 * .catch(e => console.error('API Test Error:', e));
 * ```
 * 
 * If this works in console but not in app, it's a React environment variable issue.
 * 
 * Environment Variable Checklist:
 * ✓ .env file is in project root (same level as package.json)
 * ✓ Variables start with REACT_APP_
 * ✓ No spaces around = sign
 * ✓ No quotes around values (unless they contain spaces)
 * ✓ Server was restarted after .env changes
 * ✓ Build cache cleared if needed (delete node_modules/.cache)
 * 
 * Still Not Working?
 * 
 * 1. Check .env file encoding (should be UTF-8)
 * 2. Verify no trailing spaces in API key
 * 3. Try creating a fresh .env.local file with just the API key
 * 4. Check for any .env.production or .env.development overrides
 * 5. Verify React version supports env variables (>= 16.8)
 * 
 * Contact Support With:
 * - Browser console screenshots
 * - Network tab showing API request/response
 * - Result of: node quick-test.js
 * - Operating system and browser version
 */

// Quick diagnostic script - run in browser console:
const diagnose = () => {
  console.log('=== Symptom Analysis Diagnostic ===');
  console.log('Environment Variables:');
  console.log('- REACT_APP_GEMINI_API_KEY:', process.env.REACT_APP_GEMINI_API_KEY ? 'SET ✓' : 'NOT SET ✗');
  console.log('- REACT_APP_GEMINI_API_KEY_ALT:', process.env.REACT_APP_GEMINI_API_KEY_ALT ? 'SET ✓' : 'NOT SET ✗');
  
  if (process.env.REACT_APP_GEMINI_API_KEY) {
    console.log('API Key (first 10 chars):', process.env.REACT_APP_GEMINI_API_KEY.substring(0, 10) + '...');
  }
  
  console.log('\nTesting API call...');
  
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY_ALT;
  
  fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`)
    .then(r => r.json())
    .then(d => {
      console.log('✓ API Connection Successful!');
      console.log('Available models:', d.models?.length || 0);
    })
    .catch(e => {
      console.error('✗ API Connection Failed:', e.message);
    });
};

// Export for use in browser
if (typeof window !== 'undefined') {
  window.diagnoseSymptomAnalysis = diagnose;
  console.log('Diagnostic function loaded. Run: diagnoseSymptomAnalysis()');
}
