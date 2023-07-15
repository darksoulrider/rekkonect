import React, { useState } from 'react'
import styled from "styled-components"
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify"
import { object } from 'yup';
import { useUploadFileMutation } from '../../../redux/apicall/employer/userProfile';

const ProfessionalInfo = ({ userdata }) => {

    const { register: registerFile, handleSubmit: handleSubmitFile, formState: { errors: errorsFile } } = useForm();

    const [upload, { isError, isSuccess, isLoading }] = useUploadFileMutation();
    const uploadFile = async (data) => {

        if (data.files.length === 0) {
            console.log("No files selected");
            return toast.error("No files selected", {
                autoClose: 1000,
            });
        }

        const myForm = new FormData();
        myForm.append('files', data.files[0])
        console.log(myForm)
        // const dat = Object.values(data);
        // dat.map((file) => myForm.append(`files`, file));
        const send = await upload(myForm);
        if (isError) {
            toast.error(isError.message);
        }
        if (isLoading) {
            toast.warn(isLoading.message)
        }
        if (isSuccess) {
            toast.success("successfully uploaded")
        }
    }
    return (
        <Container className="" >
            <h1>Additional Information</h1>
            <div className='cstm-why-cp'>
                <p className="">Why {userdata.user.companyName} ? </p>

                <div className='cstm-textarea'>
                    <textarea rows="4" cols="100" className='cstm-text-area p-3 text-2xl w-[80%] border bg-slate-50 text-gray-600'>

                    </textarea>
                    <button className='cstm-btn bg-orange-300 text-black-700 w-32 h-10 rounded-md'>Submit</button>
                </div>
            </div>
            <div className='cstm-addinfo-layer'>
                <div className='cstm-all cstm-headQurter'>
                    <p>{userdata.user.companyName} Head Quarter</p>
                    <div className='cstm-input-btn'>
                        <input type="text" />
                        <button className='btn'>Submit</button>
                    </div>
                </div>
                <div className='cstm-all cstm-website'>
                    <p>Website</p>
                    <div className='cstm-input-btn'>
                        <input type="text" />
                        <button className='btn'>Submit</button>
                    </div>
                </div>
                <div className='cstm-all cstm-fileupload'>
                    <p>File Uploads</p>
                    <form onSubmit={handleSubmitFile(uploadFile)} className='cstm-input-btn'>
                        <input {...registerFile('files')} type="file" multiple={true} />
                        <button type='submit' className='btn'>upload</button>
                    </form>
                    <div className="files">
                        {/* defualt button style comming from globle */}
                        <div className='file-delete '>
                            <p className="file">file.png</p>
                            <button type="button">delete</button>
                        </div>
                        <div className='file-delete '>
                            <p className="file">file.png</p>
                            <button type="button">delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='ml-20'>
                <p className="text-2xl tracking-wider ">Recommend Mentor</p>
                <div className="flex items-center">
                    <input className="text-gray-700" />
                    <button className='bg-orange-300 w-48 ml-10 h-14 cursor-pointer hover:bg-[#157499] hover:text-white rounded-md'>Recommend</button>
                </div>
                <li>mack@gmail.com  | <button>delete</button></li>
                <li>dark@gmail.com  | <button>delete</button></li>
            </div>
        </Container >
    )
}

export default ProfessionalInfo


const Container = styled.div`
    
    @media (min-width: ${props => props.theme.isTab}) and (max-width: ${props => props.theme.isLargeTab}) {
        h1{
            font-size:1.9rem;
            font-weight:800;
            margin: 1.4rem 3rem;
            letter-spacing: 0.1rem;
            color: #272626;
            font-family: "roboto";
        }
        font-family: "roboto";
        input{
            border: 0.1px solid rgba(54, 54, 54, 0.2);
            background-color: #f4f0f0;
            &:focus{
                outline:none;
            }
        }
        .cstm-text-area{
            resize: none;
            border: 1px solid lightblue;
            overflow-y: auto;
            &:focus{
                background:rgba(194, 194, 183, 0.3);
                outline:none;
            }
        }
       
    }
    @media (min-width: ${props => props.theme.isLargeTab}) and (max-width: ${props => props.theme.isDesktop}) {
        font-family: "roboto";
        h1{
            font-size:1.9rem;
            font-weight:800;
            margin: 1.4rem 3rem;
            letter-spacing: 0.1rem;
            color: #272626;
            font-family: "roboto";
        }
        input{
            border: 0.1px solid rgba(54, 54, 54, 0.2);
            background-color: #f4f0f0;
            width:36rem;
            color: #1a1717;
            &:focus{
                outline:none;
            }
        }
        .cstm-why-cp{
            margin-left: 5rem;
            >p{
                font-size:1.6rem;
                font-weight:bold;
                margin-bottom: 1rem;
                letter-spacing:0.04rem;
            }
            >.cstm-textarea{
                display: flex;
                flex-direction: column;
                >textarea{
                    resize: none;
                    border: 1px solid lightblue;
                    overflow-y: auto;
                    &:focus{
                        background:rgba(194, 194, 183, 0.3);
                        outline:none;
                    }
                }
                >.cstm-btn{
                    background-color: #f2c571;
                    height: 3.5rem;
                    width: 11rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    font-weight: 700;
                    font-size: 1.3rem;
                    &:hover{
                        background-color: #157499;
                        color: white;
                    }
                }
            }    
        }
        .cstm-addinfo-layer{
            margin-left:5rem;
            >.cstm-all{
                display:flex;
                flex-direction: column;
                align-items: flex-start;

                >p{
                    font-size:1.6rem;
                    font-weight:bold;
                    letter-spacing:0.04rem;
                    
                }
              
                >.cstm-input-btn{
                    display: flex;
                    align-items: center;
                    gap:2.9rem;
                    >.btn{
                        background-color: #f2c571;
                        height: 3.5rem;
                        width: 11rem;
                        border-radius: 0.5rem;
                        cursor: pointer;
                        font-weight: 700;
                        font-size: 1.3rem;
                        &:hover{
                            background-color: #157499;
                            color: white;
                        }
                    }
                }
                >.files{
                    width: 35rem;
                    margin-top: 1rem;
                    margin-bottom: 2rem;
                    >.file-delete{
                        display:flex;
                        align-items: center;
                        gap:10rem;
                        /* border:1px solid black; */
                        width: 100%;
                        margin-bottom: 1rem;
                        margin-left: 2rem;
                        
                        >button{
                            background-color: #157499;
                            height: 3rem;
                            width: 7rem;
                            margin:0rem;
                            color:white;
                            border-radius: 0.5rem;
                            cursor: pointer;
                            font-weight: 700;
                            font-size: 1.3rem;
                            &:hover{
                                background-color: #031319;
                                color: white;
                            }
                            
                        }
                        >p{
                            font-size:1.6rem;
                            font-weight:bold;
                            letter-spacing:0.04rem;
                        }
                    }
                }
            } 
        }
    }

`