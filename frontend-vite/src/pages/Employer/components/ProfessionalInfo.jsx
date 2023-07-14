import React, { useState } from 'react'
import styled from "styled-components"
const ProfessionalInfo = ({ userdata }) => {
    const [about, Setabout] = useState("");
    const [recommend, Setrecommend] = useState("");

    return (
        <Container className="shadow-md">
            <h1>Additional Information</h1>
            <div className='ml-20'>
                <p className="font-bold text-2xl mb-4 tracking-wider">Why {userdata.user.companyName} ? </p>

                <div className='flex flex-col '>
                    <textarea rows="4" cols="100" className='cstm-text-area p-3 text-2xl w-[80%] border bg-slate-50 text-gray-600'>

                    </textarea>
                    <button className='bg-orange-300 text-black-700 w-32 h-10 rounded-md'>Submit</button>
                </div>
            </div>
            <div>
                <p>{userdata.user.companyName} Head Quarters - Location</p>
                <p>File Uploads</p>
            </div>
            <div className='ml-20'>
                <p className="text-2xl tracking-wider ">Recommend Mentor</p>
                <div className="flex items-center">
                    <input className="text-gray-700" />
                    <button className='bg-orange-300 w-48 ml-10 h-14 cursor-pointer hover:bg-[#157499] hover:text-white rounded-md'>Recommend</button>
                </div>
            </div>
        </Container>
    )
}

export default ProfessionalInfo


const Container = styled.div`
    
    @media (min-width: ${props => props.theme.isTab}) and (max-width: ${props => props.theme.isDesktop}) {
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
        h1{
            font-size:1.9rem;
            font-weight:800;
            margin: 1.4rem 3rem;
            letter-spacing: 0.1rem;
            color: #272626;
            font-family: "roboto";
        }
    }

`