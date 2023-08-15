import React from 'react'
import { styled } from 'styled-components'
import { AiOutlinePlusCircle, AiFillDelete } from "react-icons/ai"
import { BiSolidEdit } from "react-icons/bi"
const Mentor_Edu = () => {
    return (
        <Container>
            <div className='cstm-layer'>
                <div className='cstm-top'>
                    <p>My Education</p>
                    <AiOutlinePlusCircle className='cstm-edit ' />
                </div>
                <div className='cstm-details'>
                    {/* use map method */}
                    <div className='  items-center'>
                        <div className='cstm-info'>
                            <h3 className=''>Modern  College</h3>
                            <p>B.tech</p>
                            <span>1 jan 2012 to 25 march 2022</span>
                        </div>
                        <div className='cstm-del-info flex text-4xl gap-4'>
                            <BiSolidEdit className='hover:text-cstmB cursor-pointer' />
                            <AiFillDelete className='hover:text-red-700 cursor-pointer' />
                        </div>
                    </div>
                </div>
            </div>
        </Container >
    )
};

export default Mentor_Edu;

// data
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
            flex-direction: column;
            >div{
                display: flex;
                margin-bottom:1rem;
                justify-content: space-between;
                >.cstm-info>h3{
                    font-weight: bold;
                    color: #494949;
                    font-size:1.8rem;
                    letter-spacing:0.02rem;
                    margin-bottom: 0.3rem;
                    font-family: roboto;
                }
                .cstm-info>p{
                    font-size:1.4rem;
                    color: #313131;
                    font-weight: bold;


                    font-family: roboto;
                }
                .cstm-info>span{
                    font-size:1.4rem;
                    color:gray;
                    font-weight: bold;
                }
            }
        
        }

    }     
    
`