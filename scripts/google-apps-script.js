/**
 * Google Apps Script to handle form submissions from React App
 * 
 * INSTRUCTIONS:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste this code into the editor (replace existing code)
 * 4. Save the project
 * 5. Run the 'setup' function once to create the headers (optional, but good for testing)
 * 6. Click "Deploy" > "New deployment"
 * 7. Select type: "Web app"
 * 8. Description: "Form Handler"
 * 9. Execute as: "Me"
 * 10. Who has access: "Anyone" (Important!)
 * 11. Click "Deploy"
 * 12. Copy the "Web App URL" and provide it to the developer/app configuration
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = e.parameter.formType || 'Contact'; // Default to Contact if not specified
    var sheet = doc.getSheetByName(sheetName);

    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = doc.insertSheet(sheetName);
      // Add headers based on form type
      if (sheetName === 'Contact') {
        sheet.appendRow(['Timestamp', 'First Name', 'Last Name', 'Phone', 'Email', 'City', 'Disability Type', 'Area of Need', 'Contact Method', 'Need Details', 'Consent']);
      } else if (sheetName === 'Volunteer') {
        sheet.appendRow(['Timestamp', 'Email', 'First Name', 'Last Name', 'Phone', 'Area', 'City', 'Contact Preference', 'Mobility', 'Volunteering Area', 'Additional Info']);
      }
    }

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;
    var newRow = [];

    // Map parameters to headers
    // We assume the incoming data keys match the expected headers roughly or we map them manually
    // Ideally, the React app sends keys that we can map.

    // Simple mapping based on known fields
    var timestamp = new Date();

    if (sheetName === 'Contact') {
      newRow = [
        timestamp,
        e.parameter.firstName,
        e.parameter.lastName,
        e.parameter.phone,
        e.parameter.email,
        e.parameter.city,
        e.parameter.disabilityType,
        e.parameter.areaOfNeed,
        e.parameter.contactMethod,
        e.parameter.needDetails,
        e.parameter.consent
      ];
    } else if (sheetName === 'Volunteer') {
      newRow = [
        timestamp,
        e.parameter.email,
        e.parameter.firstName,
        e.parameter.lastName,
        e.parameter.phone,
        e.parameter.area,
        e.parameter.city,
        e.parameter.contactPreference,
        e.parameter.mobility,
        e.parameter.volunteering,
        e.parameter.additionalInfo
      ];
    } else {
      // Fallback for unknown sheets: just dump all params
      newRow = [timestamp, JSON.stringify(e.parameter)];
    }

    sheet.appendRow(newRow);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function setup() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();

  // Setup Contact Sheet
  var contactSheet = doc.getSheetByName('Contact');
  if (!contactSheet) {
    contactSheet = doc.insertSheet('Contact');
    contactSheet.appendRow(['Timestamp', 'First Name', 'Last Name', 'Phone', 'Email', 'City', 'Disability Type', 'Area of Need', 'Contact Method', 'Need Details', 'Consent']);
  }

  // Setup Volunteer Sheet
  var volunteerSheet = doc.getSheetByName('Volunteer');
  if (!volunteerSheet) {
    volunteerSheet = doc.insertSheet('Volunteer');
    volunteerSheet.appendRow(['Timestamp', 'Email', 'First Name', 'Last Name', 'Phone', 'Area', 'City', 'Contact Preference', 'Mobility', 'Volunteering Area', 'Additional Info']);
  }
}
