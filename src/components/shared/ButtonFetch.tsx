import { useContext, useEffect, useState } from 'react';
import { GenericContext } from '../../contexts/GenericContext';
import { GET_TOF } from '../../logic/JSONGET';
import { GenericProviderValues } from '../../providers/GenericProvider';
import { FormInputKeys } from '../../types';

type ButtonProps = {
    name: FormInputKeys;
    label: string;
    fetchUrl: string;
    setData: React.Dispatch<React.SetStateAction<any>>;
};

export const ButtonFetch = ({
    name,
    label,
    fetchUrl,
    setData,
}: ButtonProps) => {
    const { errors, setErrors, clearErrorIfExists } = useContext(
        GenericContext
    ) as GenericProviderValues;

    const [isClicked, setIsClicked] = useState(false);

    const onClickHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsClicked(true);
        console.log(`%csetClicked ${name} to true`, 'color: gray');
    };

    useEffect(() => {
        try {
            if (isClicked) {
                const GET = async () => {
                    await GET_TOF(fetchUrl, setData, true);
                    clearErrorIfExists(name);
                    setIsClicked(false);
                };
                GET();
            }
        } catch (e: any) {
            let newErrors = { ...errors };
            newErrors[name] = e;
            setErrors(() => newErrors);
            setIsClicked(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isClicked]);

    return (
        <>
            {isClicked ? (
                <button disabled>Loading...</button>
            ) : (
                <button onClick={onClickHandler}>{label}</button>
            )}
        </>
    );
};
