import React, { useState } from "react";
import styles from "./Form__UploadFile.module.scss";

const url =
  "https://script.google.com/macros/s/AKfycbwhqXGHwxrMYjp1l2TMXznCfDnpbiTzX7TduwntGxhLxz4_JttoLmzzw_vglN4QhEXe/exec";
export const FormUploadFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [disable, setDisable] = useState<boolean>(true); // disable the button if the photo is larger than 10mb or empty
  const [buttonContent, setButtonContent] = useState<string>("Send to drive");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      const fr = new FileReader();
      fr.readAsArrayBuffer(file);
      fr.onload = (e: any) => {
        const qs = new URLSearchParams({
          filename: file.name,
          mimeType: file.type,
        });
        setButtonContent("Uploading...");
        setDisable(true); // disable the button
        fetch(`${url}?${qs}`, {
          method: "POST",
          body: JSON.stringify(Array.from(new Int8Array(e.target.result))),
        })
          .then((res) => {
            setButtonContent("Send to drive");
            alert("Success!!!");
            setDisable(false);
          })
          .catch((error) => {
            setButtonContent("Send to drive");
            setDisable(false);
            alert("Something went wrong");
          });
      };
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
          <button disabled={disable} type="submit">
            {buttonContent}
          </button>
        </div>
      </form>
    </div>
  );
};
