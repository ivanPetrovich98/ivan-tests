import React from "react";
import styles from "./Form_ColorPicker.module.scss";
import { TextInput } from "../shared/TextInput";
import { ColorPicker } from "../shared/ColorPicker";
import { SelectTemplate } from "../shared/SelectTemplate";
import { Template } from "../../types";

type FormColorPickerProps = {
  id: number;
  template: Template;
  setId: React.Dispatch<React.SetStateAction<number>>;
  setValue: React.Dispatch<React.SetStateAction<Template>>;
};

function FormColorPicker({
  id,
  template,
  setValue,
  setId,
}: FormColorPickerProps) {
  return (
    <div className={styles.setNewsItemMainContainer}>
      <h1 className={styles.title}>Change content and color</h1>
      <form autoComplete="off">
        <div className={styles.responsiveContainer}>
          <div className={styles.responsiveRowText}>
            <SelectTemplate
              name="selectTemplate"
              label="Select Template:"
              formData={id}
              setFormData={setId}
            />
          </div>
          <div className={styles.responsiveRowText}>
            <TextInput
              title="Change header"
              id={template.id}
              name={"header"}
              formData={template}
              value={template.header}
              setValue={setValue}
            />
          </div>
          <div className={styles.responsiveRowText}>
            <TextInput
              title="Change date"
              id={template.id}
              name={"date"}
              formData={template}
              value={template.date}
              setValue={setValue}
            />
          </div>
          <div className={styles.responsiveRowText}>
            <TextInput
              title="Change paragraph"
              id={template.id}
              name={"text"}
              formData={template}
              value={template.text}
              setValue={setValue}
            />
          </div>
          <div className={styles.responsiveRowColor}>
            <ColorPicker
              title="Change color"
              value={template}
              setValue={setValue}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
export { FormColorPicker };
