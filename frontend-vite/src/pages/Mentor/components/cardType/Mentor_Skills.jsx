import React from 'react'
import { styled } from 'styled-components'
import { AiOutlinePlusCircle, AiFillDelete } from "react-icons/ai"
import { BiSolidEdit } from "react-icons/bi"
const Mentor_Skills = () => {
    return (
        <Container>
            <div className='cstm-layer'>
                <div className='cstm-top'>
                    <p>Skills</p>
                    <BiSolidEdit className='cstm-edit ' />
                </div>
                <div className='cstm-skill gap-4 '>
                    <div>
                        <p>Html</p>
                    </div>
                    <div>
                        <p>Java</p>
                    </div>
                    <div>
                        <p>Mern Technology</p>
                    </div>

                </div>
                <div className='cstm-language  mb-10 '>
                    <div className='cstm-title'>
                        <p>Languages</p>
                    </div>
                    <div className="cstm-data">
                        <div>
                            <span>English</span>
                        </div>
                        <div>
                            <span>Marathi</span>
                        </div>
                    </div>
                </div>

            </div>
        </Container >
    )
};

export default Mentor_Skills;

// for if needed individula delete optionn
{/* <div className='cstm-del-info flex text-4xl gap-4'>
                            <BiSolidEdit className='hover:text-cstmB cursor-pointer' />
                            <AiFillDelete className='hover:text-red-500 cursor-pointer' />
                        </div> */}
const Container = styled.div`

    @media (min-width: ${props => props.theme.isLargeTab} ) and (max-width: ${props => props.theme.isDesktop}){
        .cstm-layer{
            margin-left:6rem;
            background-color:white;
            border-radius: 1.5rem;
            margin-right:3.1rem;
            filter: drop-shadow(0 8px 10px rgba(0, 0, 0, 0.1));
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


            >.cstm-skill {
                display:flex;
                margin-bottom: 2rem;
                >div{
                    /* flex-basis: 100%; */
                    /* background-color: rgb(251, 241, 199); */
                    background-color: #f9f4ec;
                    border-radius : 0.4rem;
                    padding: 0.6rem 2.2rem;
                    >p{
                        font-size:1.4rem;
                        font-weight:bold;
                        font-family: roboto;
                    }
                }
                
            }
            >.cstm-language{
                >.cstm-title>p{
                    font-size:2rem;
                    font-weight: bold;
                    margin-bottom:2rem;
                }

                >.cstm-data{
                    display:flex;
                    gap:2rem;

                    >div{
                        background-color: #f9f4ec;
                        padding: 0.6rem 2rem;
                        >span{
                            font-size:1.4rem;
                            font-weight:bold;
                            font-family: roboto;
                        }
                    }
                }
           
            }
        }
    }
`