import React from 'react'
import { styled } from 'styled-components'

import { BiSolidEdit } from "react-icons/bi"
const Mentor_Prof = () => {
    return (
        <Container>
            <div className='cstm-layer  '>
                <div className='cstm-top '>
                    <p>Firstname Lastname</p>
                    <BiSolidEdit className='cstm-edit' />
                </div>
                <div className='cstm-details flex-wrap '>
                    <div>
                        <p>Email Address:</p>
                        <span>mack@gmail.com</span>
                    </div>
                    <div>
                        <p>Contact:</p>
                        <span>8778865634</span>
                    </div>
                    <div>
                        <p>Pin:</p>
                        <span>422022</span>
                    </div>
                    <div>
                        <p>State:</p>
                        <span>Maharastra</span>
                    </div>

                </div>
            </div>
        </Container>
    )
}

export default Mentor_Prof;


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
                    font-size:2.4rem;
                    color:gray;
                    cursor:pointer;
                    &:hover{
                        color: #ff6400;
                    }
                }
            }


            >.cstm-details {
                display:flex;
                justify-content: space-between;
                >div{
                    flex-basis: 40%;
                    margin-bottom:1rem;
                    /* border: 1px solid blue; */
                }
                >div>p{
                    font-size:1.6rem;
                    color: #ff6400;
                    font-weight: bold;
                    margin-bottom:0.4rem;
                }
                >div>span{
                    font-size:1.6rem;
                }
            }
        }
    }


`