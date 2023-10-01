import React, { FC, useState } from 'react'
import { FormContext, ValidateFunction, ObjectValues, ValidateType, FuncValidateType } from '../../context'

type FormProps = {
    children: React.ReactNode,
    initiateValues: ObjectValues
    onSubmit: (value: ObjectValues) => void,
    validate?: ValidateType,
}


const Form: FC<FormProps> = ({ children, onSubmit, initiateValues, validate}) => {
     const [errors, setErrors] = useState({})
     const [formValues, setFormValues] = useState(initiateValues)
     const [formValidates, setFormValidates] = useState<FuncValidateType>({})

     const registerFormItem = (name: string) => {
        setFormValues((preValues) => ({
            ...preValues,
            [name]: ''
        }))
     }
     const unRegisterFormItem = (name: string) => {
        setFormValues((preValues) => {
            const newValues = {...preValues}
            delete newValues[name]
            return newValues
        })
        setFormValidates((preValues) => {
            const newFormValidates= {...preValues}
            delete newFormValidates[name]
            return newFormValidates
        })
     }
     const onValidate = (name: string): string => {
        console.log('validate', validate)
        if(!validate) return ''
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
        const error = func(formValues[name], formValues)
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

     return (
        <FormContext.Provider value={{
            formValues,
            errors,
            setErrors,
            setFormValues,
            onValidate,
            onValidateByFunction,
            setFormValidates,
            formValidates,
            registerFormItem,
            unRegisterFormItem
        }}>
            <form onSubmit={(e) => {
                const validateError: Record<string, string> = {}
                e.preventDefault();
                //validate
                const fields = Object.keys(formValues)
                fields.forEach((field: string) => {
                    let error = ''
                    if(formValidates[field]) {
                        error = onValidateByFunction(field, formValidates[field])
                    } else {
                        error = onValidate(field)
                    }
                    if(error) {
                        validateError[field] = error
                    }
                })
                const isInvalid = Object.keys(validateError).length > 0
                if(isInvalid) return 
                onSubmit(formValues)
            }}>
                {children}
            </form>
        </FormContext.Provider>
     )
}
export default Form