import React from "react";
import {
  FirstTemplate,
  SecondTemplate,
  ThirdTemplate,
  FourthTemplate,
  FifthTemplate,
} from "./index";
import { Template } from "../../types";

export const Templates = ({ id, text, header, date, color }: Template) => {
  switch (id) {
    case 1:
      return (
        <FirstTemplate
          id={id}
          color={color}
          text={text}
          header={header}
          date={date}
        />
      );
    case 2:
      return (
        <SecondTemplate
          id={id}
          color={color}
          text={text}
          header={header}
          date={date}
        />
      );
    case 3:
      return (
        <ThirdTemplate
          id={id}
          color={color}
          text={text}
          header={header}
          date={date}
        />
      );
    case 4:
      return (
        <FourthTemplate
          id={id}
          color={color}
          text={text}
          header={header}
          date={date}
        />
      );
    case 5:
      return (
        <FifthTemplate
          id={id}
          color={color}
          text={text}
          header={header}
          date={date}
        />
      );
    default:
      return null;
  }
};
