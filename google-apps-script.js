function doGet(e) {
  try {
    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    const rows = sheet.getDataRange().getValues();
    const headers = rows.shift();

    const data = rows.map((r) => {
      const rowData = Object.fromEntries(r.map((v, i) => [headers[i], v]));
      delete rowData["phone number"];
      return rowData;
    });

    const callback = e && e.parameter ? e.parameter.callback : null;
    const jsonData = JSON.stringify(data);

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
  } catch (error) {
    const errorResponse = {
      error: "Failed to fetch data",
      message: error.toString(),
    };

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
  return ContentService.createTextOutput("").setMimeType(
    ContentService.MimeType.TEXT
  );
}

function testData() {
  try {
    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    const rows = sheet.getDataRange().getValues();
    const headers = rows.shift();
    const data = rows.map((r) => {
      const rowData = Object.fromEntries(r.map((v, i) => [headers[i], v]));
      delete rowData["phone number"];
      return rowData;
    });

    console.log("Headers found:", headers);
    console.log("Data (phone numbers excluded):", data);
    console.log("Number of rows:", data.length);

    return data;
  } catch (error) {
    console.error("Error:", error.toString());
    return null;
  }
}
