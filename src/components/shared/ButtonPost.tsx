import React, { useContext, useEffect } from 'react';
import { GenericContext } from '../../contexts/GenericContext';
import { POST_TOF } from '../../logic/JSONPOST';
import { GenericProviderValues } from '../../providers/GenericProvider';
import { FormInputKeys } from '../../types';

type ButtonProps = {
    name: FormInputKeys;
    label: string;
    postUrl: string;
    isClicked: boolean;
    setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
    clickHandler: (e: React.MouseEvent) => any;
    stringifiedData: string;
    setResponse: React.Dispatch<React.SetStateAction<any>>;
};

export const ButtonPost = ({
    name,
    label,
    postUrl,
    isClicked,
    setIsClicked,
    clickHandler,
    stringifiedData,
    setResponse,
}: ButtonProps) => {
    const { errors, setErrors, clearErrorIfExists } = useContext(
        GenericContext
    ) as GenericProviderValues;

    useEffect(() => {
        try {
            if (isClicked) {
                const POST = async () => {
                    await POST_TOF(postUrl, stringifiedData, setResponse, true);
                    clearErrorIfExists(name);
                    setIsClicked(false);
                };
                POST();
            }
        } catch (e) {
            let newErrors = { ...errors };
            newErrors[name] = `${e}`;
            setErrors(() => newErrors);
            setIsClicked(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stringifiedData]);

    return (
        <>
            {isClicked ? (
                <button disabled>Loading...</button>
            ) : (
                <button onClick={clickHandler}>{label}</button>
            )}
        </>
    );
};
