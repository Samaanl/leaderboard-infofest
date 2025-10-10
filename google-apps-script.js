// Updated Google Apps Script code with CORS support
function doGet(e) {
  try {
    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    const rows = sheet.getDataRange().getValues();
    const headers = rows.shift();
    const data = rows.map((r) =>
      Object.fromEntries(r.map((v, i) => [headers[i], v]))
    );

    // Handle case where e or e.parameter might be undefined (when testing manually)
    const callback = e && e.parameter ? e.parameter.callback : null;
    const jsonData = JSON.stringify(data);

    if (callback) {
      // JSONP response
      return ContentService.createTextOutput(
        `${callback}(${jsonData})`
      ).setMimeType(ContentService.MimeType.JAVASCRIPT);
    } else {
      // Regular JSON response with CORS headers
      const output = ContentService.createTextOutput(jsonData).setMimeType(
        ContentService.MimeType.JSON
      );

      // Note: CORS headers are automatically handled by Google Apps Script for web apps
      return output;
    }
  } catch (error) {
    const errorResponse = {
      error: "Failed to fetch data",
      message: error.toString(),
    };

    // Handle case where e or e.parameter might be undefined
    const callback = e && e.parameter ? e.parameter.callback : null;
    const jsonData = JSON.stringify(errorResponse);

    if (callback) {
      return ContentService.createTextOutput(
        `${callback}(${jsonData})`
      ).setMimeType(ContentService.MimeType.JAVASCRIPT);
    } else {
      const output = ContentService.createTextOutput(jsonData).setMimeType(
        ContentService.MimeType.JSON
      );

      return output;
    }
  }
}

function doOptions() {
  // Google Apps Script automatically handles CORS for web apps
  return ContentService.createTextOutput("").setMimeType(
    ContentService.MimeType.TEXT
  );
}

// Test function to verify your data (run this in the script editor to test)
function testData() {
  try {
    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    const rows = sheet.getDataRange().getValues();
    const headers = rows.shift();
    const data = rows.map((r) =>
      Object.fromEntries(r.map((v, i) => [headers[i], v]))
    );

    console.log("Headers found:", headers);
    console.log("Data:", data);
    console.log("Number of rows:", data.length);

    return data;
  } catch (error) {
    console.error("Error:", error.toString());
    return null;
  }
}
