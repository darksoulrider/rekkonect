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

`