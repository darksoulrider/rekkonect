import React from "react";
import styled from "styled-components";
import { MdNotifications } from "react-icons/md";
import Logo from "/assets/images/profile.png";
import { useState } from "react";
import { Menu } from "@headlessui/react";
import { IoMdArrowDropdown } from "react-icons/io"





const EMP_Navbar = ({ userData }) => {


  const [isDropDown, setIsDropDown] = useState(false);


  const logout = () => {
    window.alert("logout clicked");
    setIsDropDown(!isDropDown);
  }
  return (
    <Container className="cstm-layer pr-5  h-28 flex justify-end  text-black bg-slate-200 items-center gap-3">
      <div>
        {/* <MdNotifications className={`cstm-notification`} /> */}
      </div>
      <div className={`cstm-profile-layer flex items-center`} onClick={() => { setIsDropDown(!isDropDown) }} >
        <div className="w-20 rounded-full shadow-2xl ">
          <img
            src={userData.avatar.imageUrl}
            alt="profile"
            style={{ objectFit: 'cover' }}
            className="w-20 h-20 shadow-lg rounded-full"
          />
        </div>
        <div>
          <IoMdArrowDropdown className={`text-3xl`} />
        </div>
      </div>
      {(isDropDown ?
        <div className="cstm-drop-logout items-center  bg-slate-500 00 transition-all duration-100 absolute justify-center flex text-white">
          <div onClick={logout} className="bg-orange-600 px-4 py-1 rounded-md tracking-wider " >
            <p className="cursor-pointer font-bold">Logout</p>
          </div>
        </div> : "")}
    </Container>
  );
};

export default EMP_Navbar;

const Container = styled.div`
  @media (max-width: ${props => props.theme.isMobile}) {
    .cstm-layer{
      
    }
    position: fixed;
    width: 100%;
    z-index: 1;
    .cstm-notification {
      font-size: 2.7rem;
    }
    .cstm-drop-logout{
      width: 8rem;
      right: 1.2rem;
      top:7rem;
      height: 5rem;
      font-size: 1.3rem;
      border-radius:2.1rem 0rem 1.3rem 0.3rem;

    }
    .cstm-profile-layer{
      position: absolute;
      /* margin-right: 15rem; */
      right:6rem;
    }
  }
  @media (min-width: ${props => props.theme.isMobile}) and (max-width: ${props => props.theme.isTab}) 
  {
    /* position: fixed; */
    position: fixed;
    width: 100%;
    z-index: 1;

    
    .cstm-notification {
      font-size: 2.7rem;
    }
    .cstm-drop-logout{
      width: 10rem;
      right: 1.2rem;
      top:7rem;
      height: 5rem;
      font-size: 1.3rem;
      border-radius:2.1rem 0rem 1.3rem 0.3rem;
    }
    .cstm-profile-layer{
      position: absolute;
      /* margin-right: 15rem; */
      right:6rem;
    }
    
  }
  @media (min-width: ${props => props.theme.isTab}) and (max-width: ${props => props.theme.isDesktop}) {


    position: fixed;
    width: 100%;
    z-index: 1;
    .cstm-notification {
      font-size: 2.7rem;
    }
    .cstm-profile-layer{
      position: absolute;
      /* margin-right: 15rem; */
      right:3rem;

    }
    .cstm-drop-logout{
      width: 10rem;
      right: 2rem;
      top:7rem;
      height: 5rem;
      font-size: 1.3rem;
      border-radius:2.1rem 0rem 1.3rem 0.3rem;
    }
  }

  @media (min-width: 2000px) {

  }
`
