
import React from 'react'
import { styled } from "styled-components"
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from "@tanstack/react-table"


const ShowCandidate = ({ candidate }) => {


    let Rcandidate = useMemo(() => candidate, [candidate]);


    /** @type import('@tanstack/react-table').columnDef<any>*/
    const columns = [

        {
            header: 'Name',
            accessorKey: 'name',
            cell: (info) => {

                const value = info.getValue();
                return (`${value.substring(0, 21)}...`)
            }
        },
        {
            header: 'Background Check',
            accessorKey: 'isbackgroundcheck',

        },
        {
            header: 'Experience',
            accessorKey: 'Experience',
        },
    ]
    let table = useReactTable({
        data: Rcandidate, columns: columns, getCoreRowModel: getCoreRowModel(),
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 10,
            }
        },
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <Container>
            <div>
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
            </div>
        </Container>
    )
}

export default ShowCandidate;

const Container = styled.div`


`