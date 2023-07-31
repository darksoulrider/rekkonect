import React from 'react'
import { styled } from 'styled-components'
import { AiOutlinePlusCircle, AiFillDelete } from "react-icons/ai"
import { BiSolidEdit } from "react-icons/bi"
const Mentor_Experties = () => {
    return (
        <Container>
            <div className='cstm-layer'>
                <div className='cstm-top'>
                    <p>Experience</p>
                    <BiSolidEdit className='cstm-edit ' />
                </div>
                <div className='cstm-details '>
                    {/* use map method */}
                    <div className='cstm-exp'>
                        <h2 className='cstm-comp'>Facebook India.</h2>
                        <p className='cstm-role'>
                            Role:
                            <span>Software Developer</span>
                        </p>
                        <span className='cstm-duration'>
                            <p className="">From:
                                <span className="ml-[1rem] tracking-wider">{`05/08/2018`}
                                </span>
                            </p>
                            <p>To:
                                <span className="ml-[2.5rem] tracking-wider">{`05/08/22`}
                                </span>
                            </p>
                        </span>
                        <p className='cstm-status' >Status:
                            <span>
                                {`present`}
                            </span>
                        </p>
                    </div>
                    <div>

                    </div>
                </div>

            </div>
        </Container >
    )
};

export default Mentor_Experties;

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


            >.cstm-details {
                display:flex;

                .cstm-exp{
                    width:30rem;
                    /* background-color: #ffeae8; */
                    /* background-color: #f9f4ec; */
                    background-color: #f3f8fc;
                    padding:1rem 3rem;
                    border-radius:1rem;
                    
                    filter: drop-shadow(0px 8px 10px rgba(0, 0, 0, 0.1));
                    
                    >.cstm-comp{
                        font-size:1.8rem;
                        font-weight:bold;
                        color:#111111;
                        font-family:'roboto';
                        margin-bottom:0.5rem;
                    }
                    >.cstm-role{
                        font-size: 1.4rem;
                        font-weight:bold;
                        font-family:'roboto';
                        color: #3d3c3c;
                        >span{
                            margin-left:1rem;

                        }
                    }
                    >.cstm-duration{
                        font-size: 1.4rem;
                        font-weight:bold;
                        font-family:'roboto';
                        color: #3d3c3c;
                        >p>span{
                            font-size:1.2rem;
                        }
                        
                        
                    }
                    >.cstm-status{
                        font-size: 1.4rem;
                        font-weight:bold;
                        font-family:'roboto';
                        color: #3d3c3c;
                        >span{
                            margin-left:1rem;
                            font-size:1.3rem;
                            
                        }
                    }
                }

                >div{
                    /* flex-basis: 100%; */
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