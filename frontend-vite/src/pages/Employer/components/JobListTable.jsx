import React, { useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from "@tanstack/react-table"
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import ShowCandidate from './ShowCandidate'

// ! dummy array below
import { candidate } from '../../../utils/showCandidate'


const JobListTable = ({ data, columns }) => {
    const navigate = useNavigate();
    const [isShow, SetisShow] = useState(false);
    // cell clicking handling
    const handleClick = (data, cell) => {
        const isTitle = cell.column.columnDef.header === "Title";
        const isApplicants = cell.column.columnDef.header === "Applicants";


        if (isTitle) {
            navigate(`/employer/jobs/edit/${data._id}`, { state: { _id: data._id } })

        }

        if (isApplicants) {
            if (data.applicants.length === 0) {
                alert("No applications")
            } else {
                alert(data.applicants[0]);
            }
        }
    }

    let table = useReactTable({
        data: data, columns: columns, getCoreRowModel: getCoreRowModel(),
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 10,
            }
        },
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <Container className="">
            <table>
                <thead>
                    {table.getHeaderGroups().map((headele) => {
                        return <tr key={headele.id} >
                            {headele.headers.map(clm => {
                                return <th className=" " key={clm.id} colSpan={clm.colSpan}>
                                    {flexRender(
                                        clm.column.columnDef.header,
                                        clm.getContext()
                                    )}
                                </th>
                            })}
                        </tr>
                    })}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((ele) => {
                        return <tr key={ele.id}>
                            {ele.getVisibleCells().map((cell) => {
                                const data = ele.original;
                                const isTitleCell = cell.column.columnDef.header === "Title";
                                return (
                                    <td className="cursor-pointer"
                                        onClick={() => handleClick(data, cell)} key={cell.id}>
                                        {
                                            flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )
                                        }
                                    </td>
                                )
                            })}
                        </tr>
                    })}
                </tbody>
            </table>
            <div className='cstm-btn' >
                <button >first</button>
                <button >prev</button>
                <button >next</button>
                <button >last</button>
            </div>
            <div>
                {
                    isShow ?
                        <ShowCandidate candidate={candidate} /> : ""
                }
                {/* Show pop up of the applicants */}
            </div>



        </Container >

    )
}

export default JobListTable


const Container = styled.div`

    @media (max-width: ${props => props.theme.isMobile}){
        width:100%;
        overflow-x: auto;
        margin-right:1rem;
        table{
            font-family: 'Trebuchet MS', Arial, Helvetica, sans-serif;
            width: 100%;
            border-collapse: collapse;
            overflow-x: auto;
            th{
                background-color: #063945;
                color: white;
                font-size:1.3rem;
                text-align: start;
                border: 1px solid #ddd;
                padding: 1rem;
            }
            td{
                border: 1px solid #ddd;
                padding: 1rem;
                font-size: 1.2rem;
                font-weight:bold;
            }
            tr{
                &:nth-child(even){
                    background-color: #f2f2f2;
                }
                &:hover{
                    background-color: #f6ecec;
                    
                }
                
            }

        }
        .cstm-btn{
            display:flex;
            justify-content: center;
            gap:1rem;
            /* text-white rounded-lg shadow-md hover:bg-slate-800 font-bold text-xl */
            >button{
                padding: 0.7rem 1.3rem;
                color:white;
                font-weight:bold;
                font-size:1.2rem;
                background-color: #656565;
                border-radius: 0.5rem;
                
                &:hover{
                    color:white;
                    background-color: #157499;
                }
            }
        }
    }


    @media (min-width: ${props => props.theme.isMobile} ) and (max-width: ${props => props.theme.isTab}){
        width:100%;
        overflow-x: auto;
        margin-right:1rem;
        table{
            font-family: 'Trebuchet MS', Arial, Helvetica, sans-serif;
            width: 100%;
            border-collapse: collapse;
            overflow-x: auto;
            th{
                background-color: #063945;
                color: white;
                font-size:1.3rem;
                text-align: start;
                border: 1px solid #ddd;
                padding: 1rem;
            }
            td{
                border: 1px solid #ddd;
                padding: 1rem;
                font-size: 1.2rem;
                font-weight:bold;
            }
            tr{
                &:nth-child(even){
                    background-color: #f2f2f2;
                }
                &:hover{
                    background-color: #f6ecec;
                    
                }
                
            }

        }
        .cstm-btn{
            display:flex;
            justify-content: center;
            gap:1rem;
            /* text-white rounded-lg shadow-md hover:bg-slate-800 font-bold text-xl */
            >button{
                padding: 0.7rem 1.3rem;
                color:white;
                font-weight:bold;
                font-size:1.2rem;
                background-color: #656565;
                border-radius: 0.5rem;
                
                &:hover{
                    color:white;
                    background-color: #157499;

                }
            }
        }
    }

    @media (min-width: ${props => props.theme.isTab} ) and (max-width: ${props => props.theme.isLargeTab}){
        width:100%;
        overflow-x: auto;
        margin-right:1rem;
        table{
            font-family: 'Trebuchet MS', Arial, Helvetica, sans-serif;
            width: 100%;
            border-collapse: collapse;
            overflow-x: auto;
            th{
                background-color: #063945;
                color: white;
                font-size:1.6rem;
                text-align: start;
                border: 1px solid #ddd;
                padding: 1rem;
            }
            td{
                border: 1px solid #ddd;
                padding: 1rem;
                font-size: 1.5rem;
                font-weight:bold;
            }
            tr{
                &:nth-child(even){
                    background-color: #f2f2f2;
                }
                &:hover{
                    background-color: #f6ecec;
                    
                }
                
            }

        }
        .cstm-btn{
            display:flex;
            justify-content: center;
            gap:1rem;
            /* text-white rounded-lg shadow-md hover:bg-slate-800 font-bold text-xl */
            >button{
                padding: 0.7rem 1.3rem;
                color:white;
                font-weight:bold;
                font-size:1.2rem;
                background-color: #656565;
                border-radius: 0.5rem;
                
                &:hover{
                    color:white;
                    background-color: #157499;

                }
            }
        }


        
    }
    @media (min-width: ${props => props.theme.isLargeTab} ) and (max-width: ${props => props.theme.isDesktop}){
        width:100%;
        overflow-x: auto;
        margin-right:1rem;
        table{
            font-family: 'Trebuchet MS', Arial, Helvetica, sans-serif;
            width: 100%;
            border-collapse: collapse;
            overflow-x: auto;
            th{
                background-color: #063945;
                color: white;
                font-size:1.6rem;
                text-align: start;
                border: 1px solid #ddd;
                padding: 1rem;
            }
            td{
                border: 1px solid #ddd;
                padding: 1rem;
                font-size: 1.5rem;
                font-weight:bold;
            }
            tr{
                &:nth-child(even){
                    background-color: #f2f2f2;
                }
                &:hover{
                    background-color: #f6ecec;
                    
                }
                
            }

        }
        .cstm-btn{
            display:flex;
            justify-content: center;
            gap:1rem;
            /* text-white rounded-lg shadow-md hover:bg-slate-800 font-bold text-xl */
            >button{
                padding: 0.7rem 1.3rem;
                color:white;
                font-weight:bold;
                font-size:1.2rem;
                background-color: #656565;
                border-radius: 0.5rem;
                
                &:hover{
                    color:white;
                    background-color: #157499;

                }
            }
        }
    }
    
`