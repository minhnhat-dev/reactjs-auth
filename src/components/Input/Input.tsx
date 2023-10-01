import { FC, useContext, useEffect } from "react";
import './Input.css'
import { FormContext, ObjectValues } from '../../context'

interface InputProps {
    type: 'email' | 'password' | 'text' | 'number'
    label: string
    name: string
    placeholder: string,
    validate?: (value: string, formValues?: ObjectValues) => string 
}
const Input: FC<InputProps> = ({
    type,
    label,
    name,
    placeholder,
    validate
}) => {
    const { registerFormItem, unRegisterFormItem, formValues, setFormValues, errors, onValidate, onValidateByFunction, setFormValidates } = useContext(FormContext)
    useEffect(() => {
        if(validate) {
            setFormValidates((preValues) => (
                {
                    ...preValues,
                    [name]: validate
                }
            ))
        }
    }, [validate])

    useEffect(() => {
        if(name) {
            registerFormItem(name)
        }
        return () => unRegisterFormItem(name)
    }, [name])

    return (
        <div className="container__wrapper__form__inputs__input-items">
            <label htmlFor="">{label}</label>
            <input
                className="form_item"
                type={type}
                id={label}
                value={formValues[name]}
                name={name}
                placeholder={placeholder}
                onChange={(e) => {
                    setFormValues((preValues) => ({
                      ...preValues,
                      [name]: e.target.value
                    }))
                   }}
                onBlur={() => {
                    if(validate) {
                        return onValidateByFunction(name, validate)
                    }
                    onValidate(name)
                }}
            >
            </input>
            {errors[name] && <p className="error">{errors[name]}</p>}
        </div>
    )
}

export default Input;