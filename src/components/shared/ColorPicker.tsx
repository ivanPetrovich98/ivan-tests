import React from "react";
import { Template } from "../../types";

type ColorPickerProps = {
  title: string;
  value: Template;
  setValue: React.Dispatch<React.SetStateAction<Template>>;
};
function ColorPicker({ title, value, setValue }: ColorPickerProps) {
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue({ ...value, color: e.currentTarget.value });
  };
  return (
    <>
      <label>{title}:</label>
      <input type="color" value={value.color} onChange={onChange} />
    </>
  );
}

export { ColorPicker };
