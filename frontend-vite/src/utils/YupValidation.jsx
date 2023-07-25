import React from "react";
import * as yup from "yup";


export const LoginValidationSchema = yup.object().shape({
    login: yup.string().required("Please enter your Email"),
    password: yup.string().required("Please enter your password"),
})

export const SignupValidatinSchema = yup.object().shape({
    email: yup.string().email().required("Please enter your email"),
    password: yup.string()
        .min(8, "Choose Strong password.")
        .required("Please enter your password"),
    CP_password: yup.string().oneOf([yup.ref("password"), null], "Passowrd should match").required("Confirm password required"),
})


// ! change this to employer heading
export const Emp_Personalinfo = yup.object().shape({
    firstName: yup.string().min(2, "Minimum 2 characters required").required("First name is required").typeError("Firstname should be string"),
    lastName: yup.string().min(2, "Minimum 2 characters required").required("Last name is required").typeError("Lastname should be string"),
    email: yup.string().email().required("Please enter your email"),
    contact: yup.number().min(10, "minimum 10 characters required").required("Contact number is required").typeError("contact should be number"),
    companyName: yup.string().required("Please enter company name"),
    birthDate: yup.date().required("Please enter birth date"),
    state: yup.string().required("Please enter state"),
    city: yup.string().required("Please enter city"),
    landmark: yup.string().required("Please enter landmark"),
    pinCode: yup.number().min(6, 'minimum 6 number required').required("Please enter pin code").typeError("Pin code must be a number")
})