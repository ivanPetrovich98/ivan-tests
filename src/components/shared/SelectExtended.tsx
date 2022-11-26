import React, {
    useContext,
    useEffect,
    useState /*, { useContext }*/,
} from 'react';
import { GenericContext } from '../../contexts/GenericContext';
import { GenericProviderValues } from '../../providers/GenericProvider';
import { FormInputKeys } from '../../types';
//import { GenericContext } from '../../contexts/GenericContext';

type SelectProps = {
    name: FormInputKeys;
    label: string;
    options: string[];
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export const SelectExtended = ({
    name,
    label,
    options,
    formData,
    setFormData,
}: SelectProps) => {
    const { errors, setErrors, clearErrorIfExists } = useContext(
        GenericContext
    ) as GenericProviderValues;

    /**
     * Whenever the options change,
     * if they're not empty, load the first option into formData
     */
    useEffect(() => {
        if (options && options.length > 0) {
            console.log(`%cValue changed to ${options[0]}`, 'color: magenta');
            let newFormData = { ...formData };
            newFormData[name] = options[0];
            setFormData(newFormData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(`%cValue changed to ${e.target.value}`, 'color: magenta');
        let newFormData = { ...formData };
        newFormData[name] = e.target.value;
        setFormData(newFormData);
    };

    if (!options || options.length === 0) {
        return <></>;
    }

    return (
        <>
            <label htmlFor={name}>{label}</label>
            <select
                name={name}
                id={name}
                value={formData[name]}
                onChange={onChangeHandler}
            >
                {options.map((option, i) => (
                    <option key={i + option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </>
    );
};
