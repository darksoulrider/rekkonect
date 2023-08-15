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

const Container = styled.div`
`