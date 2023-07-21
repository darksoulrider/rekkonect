import React from 'react'
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
const JobListTable = ({ data, columns }) => {
    const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel })
    return (
        <div>
            <table>
                {
                    table?.getHeaderGroups()?.map(headerGroup => (
                        <tr key={headerGroup?.title}>
                            {headerGroup?.headers.map(header => (
                                <th key={header.title}>
                                    {flexRender(
                                        header?.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))
                }

                <tbody>
                    {
                        table?.getRowModel().rows?.map(row => (
                            <tr key={row.title}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.title}>
                                        {
                                            flexRender(cell.column.columnDef.cell, cell.getContext())
                                        }
                                    </td>
                                ))}
                            </tr>
                        ))
                    }
                    <tr>
                        <td>
                            "data"
                        </td>
                    </tr>
                </tbody>
            </table>
        </div >

    )
}

export default JobListTable