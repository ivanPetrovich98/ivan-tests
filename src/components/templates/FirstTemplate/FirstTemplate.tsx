import React from "react";
import styles from "./Template.module.scss";
import { Template } from "../../../types";

function FirstTemplate({ text, color, date, header }: Template) {
  return (
    <div className={styles.container} style={{ backgroundColor: color }}>
      <div className={styles.wrapper}>
        <div className={styles.date}>{date}</div>
        <div className={styles.title}>{header}</div>
        <div className={styles.content}>{text}</div>
      </div>
    </div>
  );
}

export { FirstTemplate };
