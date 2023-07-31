import React from 'react'
import Mentor_Prof from './cardType/Mentor_Prof'
import Mentor_Edu from './cardType/Mentor_Edu'
import Mentor_Experties from './cardType/Mentro_experties'
import Mentor_Skills from './cardType/Mentor_Skills'
const Ment_Leftinfo = () => {
    return (
        <div className='w-[90rem] flex flex-col gap-10'>
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
    )
}

export default Ment_Leftinfo