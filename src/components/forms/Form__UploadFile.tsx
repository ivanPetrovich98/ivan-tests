import React, { useEffect, useState } from "react";
import styles from "./Form__UploadFile.module.scss";
import useDrivePicker from "react-google-drive-picker";
import useInjectScript from "../../hooks/useInjectScript";

declare let google: any;
declare let window: any;

export const FormUploadFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [disable, setDisable] = useState<boolean>(true); // disable the button if the photo is larger than 10mb or empty
  const [buttonContent, setButtonContent] = useState<string>("Send to drive");
  // const [openPicker, authResponse] = useDrivePicker();
  // States
  const [tokenClient, setTokenClient] = useState<any>(null);

  // config start
  const CLIENT_ID =
    "565365202385-e3snfdado1374kepml5dfrijd08gukij.apps.googleusercontent.com";
  const API_KEY = "AIzaSyAqAGuqt-A1rzbfUuxrBzBzL8bZhYE-3bI";
  const DISCOVERY_DOC =
    "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest";
  const SCOPES = "https://www.googleapis.com/auth/drive.metadata.readonly";
  // config end
  // useEffect(() => {
  //   gapiLoaded();
  //   console.log("gapiLoaded");
  // }, []);

  useEffect(() => {
    console.log("----------------");
    console.log(tokenClient);
    console.log(file);
    console.log("----------------");
  }, [tokenClient, file]);
  // CONSTs config

  //

  async function gapiLoaded() {
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
      callback: "", // defined later
    });
    setTokenClient(newTokenClient);
    console.log(newTokenClient);
  }

  function handleAuthClick() {
    tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      // await listFiles();
    };

    if (window.gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({ prompt: "consent" });
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({ prompt: "" });
    }
    console.log("window.gapi.client.getToken().access_token");
    console.log(window.gapi.client.getToken());
    console.log(window.gapi.client.getToken().access_token);
    listFiles();
  }
  function handleSignoutClick() {
    const token = window.gapi.client.getToken();

    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      window.gapi.client.setToken("");
    }
  }
  async function listFiles() {
    let response;
    try {
      response = await window.gapi.client.drive.files.list({
        pageSize: 10,
        fields: "files(id, name)",
      });
    } catch (err: any) {
      console.log(err.message);
      return;
    }
    const files = response.result.files;
    if (!files || files.length == 0) {
      console.log("No files found.");
      return;
    }
    // Flatten to string to display
    const output = files.reduce(
      (str: any, file: any) => `${str}${file.name} (${file.id}\n`,
      "Files:\n"
    );
    console.log("output", output);
  }

  const uploadFile = async () => {
    const folderId = "1vzjhNk_CtPSCF2E4GZcRDqdCTlmPeMMn";
    const accessToken = window.gapi.auth.getToken().access_token;
    console.log(accessToken);
    if (file) {
      const metadata = {
        name: file.name,
        mimeType: file.type,
        parents: [folderId],
      };
      const formData = new FormData();
      formData.append(
        "metadata",
        new Blob([JSON.stringify(formData)], { type: "application/json" })
      );
      formData.append("file", file);
      fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        {
          method: "POST",
          headers: new Headers({ Authorization: "Bearer " + accessToken }),
          body: formData,
        }
      )
        .then((res) => {
          return res.json();
        })
        .then(function (val) {
          console.log(val);
        });
      // await window.gapi.client.drive.files.create({});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    uploadFile();
    console.log("gapiLoaded");
    // openPicker({
    //   clientId:
    //     "565365202385-e3snfdado1374kepml5dfrijd08gukij.apps.googleusercontent.com",
    //   developerKey: "AIzaSyAqAGuqt-A1rzbfUuxrBzBzL8bZhYE-3bI",
    //   viewId: "DOCS_IMAGES",
    //   token: token, // pass oauth token in case you already have one
    //   showUploadView: true,
    //   showUploadFolders: true,
    //   supportDrives: true,
    //   multiselect: false,
    //   // customViews: customViewsArray, // custom view
    //   callbackFunction: (data) => {
    //     if (data.action === "cancel") {
    //       console.log("User clicked cancel/close button");
    //     }
    //     console.log(data);
    //   },
    // });
    // if (file) {
    //   setButtonContent("Sending...");
    //   setDisable(true);
    //   setFile(null);

    //   const formData = new FormData();
    //   formData.append("image", file);

    //   try {
    //     const response = await fetch("http://localhost:4444/api/upload", {
    //       method: "POST",
    //       body: formData,
    //     });
    //     await response.json();
    //     alert("Success, congratulations!");
    //   } catch (e: any) {
    //     alert("Something went wrong");
    //   }
    //   setButtonContent("Send to drive");
    // }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // if the file size is more than 10Mb the function will not work
      if (e.target.files[0].size > 1e7) {
        alert("The file cant be more than 10 MB");
        setDisable(true); // disable the button
        return;
      }
      setFile(e.target.files[0]);
      console.log(e.target.files[0].arrayBuffer());
      const url = URL.createObjectURL(e.target.files[0]);
      console.log(url.toString());
      console.log(URL.revokeObjectURL(url));

      setDisable(false);
    }
  };
  const getData = (file: File) =>
    new Promise((resolve, reject) => {
      if (file) {
        const fr = new FileReader();
        fr.onload = (f) =>
          resolve({
            filename: file.name,
            mimeType: file.type,
            fileSize: file.size,
          });
        fr.onerror = (err) => reject(err);
        fr.readAsArrayBuffer(file);
      } else {
        resolve({});
      }
    });
  const checkToken = () => {
    console.log(
      "window.gapi.auth.getToken().access_token12222222222222222222222222222"
    );
    console.log(window.gapi.auth.getToken().access_token);
  };
  const fetchUrl = () => {
    if (file) {
      const fileName = file.name;
      const folderId = "1vzjhNk_CtPSCF2E4GZcRDqdCTlmPeMMn"; // Please set the folder ID.
      const form = new FormData();
      form.append(
        "metadata",
        new Blob([JSON.stringify({ name: fileName, parents: [folderId] })], {
          type: "application/json",
        })
      );
      form.append("file", file);
      fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        {
          method: "POST",
          headers: new Headers({
            Authorization: "Bearer " + window.gapi.auth.getToken().access_token,
          }),
          body: form,
        }
      )
        .then((res) => res.json())
        .then((val) => console.log(val));
      console.log(form);
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
          <button disabled={false} type="submit">
            {buttonContent}
          </button>
        </div>
      </form>
      <img src={(file && URL.createObjectURL(file)) || ""} />
      <button onClick={gapiLoaded}>1 gapiLoaded</button>
      <button onClick={gisLoaded}>gisLoaded()</button>
      <button onClick={handleAuthClick}>handleAuthClick();</button>
      <button onClick={fetchUrl}>fetchUrl</button>
      <button onClick={checkToken}>checkToken</button>
    </div>
  );
};
