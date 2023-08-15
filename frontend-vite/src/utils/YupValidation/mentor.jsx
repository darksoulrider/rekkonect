import React from "react";
import * as yup from "yup";
const today = new Date();


export const mentor_info = yup.object().shape({
    firstname: yup.string().min(2, "Minimum 2 characters required").required("firstname is required"),
    lastname: yup.string().min(2, "Minimum 2 characters required").required("lastname is required"),
    state: yup.string().required("state is required"),
    pincode: yup.number().min(6, 'minimum 6 number required').required("Please enter zip code").typeError("zip code must be a number"),
    contact: yup.string().min(10, "Minimum 10 number required").max(10, "Maximum 10 number required").required("Please enter contact"),
    bio: yup.string().min(6, "Minimum 6 characters required").required("lastname is required"),

});