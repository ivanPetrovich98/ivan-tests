import React from "react";

type SelectProps = {
  name: string;
  label: string;
  formData: number;
  setFormData: React.Dispatch<React.SetStateAction<number>>;
};

export const SelectTemplate = ({
  name,
  label,
  formData,
  setFormData,
}: SelectProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(Number(e.target.value));
  };

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} value={formData} onChange={onChangeHandler}>
        {[1, 2, 3, 4, 5].map((option, i) => (
          <option key={i + option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};
