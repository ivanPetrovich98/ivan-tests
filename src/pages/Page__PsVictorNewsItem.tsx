import { useContext, useState } from 'react';
import { GenericContext } from '../contexts/GenericContext';
import ErrorTerminal from '../components/shared/ErrorTerminal';
import { FormSetNewsItems } from '../components/forms/Form__setNewsItems';
import { NewsFormIsLoading } from '../types';
import { GenericProviderValues } from '../providers/GenericProvider';

function PagePsVictorNewsItem() {
    const { errors } = useContext(GenericContext) as GenericProviderValues;

    const [isLoadingData, setIsLoadingData] = useState({
        schemeName: true,
        editionName: true,
        backgroundFilePath: true,
        newsItem: true,
        editionNamesAndSchemes: true,
    } as NewsFormIsLoading);

    return (
        <div className="genericContainer">
            <>
                <FormSetNewsItems
                    isLoadingData={isLoadingData}
                    setIsLoadingData={setIsLoadingData}
                />
                <ErrorTerminal errors={errors} />
            </>
        </div>
    );
}

export default PagePsVictorNewsItem;
