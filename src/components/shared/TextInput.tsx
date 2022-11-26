import React from "react";
import { Template } from "../../types";

type InputKey = "text" | "header" | "date";

type TextInputProps = {
  id: number;
  title: string;
  name: InputKey;
  formData: Template;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<Template>>;
};
function TextInput({ title, formData, name, value, setValue }: TextInputProps) {
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue({ ...formData, [name]: e.currentTarget.value });
  };
  return (
    <>
      <label>{title}:</label>
      <input type="text" value={value} onChange={onChange} />
    </>
  );
}

export { TextInput };
