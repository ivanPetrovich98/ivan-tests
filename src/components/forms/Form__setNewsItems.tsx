import React, { useContext, useEffect, useState } from "react";
import { GenericContext } from "../../contexts/GenericContext";
import { GenericProviderValues } from "../../providers/GenericProvider";
import {
  EditionInitData,
  EditionItem,
  ItemFormError,
  LangSheet,
  NewsFormInputData,
  NewsFormIsLoading,
  OutgoingData,
} from "../../types";
import { ButtonFetch } from "../shared/ButtonFetch";
import { ButtonPost } from "../shared/ButtonPost";
import { SelectFetch } from "../shared/SelectFetch";
import { SelectExtended } from "../shared/SelectExtended";
import styles from "./Form__setNewsItems.module.scss";

type FormSetNewsItemsProps = {
  isLoadingData: NewsFormIsLoading;
  setIsLoadingData: React.Dispatch<React.SetStateAction<NewsFormIsLoading>>;
};

function FormSetNewsItems({
  isLoadingData,
  setIsLoadingData,
}: FormSetNewsItemsProps) {
  const { ROUTES, errors, setErrors, clearErrorIfExists } = useContext(
    GenericContext
  ) as GenericProviderValues;

  const [formData, setFormData] = useState({} as NewsFormInputData);
  const [editionNamesAndSchemes, setEditionNamesAndSchemes] = useState(
    [] as EditionInitData[]
  );
  const [editionList, setEditionList] = useState([] as string[]);
  const [langSheet, setLangSheet] = useState({} as LangSheet);
  const [newsItemsHeadlines, setNewsItemsHeadlines] = useState([] as string[]);
  const [newsItem, setNewsItem] = useState({} as EditionItem);

  const [psResponse, setPsResponse] = useState({} as any);

  /**
   * POST handler
   */
  const [outgoingData, setOutgoingData] = useState("");
  const [isPostButtonClicked, setIsPostButtonClicked] = useState(false);
  const postClickHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPostButtonClicked(true);
    try {
      console.log(`%csetIsPostButtonClicked true`, "color: orange");
      console.log(`background: ${formData.backgroundFilePath}`);
      console.log(`%c${formData}`, "color: pink");

      const outGoingData: OutgoingData = {
        backgroundFilePath: formData.backgroundFilePath,
        projName: formData.editionName,
        date: langSheet.date,
        headline: newsItem.data.headline,
        description: newsItem.data.description,
        narration: newsItem.data.narration,
      };

      const stringified: string = JSON.stringify(outGoingData);

      console.log(`%cstringifiedData: ${stringified}`, "color: green");

      setOutgoingData(stringified);
      clearErrorIfExists(`outgoingData`);
    } catch (e) {
      // Set Error
      let newErrors = { ...errors };
      newErrors.outgoingData = `Error in postClickHandler: ${e}`;
      setErrors(newErrors);
    }
  };

  /**
   * Get editionNames with langScheme names
   */
  useEffect(() => {
    try {
      console.log(`Loading editionNames`);
      const getEditionNames = async () => {
        const response: Response = await fetch(
          `${ROUTES.editionMeta}/namesAndLangSchemes`
        );
        const json = await response.json();

        if (typeof json === "object" && !Array.isArray(json) && json !== null) {
          if ("errorMessage" in json) {
            // Set Error
            console.log((json as any).errorMessage);
            let newErrors = { ...errors };
            newErrors.editionNamesAndSchemes = `Failed to get editionNames and Schemes: ${json.errorMessage}`;
            setErrors(newErrors);
          }
        } else {
          clearErrorIfExists(`editionNamesAndSchemes`);
          console.log(json);
          setEditionNamesAndSchemes(json);
        }
      };
      getEditionNames();
    } catch (e) {
      // Set Error
      let newErrors: ItemFormError = { ...errors };
      newErrors.newsItemHeadline = `Error in Get editionNames ${e}`;
      setErrors(newErrors);
    } finally {
      console.log(`setting newLoadingData.getEditionNamesAndSchemes = false`);
      let newLoadingData = { ...isLoadingData };
      newLoadingData.editionNamesAndSchemes = false;
      setIsLoadingData(newLoadingData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Set editionNames by schemeName
   * Update formData
   * Clear news items
   */
  useEffect(() => {
    try {
      console.log(`onChangeSchemeName: ${formData.schemeName}`);
      const filteredEditions: EditionInitData[] = editionNamesAndSchemes.filter(
        (edition: EditionInitData) => {
          return edition.schemeName === formData.schemeName;
        }
      );

      const editionNames = filteredEditions.map(
        (edition) => edition.editionName
      );
      setEditionList(editionNames);

      // update formData
      let newFormData = { ...formData };
      newFormData.editionName = editionNames[0];
      setFormData(newFormData);

      // clear news items
      setNewsItemsHeadlines([]);
    } catch (e) {
      // Set Error
      let newErrors: ItemFormError = { ...errors };
      newErrors.newsItemHeadline = `Error in setInitData ${e}`;
      setErrors(newErrors);
    } finally {
      console.log(`setting newLoadingData.newsItemHeadline = false`);
      let newLoadingData = { ...isLoadingData };
      newLoadingData.newsItemHeadline = false;
      setIsLoadingData(newLoadingData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editionNamesAndSchemes, formData.schemeName]);

  /**
   * Whenever a newsItem (headline) is selected
   * Get the full object from the langSheet and delete the mark key
   */
  useEffect(() => {
    if (langSheet && langSheet.data && langSheet.data.newsItems.length > 0) {
      try {
        console.log(
          `langSheet.data.newsItems.length: ${langSheet.data.newsItems.length}`
        );
        let locateItem = langSheet.data.newsItems.find((item: EditionItem) => {
          return item.data.headline === formData.newsItemHeadline;
        });
        if (!locateItem) {
          // Set Error
          let newErrors: ItemFormError = { ...errors };
          newErrors.newsItemHeadline = `Couldn't locate newsItem ${formData.newsItemHeadline}`;
          setErrors(newErrors);
        } else {
          clearErrorIfExists("newsItemHeadline");
          delete locateItem.data.mark;
          console.log(
            `%cSetting news item ${locateItem.data.headline}`,
            "color: green"
          );
          setNewsItem(locateItem);
        }
      } catch (e) {
        // Set Error
        let newErrors: ItemFormError = { ...errors };
        newErrors.newsItemHeadline = `Error in locate newsItem ${e}`;
        setErrors(newErrors);
      }
    } else {
      console.warn(`Langsheet doesn't exist yet`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.newsItemHeadline]);

  useEffect(() => {
    if (langSheet && langSheet.data && langSheet.data.newsItems.length > 0) {
      console.log("setNewsItemsHeadlines");
      const headlines = langSheet.data.newsItems.map((item: EditionItem) => {
        return item.data.headline;
      });
      console.log(headlines);
      setNewsItemsHeadlines(headlines);
    }
  }, [langSheet]);

  /**
   * Log psResponse
   */
  useEffect(() => {
    console.log(psResponse);
  }, [psResponse]);

  return (
    <div className={styles.setNewsItemMainContainer}>
      <h1 className={styles.title}>Send Single News Item</h1>
      <form autoComplete="off">
        <div className={styles.responsiveContainer}>
          <div className={styles.responsiveRow}>
            <SelectFetch
              name="schemeName"
              label="Select Language Scheme:"
              fetchUrl={`${ROUTES.langSchemes}/allNames`}
              mapByKeyName={null}
              formData={formData}
              setFormData={setFormData}
              isLoadingData={isLoadingData}
              setIsLoadingData={setIsLoadingData}
            />
          </div>
          <div className={styles.responsiveRow}>
            <SelectExtended
              name="editionName"
              label="Select Edition:"
              options={editionList}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </div>
        <div className={styles.responsiveContainerFlexCol}>
          <div className={styles.fullWidthResponsiveRow}>
            <div className={styles.fullWidthResponsiveRow}>
              <SelectFetch
                name="backgroundFilePath"
                label="Select Background:"
                fetchUrl={`${ROUTES.files}/backgrounds`}
                mapByKeyName={null}
                formData={formData}
                setFormData={setFormData}
                isLoadingData={isLoadingData}
                setIsLoadingData={setIsLoadingData}
              />
            </div>
          </div>
        </div>
        <div className={styles.responsiveContainerFlexCol}>
          {langSheet &&
          langSheet.data &&
          langSheet.data.newsItems.length > 0 ? (
            <>
              <div className={styles.fullWidthResponsiveRow}>
                <SelectExtended
                  name="newsItemHeadline"
                  label="Select News Item:"
                  options={newsItemsHeadlines}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
            </>
          ) : (
            <></>
          )}
          {/* Load News Item */}
          <div className={styles.fullWidthResponsiveRow}>
            <ButtonFetch
              name="loadNewsItems"
              label="Load News Items"
              fetchUrl={`${ROUTES.editionMeta}/${formData.editionName}`}
              setData={setLangSheet}
            />
          </div>
        </div>

        {newsItemsHeadlines.length === 0 ? (
          <></>
        ) : (
          <div className={styles.responsiveContainerFlexCol}>
            <div className={styles.fullWidthResponsiveRow}>
              <ButtonPost
                name="sendToPS"
                label="Send To Photoshop"
                postUrl={`${ROUTES.singleItem}/news`}
                isClicked={isPostButtonClicked}
                setIsClicked={setIsPostButtonClicked}
                clickHandler={postClickHandler}
                stringifiedData={outgoingData}
                setResponse={setPsResponse}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export { FormSetNewsItems };
