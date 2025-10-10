# 🚨 CORS Fix Instructions

## The Problem

You're getting a CORS error because Google Apps Script doesn't allow cross-origin requests from local development servers by default.

## 🛠️ Solution Steps

### Step 1: Update Your Google Apps Script Code

1. **Open your Google Sheet**
2. **Go to Extensions → Apps Script**
3. **Replace ALL the existing code** with this updated version:

```javascript
function doGet(e) {
  try {
    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    const rows = sheet.getDataRange().getValues();
    const headers = rows.shift();
    const data = rows.map((r) =>
      Object.fromEntries(r.map((v, i) => [headers[i], v]))
    );

    const callback = e.parameter.callback;
    const jsonData = JSON.stringify(data);

    if (callback) {
      // JSONP response
      return ContentService.createTextOutput(
        `${callback}(${jsonData})`
      ).setMimeType(ContentService.MimeType.JAVASCRIPT);
    } else {
      // Regular JSON response with CORS headers
      return ContentService.createTextOutput(jsonData)
        .setMimeType(ContentService.MimeType.JSON)
        .setHeaders({
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
        });
    }
  } catch (error) {
    const errorResponse = {
      error: "Failed to fetch data",
      message: error.toString(),
    };

    const callback = e.parameter.callback;
    const jsonData = JSON.stringify(errorResponse);

    if (callback) {
      return ContentService.createTextOutput(
        `${callback}(${jsonData})`
      ).setMimeType(ContentService.MimeType.JAVASCRIPT);
    } else {
      return ContentService.createTextOutput(jsonData)
        .setMimeType(ContentService.MimeType.JSON)
        .setHeaders({
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
        });
    }
  }
}

function doOptions() {
  return ContentService.createTextOutput("").setHeaders({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
}
```

### Step 2: Redeploy Your Web App

1. **Click Save** (💾) in the Apps Script editor
2. **Click Deploy → Manage Deployments**
3. **Click the Edit icon (✏️)** next to your existing deployment
4. **Change the version** to "New Version"
5. **Click Deploy**
6. **Copy the new Web App URL** (it should look like: `https://script.google.com/macros/s/.../exec`)

### Step 3: Update Your Website URL (if needed)

Your current URL in `script.js` is already correct:

```javascript
const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxdqya2kM_CZ0GoEwNGTvnva3qdXPS7hBc81PKkfJ829-kdvNdrxa4EeET1TB0onBrM/exec";
```

If you get a different URL from Step 2, replace it in the `script.js` file.

## 🧪 Testing

### Method 1: Open the website directly

1. Double-click `index.html` to open it in your browser
2. The website should now load data from your Google Sheet

### Method 2: Use a local server

1. If you want to use a local server, try this simple Python command:
   ```bash
   python -m http.server 8080
   ```
2. Open `http://localhost:8080` in your browser

## 🔄 Fallback Feature

The website is now configured to:

1. **Try to load from Google Sheets first**
2. **If it fails, automatically show demo data** so you can still see the design
3. **Display a message** in the console about what's happening

## 🚨 If It Still Doesn't Work

### Alternative 1: Deploy to a real server

The CORS issue mainly affects local development. Once you deploy to:

- **GitHub Pages**
- **Netlify**
- **Vercel**
- Any web hosting service

The CORS issue will be resolved automatically.

### Alternative 2: Use a different browser

Some browsers handle CORS differently. Try:

- **Chrome** with `--disable-web-security` flag
- **Firefox**
- **Safari**

### Alternative 3: Browser Extension

Install a CORS browser extension temporarily for development.

## 📱 Current Status

Your website will now:

- ✅ Show your actual data when Google Sheets works
- ✅ Show demo data when there are connection issues
- ✅ Work perfectly on mobile and desktop
- ✅ Auto-refresh every 5 minutes
- ✅ Have all the cool Valorant styling

Try refreshing your website now - it should work! 🎮
