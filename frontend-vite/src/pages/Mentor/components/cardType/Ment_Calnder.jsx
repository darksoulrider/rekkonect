import React from 'react'
import { styled } from "styled-components"
import { FaRegCalendar } from 'react-icons/fa'
const Ment_Calnder = () => {
    return (
        <Wrapper>
            <div className='cstm-layer'>
                <div className='cstm-top'>
                    <p className=''>Your calender</p>
                    <FaRegCalendar className='cstm-icon' />
                </div>
                <hr />
            </div>
        </Wrapper>
    )
}

export default Ment_Calnder;

const Wrapper = styled.div`

`