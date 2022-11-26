export type BlueKey = "indiItems" | "newsItems" | "techItems";

export type EditionItem = {
  data: { [key: string]: string };
  type: BlueKey;
};

export type EditionInitData = {
  editionName: string;
  schemeName: string;
};

export type LangSheet = {
  data: { [key in BlueKey]: EditionItem[] };
  date: string;
};

export type FormInputKeys =
  | "sendToPS"
  | "schemeName"
  | "editionName"
  | "backgroundFilePath"
  | "newsItemHeadline"
  | "loadNewsItems"
  | "editionNamesAndSchemes"
  | "date"
  | "outgoingData";

export type OutgoingData = {
  projName: string;
  backgroundFilePath: string;
  date: string;
  headline: string;
  description: string;
  narration: string;
};

export type NewsFormInputData = { [key in FormInputKeys]: string };
export type NewsFormIsLoading = { [key in FormInputKeys]?: boolean };
export type ItemFormError = { [key in FormInputKeys]?: string };
export type Template = {
  id: number;
  text: string;
  header: string;
  date: string;
  color: string;
};
