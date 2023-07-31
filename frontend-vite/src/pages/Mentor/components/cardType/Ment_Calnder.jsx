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
     @media (min-width: ${props => props.theme.isLargeTab} ) and (max-width: ${props => props.theme.isDesktop}){
        .cstm-layer{
            margin-right:6rem;
            margin-bottom: 2rem;
            background-color:white;
            border-radius: 1.5rem;
            width:45rem;
            filter: drop-shadow(8px 8px 10px rgba(0, 0, 0, 0.1));
            min-height: 15rem;
            padding:2.4rem;
            >hr{
                /* style={{ borderTop: '1px solid black', margin: '10px 0' }} */
                border-top: 1px solid black;
                margin-top: 1rem;
            }
            .cstm-top{
                display: flex;
                justify-content: space-between;
                height:2rem;
                width: 100%;
                /* border: 1px solid blue; */
                align-items: center;
                >p{
                    font-size:2rem;
                    font-weight:bold;
                    color:green;
                }
                >.cstm-icon{
                    font-size:2.4rem;
                }
                
            }
        }
     }

`