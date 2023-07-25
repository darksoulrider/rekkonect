import React from 'react'
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from "@tanstack/react-table"
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'




const JobListTable = ({ data, columns }) => {
    const navigate = useNavigate();
    // cell clicking handling
    const handleClick = (data, cell) => {
        const isTitle = cell.column.columnDef.header === "Title";
        const isApplicants = cell.column.columnDef.header === "Applicants";


        if (isTitle) {
            navigate(`/employer/jobs/edit/${data._id}`, { state: { _id: data._id } })

        }

        if (isApplicants) {
            if (data.applicants === null) {
                return alert("NULL values");
            }
            alert(data.applicants);
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
        <Container className="mx-20">
            <table>
                <thead>
                    {table.getHeaderGroups().map((headele) => {
                        return <tr key={headele.id} >
                            {headele.headers.map(clm => {
                                return <th className="text-start text-2xl " key={clm.id} colSpan={clm.colSpan}>
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
                                    <td className="cursor-pointer text-2xl"
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
            <div className='flex justify-center ' >
                <button className='mr-10 bg-slate-500 p-3 text-white rounded-lg shadow-md hover:bg-slate-800 font-bold text-xl'>first</button>
                <button className='mr-10 bg-slate-500 p-3 text-white rounded-lg shadow-md hover:bg-slate-800 font-bold text-xl'>prev</button>
                <button className='mr-10 bg-slate-500 p-3 text-white rounded-lg shadow-md hover:bg-slate-800 font-bold text-xl'>next</button>
                <button className='mr-10 bg-slate-500 p-3 text-white rounded-lg shadow-md hover:bg-slate-800 font-bold text-xl'>last</button>
            </div>
        </Container >

    )
}

export default JobListTable


const Container = styled.div`

    table {
        font-family: 'Trebuchet MS', Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
        
    }
    
    table td,
    table th {
    

  border: 1px solid #ddd;
  padding: 8px;
}

table tr:nth-child(even) {
  background-color: #f2f2f2;
}

table tr:hover {
  background-color: #ddd;
}

table th, tfoot td {
  /* padding-top: 12px; */
  /* padding-bottom: 12px; */
  /* background-color: #4caf50; */
  background-color: #063945;
  color: white;
}



`