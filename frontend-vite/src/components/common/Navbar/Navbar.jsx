import React from 'react'

import styled from "styled-components"
import logo from '/assets/images/logo.png';
import {NavLink,useNavigate } from 'react-router-dom';
import {RiArrowDropDownFill,RiUser3Line} from "react-icons/ri"
import { useEffect } from 'react';
const Navbar = () => {
  const navigate =  useNavigate();


  return (
    <DIV className="w-full bg-white shadow-xl fixed flex justify-between items-center">
        <LOGO className="ml-10"  >
          <img src={logo} onClick={()=>  navigate('/')} />
        </LOGO>
        <LINKS >
           <NavLink className="links" to="/">Home</NavLink>
           <NavLink className="links" to="/jobseeker">Job Seeker</NavLink>
           <NavLink className="links" to="/mentor">Mentor</NavLink>
           <NavLink className="links" to="/contact">Contact</NavLink>
        </LINKS>
        <USER className="mr-10">
          <RiUser3Line className={'user-box user-icon'} onClick={()=>navigate("/login")}/>
          <p>Sign-in</p>
        </USER>

        <MENUICON >

        </MENUICON>

    </DIV>
  )
}
export default Navbar;


const DIV = styled.div`
    height: 9.2rem;

`

const LOGO = styled.div`
    cursor: pointer;
    img{
        width: 7.9rem;
        object-fit: contain;
    }

`
const LINKS = styled.div`
    /* min-width: 50rem; */
    height: 8rem;
    display: flex;
    justify-content: center;

    font-size:1.7rem;
    align-items: center;   
    margin-left: -7rem;
    
  
    .links{
        /* border: 1px solid red; */
        padding-bottom:3.1rem;
        padding-top:3rem;
        text-decoration: none;
        color: #2c2b2b;
        font-weight: 400;
        font-size: 2.3rem;
        min-width:14rem;
        text-align: center;
        letter-spacing: 0.08rem;
        &:hover{
            color: #f59d05;
        }
     }
    .active{
        color:#fc8b01;
        border-bottom: 0.4rem solid orange;
    }
    
`
export const USER = styled.div`
    display: flex;
    flex-direction:  column;
    align-items: center;
    gap:0.2rem;
    justify-content: center;
    height:8rem;
    width: 6rem;
    /* position:absolute;
    right: 0;
    top: 0;
    margin-right: 5rem; */
    cursor:pointer;
   
    .user-box{
        
        font-size:2.3rem;
        color: #074851;
        &:hover{
            font-size:3rem;
        }
    }
    p{
        
        font-size: 1.2rem;
        color: black
        
    }


    @media (max-width: 768px) {
        display: none;
    }
    
`
export const MENUICON = styled.div`
  display:none;

`

