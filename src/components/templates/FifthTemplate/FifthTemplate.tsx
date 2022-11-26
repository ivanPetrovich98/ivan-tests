import React from "react";
import { Template } from "../../../types";
import styles from "./FifthTemplate.module.scss";
import instagram from "../../../assets/FifthTemplate/Instagram.png";
import facebook from "../../../assets/FifthTemplate/Facebook.png";
import twitter from "../../../assets/FifthTemplate/Twitter.png";
import whatsApp from "../../../assets/FifthTemplate/WhatsApp.png";

export const FifthTemplate = ({ text, color, date, header }: Template) => {
  return (
    <div className={styles.container} style={{ backgroundColor: color }}>
      <div className={styles.wrapper}>
        <div className={styles.box}>{date}</div>
        <div className={styles.header}>{header}</div>
        <div className={styles.text}>{text}</div>
        <div className={styles.icons}>
          <img src={instagram} alt="instagram" />
          <img src={facebook} alt="facebook" />
          <img src={twitter} alt="twitter" />
          <img src={whatsApp} alt="whatsApp" />
        </div>
      </div>
    </div>
  );
};
