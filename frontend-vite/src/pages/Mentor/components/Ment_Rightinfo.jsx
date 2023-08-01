import React from 'react'
import { Link } from "react-router-dom";
import { styled } from 'styled-components'
import { Progress } from 'flowbite-react';
import { FaRegHandshake } from "react-icons/fa"
import { RiFileSearchLine } from "react-icons/ri"
import { BiSolidEdit } from "react-icons/bi"
import Ment_Calender from "./cardType/Ment_Calnder"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';




const Ment_Rightinfo = () => {


    // let dataG = [];
    // let num;
    // for (num = 30, num >= 0; num--) {
    //     dataG.push({
    //         date: 
    //     })
    // }
    const progressProfile = 90;
    return (
        <Container className="cstm-layer">
            <div className="cstm-progress ">
                <div>
                    <p className=''>Your profile is {progressProfile}% complete</p>
                </div>
                <div>
                    <div className='w-[42rem]'>
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
                <div>
                    <h1>Total Bookings: {`40`}</h1>
                </div>
                <div>
                    {/* <ResponsiveContainer width="100%" height={300}>
                        <AreaChart
                            data={data}
                            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />

                        </AreaChart>
                    </ResponsiveContainer> */}
                </div>
            </div>

        </Container>
    )
}

export default Ment_Rightinfo


const Container = styled.div`
        @media (min-width: ${props => props.theme.isLargeTab} ) and (max-width: ${props => props.theme.isDesktop}){
            .cstm-graph{
                
                margin-right:6rem;
                margin-bottom: 2rem;
                background-color:white;
                border-radius: 1.5rem;
                width:45rem;
                filter: drop-shadow(8px 8px 10px rgba(0, 0, 0, 0.1));
                min-height: 15rem;
                padding:2.4rem;
            }
            .cstm-progress{
                display: flex;
                flex-direction: column;
                justify-content:center;
                gap:1rem;
                margin-right:6rem;
                margin-bottom: 2rem;
                background-color:white;
                border-radius: 1.5rem;
                width:45rem;
                filter: drop-shadow(8px 8px 10px rgba(0, 0, 0, 0.1));
                min-height: 15rem;
                padding:2.4rem;
                >div>p{
                    font-size:1.9rem;
                }
            }   
            .cstm-mentors-jobs{
                display: flex;
                flex-direction: column;
                justify-content:center;
                gap:1rem;
                width:45rem;
                background-color:white;
                border-radius: 1.5rem;
                filter: drop-shadow(8px 8px 10px rgba(0, 0, 0, 0.1));
                min-height: 15rem;
                padding:2.4rem;
                margin-bottom:2rem;
                
                >.cstm-mlink{

                    margin: 0 3rem;
                    margin-bottom:1.3rem;

                    >.cstm-li{
                        font-size:1.6rem;
                        color: #4c4b4b;
                    }

                    >.cstm-meetlink{
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        width: 100%;
                        
                        >p{
                            font-size:1.6rem;
                            font-weight:bold;
                            font-family:roboto;
                            color: #056689;
                        }
                        >.cstm-editlink{
                            font-size:2.8rem;
                            color: #a97103;
                            cursor: pointer;
                        }

                    }
                }


                >.cstm-meet-mn-jb{
                    display: flex;
                    justify-content: space-between;
                    margin: 0 3rem;
                    align-items: center;
                    >.cstm-link{
                        font-size:1.6rem;
                        font-weight: bold;
                        font-family: roboto;
                        letter-spacing:0.5px;
                        color: #056689;
                        &:hover{
                            color: #261303;
                        }
                    }
                    >.cstm-icon{
                        font-size:2.5rem;
                        color: #a97103;
        
                    }
                }
            }
        }
    
`