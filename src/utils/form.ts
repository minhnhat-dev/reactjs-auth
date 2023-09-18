export type Error = {
    email?: string
    password?: string
}

export type FormField = {
    value: string,
    error?: string,
}
  
export const isFormFieldValid = (formField: FormField) => formField.value && !formField.error