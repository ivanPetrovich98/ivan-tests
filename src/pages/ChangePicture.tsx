import React, { useState, useEffect } from "react";
import { FormColorPicker } from "../components/forms/Form__ColorPicker";
import { Templates } from "../components/templates/Templates";
import styles from "./ChangePicture.module.scss";
import { Template } from "../types";

const defaultTemplates: Template[] = [
  {
    id: 1,
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat quasi harum dolor,",
    header: "Oil prices rises",
    date: "20 jan 2022",
    color: "#063454",
  },
  {
    id: 2,
    date: "20 jan 2022",
    header: "Oil prices rises",
    text: "Lorem ipsum dolor sit amet",
    color: "#000000",
  },
  {
    id: 3,
    date: "20 jan 2022",
    header: "Covid-19 Travel Restrictions",
    text: "Lorem ipsum dolor sit amet",
    color: "#063454",
  },
  {
    id: 4,
    date: "20 Jan 2022",
    header: "Is there a purge?: John Harwood`s",
    text: "Lorem ipsum dolor sit amet",
    color: "#dea24c",
  },
  {
    id: 5,
    date: "19 Oct 2022",
    header: "Oil prices dive",
    text: "Lorem ipsum dolor sit amet",
    color: "#190f1f",
  },
];

function ChangePicture() {
  const [id, setId] = useState<number>(1);
  const [templates, setTemplates] = useState<Template>({
    id: 1,
    text: "20 jan 2022",
    header: "11Oil prices rises",
    date: "Lorem ipsum dolor sit amet",
    color: "#C78E0A",
  });
  useEffect(() => {
    setTemplates(defaultTemplates[id - 1]);
  }, [id]);
  return (
    <div className={styles.container}>
      <Templates
        id={id}
        text={templates.text}
        header={templates.header}
        date={templates.date}
        color={templates.color}
      />
      <div className={styles.form}>
        <FormColorPicker
          id={id}
          template={templates}
          setValue={setTemplates}
          setId={setId}
        />
      </div>
    </div>
  );
}
export { ChangePicture };
