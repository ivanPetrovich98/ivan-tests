import React, { ReactNode, useState } from "react";
import { GenericContext } from "../contexts/GenericContext";
import { FormInputKeys, ItemFormError } from "../types";

type GenericProviderProps = {
  children: ReactNode;
};

export type GenericProviderValues = {
  ROUTES: { [key: string]: string };
  errors: ItemFormError;
  setErrors: React.Dispatch<React.SetStateAction<ItemFormError>>;
  clearErrorIfExists: (errorKey: FormInputKeys) => void;
};

export const GenericProvider = ({ children }: GenericProviderProps) => {
  /**
   * Globals
   */
  const SmartServerRoute = `http://localhost:5016/api/psVictor/`;

  const ROUTES = {
    editionMeta: `${SmartServerRoute}editionMeta`,
    langSchemes: `${SmartServerRoute}langScheme`,
    bluePrint: `${SmartServerRoute}bluePrint`,
    autoItemPicker: `${SmartServerRoute}autoItemPicker`,
    singleItem: `${SmartServerRoute}singleItem`,
    itemCluster: `${SmartServerRoute}itemCluster`,
    files: `${SmartServerRoute}files`,
  };

  const [errors, setErrors] = useState({} as ItemFormError);

  const clearErrorIfExists = (errorKey: FormInputKeys) => {
    if (errorKey in errors) {
      let newErrors = { ...errors };
      delete newErrors[errorKey];
      setErrors(newErrors);
    }
  };

  return (
    <GenericContext.Provider
      value={{
        ROUTES,
        errors,
        setErrors,
        clearErrorIfExists,
      }}
    >
      {children}
    </GenericContext.Provider>
  );
};
