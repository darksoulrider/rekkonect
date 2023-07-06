import React, { useState } from 'react';
import { MdWorkHistory, MdConnectWithoutContact } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { RiUserSettingsFill } from 'react-icons/ri';
import { NavLink, useNavigation } from 'react-router-dom';
import {BsArrowLeftCircleFill} from "react-icons/bs";
import Logo from "/assets/images/logo.png";
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Tooltip  } from "react-tooltip";
const Sidebar = () => {
  const MENUS = [
    {
      title: 'Jobs',
      to: '/jobs',
      icon: <MdWorkHistory />,
      // remember to make the route /employer/${title}
      
    },
    {
      title: 'Candidates',
      to: '/candidates',
      icon: <FaUsers />,
    },
    {
      title: 'Connect',
      to: '/connect',
      icon: <MdConnectWithoutContact />,
    },
    {
      title: 'Profile',
      to: '/profile',
      icon: <RiUserSettingsFill />,
    },
 
  ];

  const [isOpen,SetisOpen] = useState(false);
  const navigate = useNavigate(true);
  const mobileFunc = ()=>{
    SetisOpen(false);
  }

  return (
    <Container  isOpen={isOpen}>
      <div className={`cstm-layer transition-all duration-0 text-black bg-slate-200 shadow-xl h-screen `}>
        <div className="cstm-logo-arrow pt-10 px-10 flex">
    
          <p onClick={()=>navigate("/jobs")} className={`ctsm-logo-name text-orange-600 tracking-wider text-[2rem] lg:text-[2.5rem] font-bold cursor-pointer ${!isOpen ? "hidden":""} `}>Re<span className=' text-[rgb(21,116,153)]'>-Konnect</span> 
          </p>
    
          <BsArrowLeftCircleFill onClick={()=>SetisOpen(!isOpen)}  className={`cstm-btn-arrow absolute  ${!isOpen ? "rotate-180":""} text-5xl text-orange-600 transition-all duration-100`}/>
        </div>
        <MenuLinks className="cstm-menu mt-32 ">
          {MENUS.map((item) => (
            <div  key={item.title}>
              <div className='mack'>
                <NavLink onClick={mobileFunc} className={`flex coustm-title items-center mx-9 mt-10 gap-5   bg-gray-300  hover:bg-[rgb(21,116,153)]  rounded-xl hover:text-white ${!isOpen ? "w-[5rem]":"w-[15rem]"}`} to={item.to}>
                  <p data-tooltip-id={item.title} data-tooltip-content={item.title} data-tooltip-variant="info" className={`text-5xl pl-4 `}>
                    {item.icon} 
                  </p> 
                  {(!isOpen) ?
                    <Tooltip  
                    id={item.title}
                    place="right"
                    content={item.content}
                    className="ml-10 "
                    />:null
                  }
                  <p className={`${!isOpen ? "hidden":""}`}>
                    {item.title}
                  </p> 

                </NavLink>
              </div>
            </div>
          ))}
        </MenuLinks>
      </div>
    </Container>
  );
};

export default Sidebar;


const Container = styled.div`

  @media (min-width: 330px) and (max-width:640px){
    /* <520px */
    .cstm-layer{
      position: fixed;
      width: ${props => props.isOpen ? "21rem":"0rem"};
    }
    .cstm-btn-arrow {
      margin-left: ${props => props.isOpen ? "16rem":"0rem"};
    }
    .ctsm-logo-name{
        font-weight: bold;
        font-size: 2.2rem;
    }
    .cstm-menu{
      display:${props => !props.isOpen ? "none":""};
    }

    
  } 
  @media (min-width: 640px) and (max-width:880px){
    /* <520px */
    .cstm-layer{
      position: absolute;
      width: 0px;
    }
    
  } 
  @media (min-width: 880px) and (max-width:1380px){
    /* <520px */
    .cstm-layer{
 
    }
    .cstm-btn-arrow {
      margin-left: ${props => props.isOpen ?  "16rem" : "5rem"};
    }
    
  } 

  @media (min-width: 1380px){
    
    .cstm-layer{
    
      
    }
    .cstm-btn-arrow {
      margin-left: ${props => props.isOpen ?  "16rem" : "5rem"};
    }
  } 


  .active{
    background-color: rgb(234,88,12);
    color: white;
  }


`

const MenuLinks = styled.div`

  
  .coustm-title{
    font-size: 1.4rem;
    padding: 0.5rem 0;
    font-weight: 600;
    letter-spacing:0.07rem;
    
  }
  
`