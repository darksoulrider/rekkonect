import React, { useMemo } from 'react'
import dummyData from './dummyData'
import JobListTable from './components/JobListTable'
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
const Jobs = () => {

  const data = useMemo(() => dummyData, []);

  /** @type import('@tanstack/react-table').columnDef<any>*/
  const columns = [
    {
      header: 'Title',
      accessorKey: 'job_title',
    },
    {
      header: 'Job Role',
      accessorKey: 'contact_email',
    },
    {
      header: 'date',
      accessorKey: 'application_deadline'
    }
  ]





  return (
    <div style={{ zIndex: "1", overflowx: "auto", border: '2px solid red' }} className=''>
      <div>
        {/* <div>back button </div> */}
        <h3>All Jobs</h3>
        <button>Create Job</button>
      </div>
      <div>
        <JobListTable data={data} columns={columns} />
      </div>
    </div>
  )
}

export default Jobs