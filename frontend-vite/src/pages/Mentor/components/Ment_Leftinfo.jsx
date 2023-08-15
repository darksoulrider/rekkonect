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


@media (max-width: ${props => props.theme.isMobile}){
  .cstm-left{
    display:flex;
    flex-direction:column;
    gap:4rem;
    margin:1.2rem;
    }
}

@media (min-width: ${props => props.theme.isMobile} ) and (max-width: ${props => props.theme.isTab}){
    .cstm-left{
        display:flex;
        flex-direction:column;
        gap:4rem;
        margin:1.2rem;
    }
}



@media (min-width: ${props => props.theme.isTab} ) and (max-width: ${props => props.theme.isLargeTab}){
    .cstm-left{
        display:flex;
        flex-direction:column;
        gap:4rem;
        margin:0rem 2rem;
        width: 40rem;
        
    }
}
@media (min-width: ${props => props.theme.isLargeTab} ) and (max-width: ${props => props.theme.isDesktop}){
    .cstm-left{
        width:90rem;
        border:2px solid red;
        display:flex;
        flex-direction:column;
        gap:2rem;
    }
}



`