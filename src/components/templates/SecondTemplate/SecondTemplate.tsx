import React from "react";
import styles from "./SecondTemplate.module.scss";
import { Template } from "../../../types";
import logo from "../../../assets/logo.png";

export const SecondTemplate = ({ text, color, date, header }: Template) => {
  return (
    <div className={styles.container} style={{ backgroundColor: color }}>
      <div className={styles.wrapper}>
        <div className={styles.row}>
          <img src={logo} alt="logo" />
          <div>{date}</div>
        </div>
        <div className={styles.header}>{header}</div>
        <div className={styles.text}>{text}</div>
      </div>
    </div>
  );
};
