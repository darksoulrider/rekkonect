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

// data
const Container = styled.div`

`