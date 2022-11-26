import React from "react";
import { Template } from "../../../types";
import styles from "./FourthTemplate.module.scss";

export const FourthTemplate = ({ text, color, date, header }: Template) => {
  return (
    <div className={styles.container} style={{ backgroundColor: color }}>
      <div className={styles.wrapper}>
        <div className={styles.row}>{date}</div>
        <div className={styles.header}>{header}</div>
        <div className={styles.text}>{text}</div>
      </div>
    </div>
  );
};
