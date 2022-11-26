import React from "react";
import { Template } from "../../../types";
import styles from "./ThirdTemplate.module.scss";
import logo from "../../../assets/logo.png";

export const ThirdTemplate = ({ text, color, date, header }: Template) => {
  return (
    <div className={styles.container} style={{ backgroundColor: color }}>
      <div className={styles.wrapper}>
        <div className={styles.box}>{date}</div>
        <div className={styles.header}>{header}</div>
        <div className={styles.text}>{text}</div>
      </div>
    </div>
  );
};
