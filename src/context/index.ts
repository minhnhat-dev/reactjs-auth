import { Dispatch, SetStateAction, createContext } from "react";
export type ValidateFunction = (value: string, formValues?: ObjectValues) => string
export type ObjectValues = Record<string, string>
export type ValidateType = {
    [key: string]: (value: string, formValues?: ObjectValues) => string
}
export type FuncValidateType = {
    [key: string]: (value: string, formValues?: ObjectValues) => string
}
export type FormValueType = {
    formValues: ObjectValues,
    errors: ObjectValues,
    setErrors:Dispatch<SetStateAction<ObjectValues>>,
    setFormValues: Dispatch<SetStateAction<ObjectValues>>,
    onValidate: (value: string, formValues?: ObjectValues) => void,
    onValidateByFunction: (name: string, func: ValidateFunction, formValues?: ObjectValues) => void,
}
export const FormContext = createContext({} as FormValueType)
