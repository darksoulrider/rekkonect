import React from "react";
import * as yup from "yup";


export const LoginValidationSchema = yup.object().shape({
    username:yup.string().required("Please enter your Email"),
    password:yup.string().required("Please enter your password"),
})

export const SignupValidatinSchema = yup.object().shape({
    email:yup.string().email().required("Please enter your email"),
    username:yup.string().required("Please enter your username"),
    password:yup.string()
    .min(8,"Choose Strong password.")
    .required("Please enter your password"),
    CP_password:yup.string().oneOf([yup.ref("password"),null], "Passowrd should match").required("Confirm password required"),
})