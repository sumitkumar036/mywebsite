import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID = "544103668404-qnnf0s3nobht18ffh2mqr9vhb5rdj9b2.apps.googleusercontent.com";
const API_KEY = "AIzaSyA51my8-8HuxUL0MsR2yrSkgLWp07Y6vME";
const FOLDER_ID = "1SmH_rk87_5KSZaZd4n0b1CqIyzOaTBiL";
const SCOPES = "https://www.googleapis.com/auth/drive.readonly";

function DriveFileFetcher() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    function start() {

      console.log("CLIENT_ID:", CLIENT_ID);
      console.log("API_KEY:", API_KEY);
      console.log("FOLDER_ID:", FOLDER_ID);
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPES,
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
        })
        .then(() => {
          // Sign in
          return gapi.auth2.getAuthInstance().signIn();
        })
        .then(() => {
          // Load the Drive API and list files
          return gapi.client.drive.files.list({
            q: `'${FOLDER_ID}' in parents and trashed = false`,
            fields: "files(id, name, mimeType, webViewLink)",
          });
        })
        .then((response) => {
          setFiles(response.result.files);
            console.log("Files in folder:", response.result.files);
        })
        .catch((error) => console.error("Error loading Drive files", error));
    }

    gapi.load("client:auth2", start);
  }, []);

  return (
    <div>
      <h3>Files in Google Drive Folder:</h3>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <a href={file.webViewLink} target="_blank" rel="noreferrer">
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DriveFileFetcher;
