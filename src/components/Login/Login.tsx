import React, {  useState  } from 'react'
import './Login.css'
import Logo from '../../assets/logo.png'
import Input from '../Input/Input'
import Form from '../Form/Form'
import Profile from '../../pages/Profile/Profile'
import Checkbox from '../Checkbox/Checkbox'
import { ObjectValues } from '../../context'
const validateEmail = (value: string) => {
  const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
  if(!value) return "Email is required"
  if(!regex.test(value)) return "Email invalid"
  return ''
}
const validatePassword = (value: string) => {
  console.log('value', value)
  if(!value) return "Password is required"
  return ''
}
const validateConfirmPassword = (value: string, formValues?: ObjectValues ) => {
  console.log('value', value)
  if(!value) return "Confirm Password is required"
  const password = formValues && formValues['password']
  if(password !== value) return "Password and Confirm Password does not match."
  return ''
}
const Login = () => {
  const initiateValues = {
    email: "",
    password: "",
    confirmPassword: ""
  }
  const [isValid, setIsValid] = useState<boolean>(false)
  return isValid ? <Profile></Profile> : (
    <div className='container__login'>
      <div className='container__wrapper'>
        <div className="container__wrapper__header">
            <img className='container__wrapper__header__image' src={Logo}></img>
            <p className='container__wrapper__header__text'>Login to your account</p>
        </div>
        <div className="container__wrapper__buttons">
          <button className='btn'>Google</button>
          <button className='btn'>Facebook</button>
          <button className='btn'>Twitter</button>
        </div>
        <div className="container__wrapper__spread">
         <span className='container__wrapper__spread-line'></span>
         <span className='container__wrapper__spread__spread-text'>OR</span>
        </div>
        <div className="container__wrapper__form">
            <Form 
            initiateValues={initiateValues} 
            onSubmit={async (formValues) => {
              const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                body: JSON.stringify(formValues),
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              const result = await response.json()
              if(result.id) {
               return setIsValid(true)
              }
              setIsValid(false)
              alert(result.error)
            }}
            validate={{
              email: validateEmail,
              // password: validatePassword
            }}
            >
             <div className="container__wrapper__form__inputs">
                <Input
                  type={'email'}
                  label={''}
                  name={'email'}
                  placeholder="Email Address"
                />
                <Input
                  type={'password'}
                  label={''}
                  name={'password'}
                  placeholder="Password"
                  validate={validatePassword}
                />
                 <Input
                  type={'password'}
                  label={''}
                  name={'confirmPassword'}
                  placeholder="Confirm Password"
                  validate={validateConfirmPassword}
                />
             </div>
             <div className="container__wrapper__form__remember">
                <Checkbox/>
                <a className="link">Forgot password</a>
             </div>
            <div className="footer">
              <button type="submit">Login</button>
               <span>Don’t have an account? <a className='link'>Sign up</a></span>
            </div>
            </Form>

        </div>
       
      </div>
    </div>
  )
}

export default Login