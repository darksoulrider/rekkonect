import React from 'react'
import Sidebar from './components/Sidebar'

import { Outlet } from 'react-router-dom'
import { styled } from 'styled-components'
import EMP_Navbar from './components/EMP_Navbar'
// this will have all the components and the outlets
const EMP_Dashboard = () => {
  return (
    <Container className="flex ">
      <div className='sidebar' style={{ maxWidth: "30rem" }}>
        <Sidebar />
      </div>
      <div style={{ minWidth: "100%" }}>
        <EMP_Navbar className='navbar' />
        <div className='outlet'>
          <Outlet />
        </div>
      </div>
    </Container>
  )
}

export default EMP_Dashboard


const Container = styled.div`

/*  fix this according to screen widht */

  @media (max-width: ${props => props.theme.isMobile}){
    .outlet{
      padding-top:8rem;
    }
  }
  @media (min-width: ${props => props.theme.isMobile}) and (max-width: ${props => props.theme.isTab}){
    .outlet{
      margin-top:8rem;
      margin-left:8rem;
      margin-right:0.3rem;
      /* border:0.4rem solid red; */
    }
    
  }
  @media (min-width: ${props => props.theme.isTab}) and (max-width: ${props => props.theme.isDesktop}){
      .outlet{
      margin-top:10rem;
      margin-left:9.8rem;
      min-height:100vh;
    }
  }


  /* .navbar{
    z-index: 11;
  } */

`

