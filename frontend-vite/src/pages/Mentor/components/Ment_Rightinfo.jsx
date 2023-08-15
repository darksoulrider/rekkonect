import React from 'react'
import { Link } from "react-router-dom";
import { styled } from 'styled-components'
import { Progress } from 'flowbite-react';
import { FaRegHandshake } from "react-icons/fa"
import { RiFileSearchLine } from "react-icons/ri"
import { BiSolidEdit } from "react-icons/bi"
import Ment_Calender from "./cardType/Ment_Calnder"
import { GraphDate } from '../../../utils/helper/helper';
import { DateTime } from "luxon";

import DotIcon from '/assets/images/dot-icon.png';


import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,


}
    from "recharts"

const Ment_Rightinfo = () => {

    const mydata = GraphDate();


    const progressProfile = 90;
    return (
        <Container >
            <div className="cstm-layer-top">
                <div className="cstm-progress ">
                    <div>
                        <p className=''>Your profile is {progressProfile}% complete</p>
                    </div>
                    <div className='cstm-progress-layer'>
                        <div className=''>
                            <Progress color='blue' size="lg" progress={progressProfile} />
                        </div>
                    </div>
                </div>

                <div className='cstm-mentors-jobs'>
                    <div className='cstm-mlink'>
                        <div className='cstm-meetlink'>
                            <p>Meet Link</p>
                            <BiSolidEdit className='cstm-editlink' />
                        </div>
                        <div className='cstm-li'>
                            <p>{`https://meet.google.com/ihy-uxea-hxj`}</p>
                        </div>
                    </div>
                    <div className='cstm-meet-mn-jb'>
                        <Link className='cstm-link' to="/mentor/mentorlist">Meet Other Mentors</Link>
                        <FaRegHandshake className='cstm-icon' />
                    </div>
                    <div className='cstm-meet-mn-jb'>
                        <Link className='cstm-link' to="/mentor/joblist">Discover Jobs</Link>
                        <RiFileSearchLine
                            className='cstm-icon'
                        />
                    </div>
                </div>
                <div>
                    <Ment_Calender />
                </div>
                <div className='cstm-graph'>
                    <div className='text-3xl font-bold text-gray-700 pb-5'>
                        <h1 className='font-sans'>Total Bookings: {`40`}</h1>
                    </div>
                    <div >
                        <ResponsiveContainer className="bg-slate-100" width="100%" height={300}>
                            <AreaChart data={mydata}>

                                <XAxis dataKey="date" interval={Math.ceil(mydata.length / 7)} dx={10}
                                    tickFormatter={(str) => {

                                        str = DateTime.fromFormat(str, 'M/d/yyyy').toFormat("d LLLL");
                                        return str;
                                    }}
                                />
                                <YAxis dataKey='booking' axisLine={false} tickCount={7} />
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <Tooltip labelStyle={{ color: '#333', fontWeight: "bold" }} itemStyle={{ color: '#333', fontWeight: "bold" }}
                                />


                                <Area type="monotone" stroke="#3c78ad86" dataKey="booking" />
                            </AreaChart>

                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="cstm-graph">
                    <div className="flex justify-between items-center">
                        <h1 className='text-2xl font-bold' >Availablity</h1>
                        <span className='text-2xl font-bold text-[#056689] cursor-pointer hover:text-slate-600' >Edit</span>
                    </div>
                    <div>
                        <div>

                        </div>
                        <div>

                        </div>
                    </div>
                    <div className="text-center pt-20">
                        <p className='text-2xl font-extrabold text-[#056689] cursor-pointer ' >View all</p>
                    </div>
                </div>

                <div className="cstm-graph">
                    <div className="flex justify-between items-center">
                        <img src={DotIcon} className='w-12 h-12' />
                        <span className='text-2xl font-bold text-[#056689] cursor-pointer hover:text-slate-600' >Edit</span>

                    </div>
                    <div className='pt-5' >
                        <h1 className='text-2xl font-extrabold pb-5 '>Session Charge: ₹{`12`}</h1>
                        <span className="text-2xl text-gray-800">
                            The platform charges ₹199 for a 45 minutes session.
                            You can do a session pro-bono or set your own fees.
                        </span>

                    </div>
                </div>
                <div className="cstm-graph">
                    <div className="flex  items-center justify-between">
                        <div className="flex gap-5 items-center">
                            <img src={DotIcon} className='w-12 h-12' />
                            <span className='text-2xl font-extrabold cursor-pointer hover:text-slate-600 text-green-500 '> Your 11 </span>

                        </div>
                        <span className='text-2xl font-bold text-[#056689] cursor-pointer hover:text-slate-600' >Edit</span>
                    </div>
                    <div className='pt-5' >

                        <span className="text-2xl text-gray-800">
                            Please let us know about few people who you would highly recommend.
                        </span>
                    </div>
                </div>
            </div>
        </Container >
    )
}

export default Ment_Rightinfo


const Container = styled.div``