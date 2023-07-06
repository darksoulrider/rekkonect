import React from 'react'
import Navbar from '../../../components/common/Navbar/Navbar'
import * as styled from "./signup.styled"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {LoginValidationSchema} from "../../../utils/YupValidation"
const Signup = () => {
    
  const {register,handleSubmit,formState:{errors}} = useForm({
    resolver: yupResolver(LoginValidationSchema),
  });

  const SignupReq = (data) =>{
    // call the RTK query here 
    console.log(data)

  }


  return (
    <div>
      <Navbar/>
      <styled.Container>
          < styled.ImageContainer>
          {/* image container here */}
           </styled.ImageContainer>
          <styled.Form onSubmit={handleSubmit(SignupReq)}>
            <h1>Sign up to Your Account</h1>
            <input 
              type="text" 
              autoCorrect='false' 
              placeholder='Enter your username'
              {...register("username")}
            />
            {(errors.username && <p className="error">{errors.username.message}</p>)}
            <input 
              type="password" 
              autoCorrect='false' 
              autoComplete='off'
              placeholder='Enter your  password' 
              {...register("password")}
            />
            {(errors.password && <p className="error">{errors.password.message}</p>)}
            <button type='submit'>signup</button>
            <div className="infos">
              <p className='one'>Don't have an accont?
              <span onClick={()=>navigate("/signup")}>Register</span>
              </p>
              <p className='two'>Forget Password?</p>
            </div>
            <div className="otherLogin">

            </div>
          </styled.Form>
      </styled.Container>
    </div>
  )
}

export default Signup;