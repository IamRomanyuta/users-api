import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const SHEET_ID = process.env.SHEET_ID;
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json', // Путь к файлу с учетными данными
  scopes: SCOPES,
});
const sheets = google.sheets({ version: 'v4', auth });

export async function updateGoogleSheet(data) {
  const headers = [['ID', 'First Name', 'Last Name', 'Gender', 'Address', 'City', 'Phone', 'Email', 'Status']];
  const values = data.map(client => [
    client.id,
    client.firstName,
    client.lastName,
    client.gender,
    client.address,
    client.city,
    client.phone,
    client.email,
    client.status,
  ]);

  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: 'A1',
    valueInputOption: 'RAW',
    resource: {
      values: headers.concat(values),
    },
  });
}
