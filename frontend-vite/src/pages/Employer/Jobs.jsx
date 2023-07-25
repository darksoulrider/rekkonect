import React, { useEffect, useMemo } from 'react'
import dummyData from './dummyData'
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import { DateTime } from "luxon"
import { useNavigate } from 'react-router-dom'

// ********* components imports **************
import JobListTable from './components/JobListTable'
import CreateJob from './components/CreateJob'

//  ******** API calling imports ********
import { useGetAllJobsQuery } from '../../redux/apicall/employer/Emp_JobAPI'

const Jobs = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetAllJobsQuery(
    undefined, {
    refetchOnMountOrArgChange: true,
  }
  );
  //  instead of this, lets try passing data direct object later on [data.jobs]
  let Rdata = useMemo(() => data?.jobs, [data]);


  /** @type import('@tanstack/react-table').columnDef<any>*/
  const columns = [

    {
      header: 'Title',
      accessorKey: 'title',
      cell: (info) => {
        //  solved this problem in the cell itself [ look in component ]
        const value = info.getValue();

        return (`${value.substring(0, 21)}...`)
      }
    },
    {
      header: 'Designation',
      accessorKey: 'designation',
      cell: (info) => {
        const value = info.getValue();
        return (`${value.substring(0, 21)} ...`)

      }
    },
    {
      header: 'Job Type',
      accessorKey: 'jobtype',
    },
    {
      header: 'location',
      accessorKey: 'location',
    },
    {
      header: 'Active',
      accessorKey: 'isStatus'
    },
    {
      header: 'Applicants',
      accessorKey: 'applicants',
      cell: (info) => {
        const data1 = info.getValue();
        if (Array.isArray(data1) && data1.length > 0) {
          return `Show(${data1.length})`;
        } else {
          return "NULL";
        }
      }
    },
    {
      header: 'Date',
      accessorKey: 'createdAt',
      cell: (info) => {
        // const data = 34;
        // return `N/A ${data}`
        return DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED)
      }
    }
  ]

  if (isLoading && !data) {
    return <h1>Loading</h1>
  }



  return (
    <div className="">
      <div className='flex items-center justify-between  mx-20'>
        {/* <div>back button </div> */}
        < h3 className="font-extrabold font-sans text-gray-800 text-3xl tracking-widest " > All Jobs</ h3>
        <button className="bg-cstmO hover:bg-cstmB text-white p-3 py-4 rounded-xl font-extrabold " onClick={() => navigate("/employer/jobs/create")}>Create Job</button>

      </div >
      <div>
        <JobListTable data={Rdata} columns={columns} />
      </div>
      <div className="fixed w-50% h-50% translate-x-10 translate-y-10">
        {/* <CreateJob /> */}
      </div>
    </div >
  )
}

export default Jobs