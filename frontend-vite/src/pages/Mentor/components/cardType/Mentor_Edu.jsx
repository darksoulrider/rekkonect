import React from 'react'
import { styled } from 'styled-components'
import { AiOutlinePlusCircle, AiFillDelete } from "react-icons/ai"
import { BiSolidEdit } from "react-icons/bi"
const Mentor_Edu = () => {
    return (
        <Container>
            <div className='cstm-layer  '>
                <div className='cstm-top mb-10 '>
                    <p>My Education</p>
                    <AiOutlinePlusCircle className='cstm-edit ' />
                </div>
                <div className='cstm-details flex-wrap  gap-5 '>
                    {/* use map method */}
                    <div className='flex justify-between items-center'>
                        <div className='cstm-info'>
                            <h3 className='font-bold text-gray-900'>Modern  College</h3>
                            <p>B.tech</p>
                            <span>1 jan 2012 to 25 march 2022</span>
                        </div>
                        <div className='cstm-del-info flex text-4xl gap-4'>
                            <BiSolidEdit className='hover:text-cstmB cursor-pointer' />
                            <AiFillDelete className='hover:text-red-500 cursor-pointer' />
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='cstm-info'>
                            <h3 className='font-bold text-gray-900'>Modern  College</h3>
                            <p>B.tech</p>
                            <span>1 jan 2012 to 25 march 2022</span>
                        </div>
                        <div className='cstm-del-info flex text-4xl gap-4'>
                            <BiSolidEdit className='hover:text-cstmB cursor-pointer' />
                            <AiFillDelete className='hover:text-red-500 cursor-pointer' />
                        </div>
                    </div>
                </div>
            </div>
        </Container >
    )
};

export default Mentor_Edu;


const Container = styled.div`

    @media (min-width: ${props => props.theme.isLargeTab} ) and (max-width: ${props => props.theme.isDesktop}){
        .cstm-layer{
            margin-left:6rem;
            background-color:white;
            border-radius: 1.5rem;
            margin-right:3.1rem;

            filter: drop-shadow(8px 8px 10px rgba(0, 0, 0, 0.1));
            min-height: 15rem;
            padding:2.4rem;
   
            >.cstm-top{
                padding-bottom:2rem;
                display:flex;
                justify-content: space-between;
                align-items:center;
                /* flex justify-between text-2xl font-bold */
                >p{
                    font-size:2rem;
                    font-weight: bold;
                }
             
                >.cstm-edit{
                    font-size:2.8rem;
                    color:gray;
                    cursor: pointer;
                    &:hover{
                        color: #ff6400;
                    }
                }
            }


            >.cstm-details {
                display:flex;
                justify-content: space-between;

                >div{
                    flex-basis: 100%;
                    margin-bottom:1rem;
                    /* border: 1px solid blue; */
                }
           
                .cstm-info{
                    >h3{
                        font-size:1.8rem;
                        /* font-weight: 600; */
                        letter-spacing:0.02rem;
                        margin-bottom: 0.3rem;
                        font-family: roboto;
                    }
                    >p{
                        font-size:1.4rem;
                        color: #313131;
                        font-weight: bold;
                        font-family: roboto;
                    }
                    >span{
                        font-size:1.4rem;
                        color:gray;
                        font-weight: bold;

                    }
                }
            }
        }
    }
`