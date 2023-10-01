import React, { FC, useContext } from "react";
import './Input.css'
import { FormContext, FormValueType } from '../../context'

interface FieldProps {
    name: string,
    children: (values: FormValueType) => React.ReactNode
}

const Field: FC<FieldProps> = ({
    children
}) => {
    const fromContext = useContext(FormContext)
    return children({ ...fromContext})
}
export default Field;