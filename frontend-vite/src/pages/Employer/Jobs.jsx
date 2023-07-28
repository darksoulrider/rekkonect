import React, { useEffect, useMemo, useState } from 'react'
import dummyData from './dummyData'
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import { DateTime } from "luxon"
import { useNavigate } from 'react-router-dom'
import { styled } from "styled-components"
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
  });


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
        return DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED)
      }
    }
  ]

  if (isLoading && !data) {
    return <h1>Loading</h1>
  }



  return (
    <Container className="">
      <div className='cstm-head-layer'>
        {/* <div>back button </div> */}
        < h3 className="" > All Jobs</ h3>
        <button className="bg-cstmO hover:bg-cstmB text-white p-3 py-4 rounded-xl font-extrabold " onClick={() => navigate("/employer/jobs/create")}>Create Job</button>

      </div >
      <div className='mx-2'>
        <JobListTable data={Rdata} columns={columns} />
      </div>

    </Container >
  )
}

export default Jobs;

const Container = styled.div`

  @media (max-width: ${props => props.theme.isMobile}){
    .cstm-head-layer{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 3rem;
      
      >h3{
        font-weight: 900;
        font-size:2rem;
        color: #2b2929;
      }

    }
  }
  @media (min-width: ${props => props.theme.isMobile}) and (max-width: ${props => props.theme.isTab}){
    .cstm-head-layer{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 3rem;
      >h3{
        font-weight: 900;
        font-size:2rem;
        color: #2b2929;
      }

    }
  }
  @media (min-width: ${props => props.theme.isTab}) and (max-width: ${props => props.theme.isLargeTab}){
    .cstm-head-layer{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 3rem;
      >h3{
        font-weight: 900;
        font-size:2rem;
        color: #2b2929;
      }

    }
  }
  @media (min-width: ${props => props.theme.isLargeTab}) and (max-width: ${props => props.theme.isDesktop}){
    .cstm-head-layer{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 3rem;
      >h3{
        font-weight: 900;
        font-size:2rem;
        color: #2b2929;
      }

    }
  }
`