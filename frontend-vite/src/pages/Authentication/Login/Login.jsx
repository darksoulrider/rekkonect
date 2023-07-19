import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/common/Navbar/Navbar'
import * as styled from "./Login.styled"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { LoginValidationSchema } from "../../../utils/YupValidation"
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../../redux/apicall/auth'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const Login = () => {
  const navigate = useNavigate();
  const [isemail, Setisemail] = useState('')
  const [ispassword, Setispassword] = useState('')

  const [loginUser, { isError, isSuccess, isLoading }] = useLoginMutation();

  const LoginReq = async (e) => {
    e.preventDefault()
    // const data = await axios.post(
    //   `http://localhost:5000/api/login`,
    //   { email: isemail, password: ispassword },
    //   {
    //     headers: {
    //       'Content-type': 'application/json',
    //     },

    //     withCredentials: true,
    //   }
    // );

    const user = await loginUser({
      email: isemail,
      password: ispassword
    });
    // console.log(user);
  }
  useEffect(() => {
    if (isSuccess) {
      toast.success("login success")
    }
  }, [isSuccess])

  return (
    <div>
      <Navbar />
      <styled.Container>
        < styled.ImageContainer>
          {/* image container here */}
        </styled.ImageContainer>
        <styled.Form >
          <h1>Login to Your Account</h1>
          <input
            type="text"
            autoCorrect='false'
            placeholder='Enter your username'
            value={isemail}
            onChange={(e) => Setisemail(e.target.value)}

            style={{ color: 'black' }}
          />

          <input
            type="password"
            autoCorrect='false'
            autoComplete='off'
            placeholder='Enter your  password'
            style={{ color: 'black' }}
            value={ispassword}
            onChange={(e) => Setispassword(e.target.value)}

          />

          <button onClick={(e) => LoginReq(e)}>login</button>
          <div className="infos">
            <p className='one'>Don't have an accont?
              <span onClick={() => navigate("/signup")}>Register</span>
            </p>
            <p className='two'>Forget Password?</p>
          </div>
          <div className="otherLogin">

          </div>
        </styled.Form>
      </styled.Container>
      <ToastContainer />
    </div>
  )
}

export default Login;