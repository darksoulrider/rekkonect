import React, { useState } from 'react'
import { styled } from 'styled-components'

import { BiSolidEdit } from "react-icons/bi"
import { AiFillCloseCircle } from "react-icons/ai"

import Select from 'react-select'


import { states } from '../../../../utils/SearchArrayOption/States';

import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form'
import { mentor_info } from '../../../../utils/YupValidation/mentor'
// **************** Api Imports ************************
import { useUpdateAddressAndNameMutation } from '../../../../redux/apicall/mentor/Dashboard';

const Mentor_Prof = () => {

    // ****************** Use Sates used ***********************
    const [isOpen, SetisOpen] = useState(false)


    // ************* Api hook initialized ****************
    const [setInfo, { isError: issetInfoError, isSuccess: issetInfoSuccess, isLoading: issetLoading }] = useUpdateAddressAndNameMutation();

    // ************* Use Form *******************
    const { register: registerInfo, handleSubmit: handleInfo, setValue, getValues, formState: { errors: errorsInfo }, } = useForm({
        resolver: yupResolver(mentor_info),
    });

    const [stateInitial, setstateInitial] = useState(null);
    const handlestateChange = (val) => {
        setValue('state', val.value, {
            shouldValidate: true,
        });
        setstateInitial(val);
    };

    // **** create key-value pair ************
    const state_opt = states.map((state) => ({
        value: state.toLowerCase(),
        label: state,
    }));


    // ********* this api call function used *************
    const sendingInfo = async (info) => {
        const sendInfo = {
            firstName: info.firstname,
            lastName: info.lastname,
            state: info.state,
            pincode: info.pincode,
            contact: info.contact,
            bio: info.bio,
        }
        console.log(sendInfo);


        // const data = await setInfo(sendInfo);
    }


    // ! if successfull or any then using useEffect we can turn it off
    const sendClick = (data) => {
        console.log(data);
        alert(data.state);
        SetisOpen(false)
    }



    return (
        <Container>
            <div className='cstm-layer '>
                <div className='cstm-top '>
                    <p>Firstname Lastname</p>
                    <BiSolidEdit className='cstm-edit' onClick={() => SetisOpen(true)} />
                </div>
                <div className='cstm-bio'>
                    <p className=''>Cuber Security | c++ | python | Working in jungle</p>
                </div>
                <div className='cstm-details flex-wrap'>
                    <div>
                        <p>Email Address:</p>
                        <span>mack@gmail.com</span>
                    </div>
                    <div>
                        <p>Contact:</p>
                        <span>8778865634</span>
                    </div>
                    <div>
                        <p>Pin:</p>
                        <span>422022</span>
                    </div>
                    <div>
                        <p>State:</p>
                        <span>Maharastra</span>
                    </div>

                </div>

            </div>

            {
                isOpen ?
                    <div className='cstm-popup'>
                        <form onSubmit={handleInfo(sendingInfo)} className="cstm-popup-edit flex flex-col ">
                            <div className='flex justify-end'>
                                <AiFillCloseCircle onClick={() => SetisOpen(false)} className="cstm-close " />

                            </div>
                            <div className='cstm-form-content items-center flex flex-col mt-4'>
                                <div className='flex gap-4 mb-4 '>
                                    <div className='cst-check'>
                                        <div>
                                            <p className='text-xl font-bold mb-2 ' >Firstaname </p>
                                            <input {...registerInfo('firstname')} type="text" style={{
                                                border: "0.3px solid gray", borderRadius: "0.5rem",
                                                fontSize: "1.6rem"
                                            }} />
                                        </div>
                                        {errorsInfo.firstname && <span>{errorsInfo.firstname.message}</span>}
                                    </div>
                                    <div>
                                        <div>

                                            <p className='text-xl font-bold mb-2 ' >Lastname </p>
                                            <input {...registerInfo('lastname')} type="text" style={{ border: "0.3px solid gray", borderRadius: "0.5rem", fontSize: "1.6rem" }} />
                                        </div>
                                        {errorsInfo.lastname && <span>{errorsInfo.lastname.message}</span>}
                                    </div>
                                </div>
                                <div className='flex gap-4 mb-5'>
                                    <div>
                                        <div>
                                            <p className='text-xl font-bold mb-2 ' >State </p>
                                            <div className='outline-none'>
                                                <Select
                                                    options={state_opt}
                                                    {...registerInfo('state')}
                                                    value={stateInitial}
                                                    onChange={handlestateChange}

                                                    styles={{
                                                        input: (baseStyles, state) => ({
                                                            ...baseStyles,
                                                            height: '2.9rem',
                                                            alignContent: 'center',
                                                            "@media only screen and (max-width: 640px)": {
                                                                ...baseStyles["@media only screen and (max-width: 640px)"],

                                                                height: "1rem",
                                                            },

                                                        }),

                                                        placeholder: (baseStyles, state) => ({
                                                            ...baseStyles,
                                                            fontSize: '1.3rem',

                                                        }),
                                                        control: (provided) => ({
                                                            ...provided,
                                                            fontSize: '1.5rem',
                                                            width: "26rem",
                                                            border: "1px solid gray",

                                                            "@media only screen and (max-width: 640px)": {
                                                                ...provided["@media only screen and (max-width: 640px)"],
                                                                fontSize: '1rem',
                                                                width: "16rem",
                                                            },

                                                        }),
                                                        singleValue: (provided) => ({
                                                            ...provided,
                                                            fontSize: '1.6rem',


                                                        }),
                                                        option: (provided, state) => ({
                                                            ...provided,
                                                            fontSize: '1.4rem', // Change the font size of the dropdown menu values
                                                        }),
                                                        menu: (provided, state) => ({
                                                            ...provided,
                                                            "@media only screen and (max-width: 640px)": {
                                                                ...provided["@media only screen and (max-width: 640px)"],
                                                                width: "16rem",
                                                            },

                                                        }),

                                                    }}

                                                />
                                            </div>
                                        </div>
                                        {errorsInfo.state && <span>{errorsInfo.state.message}</span>}
                                    </div>

                                    <div>
                                        <div>
                                            <div>

                                                <p className='text-xl font-bold mb-2 ' >Zip code </p>
                                                <input {...registerInfo('pincode')} type="text" style={{ border: "0.3px solid gray", borderRadius: "0.5rem", fontSize: "1.6rem" }} />
                                            </div>
                                            {errorsInfo.pincode && <span>{errorsInfo.pincode.message}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full flex justify-center mb-10'>
                                    <div>
                                        <div>

                                            <p className='text-xl font-bold mb-2 '>Contact </p>
                                            <input {...registerInfo('contact')} type="text" style={{ border: "0.3px solid gray", borderRadius: "0.5rem", fontSize: "1.6rem" }} />
                                        </div>
                                        {errorsInfo.contact && <span>{errorsInfo.contact.message}</span>}
                                    </div>
                                </div>

                            </div>

                            <div className='flex flex-col items-center'>

                                <p className='text-2xl font-bold '> Bio: </p>
                                <textarea {...registerInfo('bio')} spellCheck="false" placeholder='About you..' rows="2" cols="84" className='bg-slate-50'>
                                </textarea>

                                {errorsInfo.bio && <span>{errorsInfo.bio.message}</span>}

                            </div>
                            <div className='flex justify-center'>
                                <button className='bg-gray-800 shadow-md py-5 px-8 rounded-md text-white font-extrabold text-lg hover:bg-black' type='submit' >Click me</button>
                            </div>
                        </form>
                    </div> : null
            }



        </Container >
    )
}

export default Mentor_Prof;


const Container = styled.div`
    .cstm-layer{
        
        background-color:white;
        border-radius: 1.5rem;
        margin:2rem 4rem;
        filter: drop-shadow(8px 8px 10px rgba(0, 0, 0, 0.1));
        min-height: 15rem;
        padding:2.4rem;
        >.cstm-top{
                padding-bottom:2rem;
                display:flex;
                justify-content: space-between;
                align-items:center;
        
                >p{
                    font-size:2rem;
                    font-weight: bold;
                }
             
                >.cstm-edit{
                    font-size:2.4rem;
                    color: gray;
                    cursor:pointer;
                    &:hover{
                        color: #ff6400;
                    }
                }
            }
        .cstm-bio{
            >p{
                font-family: sans-serif;
                padding-bottom:1.4rem;
                font-weight: bold;
                font-size:1.4rem;
                color: #292929;
                
            }
        }

        >.cstm-details{
            display:flex;
            flex-wrap: wrap;
            justify-content: space-between;
            
            >div{
                flex-basis: 40%;
                margin-bottom:1rem;
                >p{
                    font-size:1.4rem;
                    color: #ff6400;
                    font-weight: bold;
                    margin-bottom:0.4rem;
                }
                >span{
                    font-size:1.6rem;
                }
            }
        }
    }
    .cstm-popup{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.2);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index:10;
            backdrop-filter: blur(2px); 
            >.cstm-popup-edit{
                background-color: #fff;
                padding: 1rem 3rem;
                z-index: 2000;
                border-radius:1rem;
                >div>.cstm-close{
                    color:red;
                    font-size:3.3rem;
                    cursor: pointer;
                    margin:1rem 0rem;
                    &:hover{
                        color: #2a1203;
                    }
                }
                .cstm-form-content{
                    input{
                        height:3.9rem;
                        width:26rem;
                    }
                    span{
                        color:red;
                        font-size:1.1rem;
                        font-family: 'roboto';
                        
                    }
                   
                }
                textarea{
                    width:45rem;
                    resize:none;
                }
                >div>span{
                    color:red;
                    font-size:1.1rem;
                    font-family: 'roboto';
                }
            }
        }


`