import React, { useEffect } from 'react'
import styled from "styled-components"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { UpdatePersonal_MentorInfo } from '../../../utils/YupValidation'
import { useUpdateProfileMutation } from '../../../redux/apicall/employer/userProfile'

const PersonalInfo = ({ userdata }) => {
    const [isEdit, SetIsEdit] = useState(false);
    const handleClickEvent = (e) => {
        e.preventDefault();
        SetIsEdit(!isEdit);
    };
    // ! checking call mutatation for child and parent
    const [update, { isError, isSuccess, isLoading }] = useUpdateProfileMutation();

    const submitForm = async (e) => {
        //! handle form with 
    }

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(UpdatePersonal_MentorInfo),
        defaultValues: {
            firstName: userdata?.user?.firstName || '',
            lastName: userdata?.user?.lastName || '',
            email: userdata?.user?.email || '',
            contact: userdata?.user?.phoneNumber || '',
            companyName: userdata?.user?.companyName || '',
            birthDate: userdata?.user?.birthdate
                ? new Date(userdata.user.birthdate).toLocaleDateString('en-CA')
                : 'dd/mm/yyyy',
            state: userdata?.user?.address.state || '',
            city: userdata?.user?.address.city || '',
            pinCode: userdata?.user?.address.pinCode || '',
            landmark: userdata?.user?.address.landMark || '',
        }
    });

    const updateProfile = async (data) => {
        const see = await update(data);
        SetIsEdit(!isEdit);
        //  if success we can show toast here
    }


    const inputData = [
        {
            title: "Company Name",
            placeholder: "Company Name",
            register: "companyName",

        },
        {
            title: "Email",
            placeholder: "E-mail",
            register: "email",

        },
        {
            title: "FirstName",
            placeholder: "FirstName",
            register: "firstName",

        },
        {
            title: "Lastname",
            placeholder: "Lastname",
            register: "lastName",

        },

        {
            title: "Contact",
            placeholder: "Contact",
            register: "contact",

        },
        {
            title: "BirthDate",
            placeholder: "DOB",
            register: "birthDate",

        },
        {
            title: "State",
            placeholder: "state",
            register: "state",

        },
        {
            title: "City",
            placeholder: "city",
            register: "city",

        },
        {
            title: "Landmark",
            placeholder: "landmark",
            register: "landmark",

        },
        {
            title: "Pin Code",
            placeholder: "Pin Code",
            register: "pinCode",

        },
    ]


    return (
        <Container className="shadow-md">
            <form onSubmit={handleSubmit(updateProfile)}>
                <div className={`cstm-btn-layer flex items-center justify-between`}>
                    <h1>Personal Information</h1>
                    <button type="text" onClick={handleClickEvent} className={` ${isEdit ? "hidden" : "block"}  cstm-edit  `}>Edit</button>
                    <div className={`flex ${isEdit ? "block" : "hidden"}  cstm-btns `}>
                        <button onClick={handleClickEvent} className={`cstm-cancle`}>Cancel</button>
                        <button type="submit" className={`cstm-submit`}>Submit</button>
                    </div>
                </div>
                <div>
                    <div className="cstm-form " >
                        {inputData.map((item) => {
                            return (
                                // style={{ color: "black", fontSize: "1.1rem", marginBottom: "1rem" }}
                                <div key={item.title}>
                                    <p className='cstm-title'>{item.title}</p>
                                    <input type={`${item.title === "BirthDate" ? "date" : "text"}`} className='text-black shadow-md' placeholder={item.placeholder} disabled={!isEdit}  {...register(item.register)}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div >
            </form>
        </Container >
    )
}

export default PersonalInfo


const Container = styled.div`
/* border-right: 1px solid rgba(56, 53, 53,0.2); */


    @media(max-width: ${props => props.theme.isMobile}) { 
        padding: 2rem;
        .cstm-btn-layer {
            display: flex;
            justify-content: flex-between;
            align-items: center;
            
            >h1{
                font-size:2rem;
                color: #272626;
                font-weight:800;
                font-family: "roboto";
                margin: 1rem 3rem;
            }
            >.cstm-edit{
                width:6rem;
                height:3rem;
                color:white;
                background-color: rgb(234 88 12 );
                font-weight:bold;
                font-size:1.3rem;
                border-radius: 0.7rem;
                margin-right:2.5rem;
                cursor:pointer;
                &:hover{
                    background-color: #2353a9
                }
            }
            .cstm-btns{
                >.cstm-cancle{
                    width:8rem;
                    height: 3rem;
                    margin-right: 1.5rem;
                    background-color: #157499;
                    color:white;
                    font-weight: 800;
                    border-radius: 0.8rem;
                }
                >.cstm-submit{
                    width:8rem;
                    height: 3rem;
                    color:white;
                    background-color: #ea580c;
                    margin-right:2.5rem;
                    font-weight: 800;
                    border-radius: 0.8rem;
                }
            }
        }
        .cstm-form{
            margin: 1rem 3rem;
            display: flex;
            flex-direction:  column;
            /* grid-template-columns:1fr  ; */
            gap:1rem;
            
            >div>input{
                border: 1px solid rgba(2,1,2,0.5);
                margin-bottom:1.5rem;
                /* background-color: #f9f6f6;/ */
                background-color: #fdfcfc;
                
                
            }
            .cstm-title{
                color: #252424;
                font-size:1.6rem;
                font-weight: 600;
                margin-bottom:0.4rem;
                letter-spacing: 0.03rem;
                
            }
        }        
    }
    @media(min-width: ${props => props.theme.isMobile}) and (max-width: ${props => props.theme.isTab}) { 
        .cstm-btn-layer {
            display: flex;
            justify-content: flex-between;
            align-items: center;
            
            >h1{
                font-size:2rem;
                color: #272626;
                font-weight:800;
                font-family: "roboto";
                margin: 1rem 3rem;
            }
            >.cstm-edit{
                width:6rem;
                height:3rem;
                color:white;
                background-color: rgb(234 88 12 );
                font-weight:bold;
                font-size:1.3rem;
                border-radius: 0.7rem;
                margin-right:2.5rem;
                cursor:pointer;
                &:hover{
                    background-color: #2353a9
                }
            }
            .cstm-btns{
                >.cstm-cancle{
                    width:8rem;
                    height: 3rem;
                    margin-right: 1.5rem;
                    background-color: #157499;
                    color:white;
                    font-weight: 800;
                    border-radius: 0.8rem;
                }
                >.cstm-submit{
                    width:8rem;
                    height: 3rem;
                    color:white;
                    background-color: #ea580c;
                    margin-right:2.5rem;
                    font-weight: 800;
                    border-radius: 0.8rem;
                }
            }
        }
        .cstm-form{
            margin: 1rem 3rem;
            display: flex;
            flex-direction:  column;
            /* align-items: center; */
            /* grid-template-columns:1fr  ; */
            gap:1rem;
            
            >div>input{
                border: 1px solid rgba(2,1,2,0.5);
                margin-bottom:1.5rem;
                /* background-color: #f9f6f6; */
                background-color: #fdfcfc;
                
            }
            .cstm-title{
                color: #252424;
                font-size:1.6rem;
                font-weight: 600;
                margin-bottom:0.4rem;
                letter-spacing: 0.03rem;
                
            }
        }        
    }
    @media(min-width: ${props => props.theme.isTab}) and (max-width: ${props => props.theme.isLargeTab}) { 
        padding: 2rem;
        .cstm-btn-layer {
            display: flex;
            justify-content: flex-between;
            align-items: center;
            
            >h1{
                font-size:2rem;
                color: #272626;
                font-weight:800;
                font-family: "roboto";
                margin: 1rem 3rem;
            }
            >.cstm-edit{
                width:6rem;
                height:3rem;
                color:white;
                background-color: rgb(234 88 12 );
                font-weight:bold;
                font-size:1.3rem;
                border-radius: 0.7rem;
                margin-right:2.5rem;
                cursor:pointer;
                &:hover{
                    background-color: #2353a9
                }
            }
            .cstm-btns{
                >.cstm-cancle{
                    width:8rem;
                    height: 3rem;
                    margin-right: 1.5rem;
                    background-color: #157499;
                    color:white;
                    font-weight: 800;
                    border-radius: 0.8rem;
                }
                >.cstm-submit{
                    width:8rem;
                    height: 3rem;
                    color:white;
                    background-color: #ea580c;
                    margin-right:2.5rem;
                    font-weight: 800;
                    border-radius: 0.8rem;
                }
            }
        }
        .cstm-form{
            margin: 1rem 3rem;
            display: grid;
            grid-template-columns:1fr 1fr;
            gap:1rem;
            
            >div>input{
                border: 1px solid rgba(2,1,2,0.5);
                margin-bottom:1.5rem;
                /* background-color: #f9f6f6; */
                background-color: #fdfcfc;
                
            }
            .cstm-title{
                color: #252424;
                font-size:1.6rem;
                font-weight: 600;
                margin-bottom:0.4rem;
                letter-spacing: 0.03rem;
                
            }
        }
    }

    @media(min-width: ${props => props.theme.isLargeTab}) and (max-width: ${props => props.theme.isDesktop}) { 
       
        .cstm-btn-layer {
            display: flex;
            justify-content: flex-between;
            align-items: center;
            >h1{
                font-size:2rem;
                color: #272626;
                font-weight:800;
                font-family: "roboto";
                margin: 1rem 3rem;
            }
            >.cstm-edit{
                width:6rem;
                height:3rem;
                color:white;
                background-color: rgb(234 88 12 );
                font-weight:bold;
                font-size:1.3rem;
                border-radius: 0.7rem;
                margin-right:2.5rem;
                cursor:pointer;
                &:hover{
                    background-color: #2353a9
                }
            }
            .cstm-btns{
                >.cstm-cancle{
                    width:8rem;
                    height: 3rem;
                    margin-right: 1.5rem;
                    background-color: #157499;
                    color:white;
                    font-weight: 800;
                    border-radius: 0.8rem;
                }
                >.cstm-submit{
                    width:8rem;
                    height: 3rem;
                    color:white;
                    background-color: #ea580c;
                    margin-right:2.5rem;
                    font-weight: 800;
                    border-radius: 0.8rem;
                }
            }
        }
        .cstm-form{
            margin: 1rem 3rem;
            display: grid;
            grid-template-columns:1fr 1fr;
            gap:1rem;
            >div>input{
                border: 1px solid rgba(2,1,2,0.5);
                margin-bottom:1.5rem;
                /* background-color: #f9f6f6; */
                background-color: #fdfcfc;
                margin-right: 1rem;
            }
            .cstm-title{
                color: #252424;
                font-size:1.6rem;
                font-weight: 600;
                margin-bottom:0.4rem;
                letter-spacing: 0.03rem;
                
            }
        }
    }
        
`