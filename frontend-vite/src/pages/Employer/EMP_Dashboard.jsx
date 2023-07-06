import React from 'react'
import Sidebar from './components/Sidebar'

import { Outlet } from 'react-router-dom'
import { styled } from 'styled-components'
import EMP_Navbar from './components/EMP_Navbar'
// this will have all the components and the outlets
const EMP_Dashboard = () => {
  return (
    <Container className="flex ">
        <div style={{maxWidth:"30rem"}}>
          <Sidebar/>
        </div>
        <div style={{minWidth:"100%"}}>
          <EMP_Navbar/>
          <Outlet/>
      </div>
    </Container>
  )
}

export default EMP_Dashboard


const Container = styled.div`

`

