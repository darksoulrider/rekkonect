import React from 'react'
import Mentor_Prof from './cardType/Mentor_Prof'
import Mentor_Edu from './cardType/Mentor_Edu'
import Mentor_Experties from './cardType/Mentro_experties'
import Mentor_Skills from './cardType/Mentor_Skills'

import { styled } from "styled-components"

const Ment_Leftinfo = () => {
    return (
        <Container >
            <div className='cstm-left'>
                <div className=''>
                    <Mentor_Prof />
                </div>
                <div className=''>
                    <Mentor_Edu />
                </div>
                <div className=''>
                    <Mentor_Experties />
                </div>
                <div className=''>
                    <Mentor_Skills />
                </div>
            </div>
        </Container>
    )
}

export default Ment_Leftinfo

const Container = styled.div`
    .cstm-left{
        padding:1rem 3rem;
        display:flex;
        flex-direction:column;
    }
`