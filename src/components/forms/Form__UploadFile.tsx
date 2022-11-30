import React, { useEffect, useState } from "react";
import useInjectScript from "../../hooks/useInjectScript";
import { API_KEY, CLIENT_ID, DISCOVERY_DOC, SCOPES } from "../../googleConfig";
import styles from "./Form__UploadFile.module.scss";
import { Folder, FileOrNull } from "../../types";

declare let google: any;
declare let window: any;

export const FormUploadFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [disable, setDisable] = useState<boolean>(true); // disable the button if the photo is larger than 10mb or empty
  const [buttonContent, setButtonContent] = useState<string>("Send to drive");
  const [loaded, error] = useInjectScript("https://apis.google.com/js/api.js");
  const [loadedGsi, errorGsi] = useInjectScript(
    "https://accounts.google.com/gsi/client"
  );
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [tokenClient, setTokenClient] = useState<any>(null);
  const [folderId, setFolderId] = useState<string | null>(null);

  useEffect(() => {
    if (loaded && loadedGsi) {
      gapiLoaded();
      gisLoaded();
    }
  }, [loaded, loadedGsi]);

  function gapiLoaded() {
    window.gapi.load("client", initializeGapiClient);
  }

  async function initializeGapiClient() {
    await window.gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
  }

  function gisLoaded() {
    const newTokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: async (res: any) => {
        if (res.error !== undefined) {
          throw res;
        }
      },
    });
    setTokenClient(newTokenClient);
  }

  const login = () => {
    if (window.gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: "consent" });
    }
    setAuthorized(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (window.gapi.client.getToken() === null) login();
    setButtonContent("Loading...");
    setDisable(true);
    // if the folder is saved
    if (folderId) {
      await uploadFile(folderId);
      setButtonContent("Send to drive");
      setDisable(false);
      return;
    }
    let folder = await findFolder("image");
    // if the folder exists
    if (folder) {
      await uploadFile(folder.id);
      setFolderId(folder.id);
      setButtonContent("Send to drive");
      setDisable(false);
      return;
    }
    folder = await createFolder("image");
    // if the folder is created
    if (folder) {
      await uploadFile(folder.id);
      setFolderId(folder.id);
      setButtonContent("Send to drive");
      setDisable(false);
      return;
    }
    alert("Not success");
    setButtonContent("Send to drive");
    setDisable(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // if the file size is more than 10Mb the function will not work
      if (e.target.files[0].size > 1e7) {
        alert("The file cant be more than 10 MB");
        setDisable(true); // disable the button
        setFile(null);
        return;
      }
      setFile(e.target.files[0]);
      setDisable(false);
    }
  };
  const uploadFile2 = async () => {
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Please set the URL of image.
      console.log(imageUrl);
      const url =
        "https://script.google.com/macros/s/AKfycbxGUJk4Mnc4mGI2z_EPvCNeGa8XxEKGJMBqulJ4dgGtA9T9vbXeAg8xpKRDjVSXPhLmkw/exec"; // Please set the URL of Web Apps.
      const qs = new URLSearchParams({
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
        filename: file.name,
        folderId: "1_vIv_s8c0t2H_90rec0uhVZMYUSXkAEK", // Please set folder ID.
      });
      console.log(qs);
      fetch(`${url}?${qs}`)
        .then((res) => res.json())
        .then(console.log)
        .catch(console.log);
    }
  };
  // https://script.google.com/macros/s/AKfycbz88xNLLahYzp-_Zyr9SMyupoMEJHcEGE6Y6kHSLJd6aX4KpYSOtbR0OlWNz6ccsF3jxg/exec
  const uploadFile3 = async () => {
    if (file) {
      const form = new FormData();
      form.append("file", file);
      const url =
        "https://script.google.com/macros/s/AKfycbz88xNLLahYzp-_Zyr9SMyupoMEJHcEGE6Y6kHSLJd6aX4KpYSOtbR0OlWNz6ccsF3jxg/exec"; // Please set the URL of Web Apps.
      const qs = new URLSearchParams({
        filename: file.name,
        folderId: "1_vIv_s8c0t2H_90rec0uhVZMYUSXkAEK", // Please set folder ID.
      });
      console.log(qs);
      fetch(url, {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then(console.log)
        .catch(console.log);
    }
  };
  const uploadFile = async (id: string) => {
    if (file) {
      const form = new FormData();
      form.append(
        "metadata",
        new Blob(
          [
            JSON.stringify({
              name: file.name,
              parents: [id],
            }),
          ],
          {
            type: "application/json",
          }
        )
      );
      form.append("file", file);
      try {
        await fetch(
          "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
          {
            method: "POST",
            headers: new Headers({
              Authorization:
                "Bearer " + window.gapi.auth.getToken().access_token,
            }),
            body: form,
          }
        );
      } catch (e: any) {
        alert("Something went wrong");
      }
    }
  };

  const findFolder: (name: string) => Promise<FileOrNull> = async (name) => {
    try {
      const response = await window.gapi.client.drive.files.list({
        fields: "files(id, name)",
        spaces: "drive",
      });
      const folder: Folder = response.result.files.find(
        (item: Folder) => item.name === name
      );
      return folder ? folder : null;
    } catch (err) {
      alert("Something went wrong");
      return null;
    }
  };
  const createFolder: (name: string) => Promise<FileOrNull> = async (name) => {
    const createFolderOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${window.gapi.auth.getToken().access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mimeType: "application/vnd.google-apps.folder",
        name,
      }),
    };
    try {
      const response = await fetch(
        "https://www.googleapis.com/drive/v3/files",
        createFolderOptions
      );
      const { id, name } = await response.json();
      return { id, name };
    } catch (e: any) {
      alert("The folder was not created");
      return null;
    }
  };

  return (
    <div className={styles.setNewsItemMainContainer}>
      <h1 className={styles.title}>Upload file to Google Drive</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.column}>
          <div className={styles.responsiveContainer}>
            <label htmlFor="file">Select an image</label>
            <input
              id="file"
              type="file"
              name="file"
              accept="image/jpg, image/png"
              onChange={handleFileChange}
            ></input>
            {file ? <div>{file.name}</div> : <div>File not yet selected</div>}
          </div>
          {authorized && (
            <button disabled={disable && loaded && loadedGsi} type="submit">
              {buttonContent}
            </button>
          )}
        </div>
      </form>
      <button onClick={uploadFile2}>uploadFile2</button>
      <button onClick={uploadFile3}>uploadFile3</button>
      {!authorized && <button onClick={login}>Login</button>}
    </div>
  );
};
