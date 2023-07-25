import React from "react";
import * as yup from "yup";
const today = new Date();

// ! change this to employer heading
export const EmpJobCreateYup = yup.object().shape({
    title: yup.string().min(8, "Minimum 8 characters required").required("title is required"),
    designation: yup.string().min(6, "Minimum 6 characters required").required("designation is required"),
    companyname: yup.string().min(2, "Minimum 2 characters required").required("Please enter company name"),
    reportingto: yup.string().min(2, "Minimum 2 characters required").required("Please enter reportingto"),
    description: yup.string().min(15, "Minimum 15 characters required").required("Please enter description"),
    jobtype: yup.string().min(2, "Minimum 4 characters required").required("Please enter jobtype"),
    location: yup.string().min(4, "Minimum 4 characters required").required("Please enter location"),
    firstday: yup.string().min(5, "Minimum 5 characters required").required("Please enter firstday"),
    lastday: yup.string().min(5, "Minimum 5 characters required").required("Please enter lastday"),
    contact: yup.string().min(5, "Minimum 5 characters required").required("Please enter contact"),
    industrytype: yup.string().min(5, "Minimum 5 characters required").required("Please enter industry type"),
    qualification: yup.string().min(5, "Minimum 5 characters required").required("Please enter qualification"),
    experience: yup.string().min(1, "Minimum 1 characters required").required("Please enter experience"),
    skills: yup.string().min(2, "Minimum 2 characters required").required("Please enter skills"),
    ctc: yup.string().min(2, "Minimum 2 characters required").required("Please enter CTC"),
    benefits: yup.string().min(10, "Minimum 10 characters required").required("Please enter benefits"),
    date: yup.date().min(today, "dates should not represent past").required("Please enter date").typeError("Invalid Date"),
})