import React, { FC, useState } from 'react'
import { FormContext, ValidateFunction, ObjectValues, ValidateType } from '../../context'

type FormProps = {
    children: React.ReactNode,
    initiateValues: ObjectValues
    onSubmit: (value: ObjectValues) => void,
    validate?: ValidateType,
}


const Form: FC<FormProps> = ({ children, onSubmit, initiateValues, validate}) => {
     const [errors, setErrors] = useState({})
     const [formValues, setFormValues] = useState(initiateValues)
     const [formValidates, setFormValidates] = useState(initiateValues)
     
     const onValidate = (name: string) => {
        console.log('validate', validate)
        if(!validate) return
        const error = validate[name]?.(formValues[name], formValues)
        console.log('error', error)
        if(error) {
         setErrors(preValue => ({
             ...preValue,
             [name]: error
         }))
        } else {
         setErrors(preValue => ({
             ...preValue,
             [name]: ''
         }))
        }
        return error
     }
     const onValidateByFunction = (name: string, func: ValidateFunction) => {
        console.log('validate', validate)
        if(!validate) return
        const error = func(formValues[name], formValues)
        console.log('error', error)
        if(error) {
         setErrors(preValue => ({
             ...preValue,
             [name]: error
         }))
        } else {
         setErrors(preValue => ({
             ...preValue,
             [name]: ''
         }))
        }
        return error
     }

     console.log('formValues', formValues)
     return (
        <FormContext.Provider value={{
            formValues,
            errors,
            setErrors,
            setFormValues,
            onValidate,
            onValidateByFunction,
            formValidates,
            setFormValidates
        }}>
            <form onSubmit={(e) => {
                e.preventDefault();
                //validate
                const fields = Object.keys(formValidates)
                onSubmit(formValues)
            }}>
                {children}
            </form>
        </FormContext.Provider>
     )
}
export default Form