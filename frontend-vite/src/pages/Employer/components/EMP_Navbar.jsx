import React, { useEffect } from "react";
import styled from "styled-components";
import { MdNotifications } from "react-icons/md";
import Logo from "/assets/images/profile.png";
import { useState } from "react";
import { Menu } from "@headlessui/react";
import { IoMdArrowDropdown } from "react-icons/io"
import { useLazyLogoutQuery } from "../../../redux/apicall/auth";
import axios from "axios";




const EMP_Navbar = ({ userData }) => {
  const [isDropDown, setIsDropDown] = useState(false);
  const navopt = [
    "upload profile",
    "change Password",
    "logout",
  ]
  const [logoutTrigger, { isError, isSuccess }] = useLazyLogoutQuery();
  let data = undefined;
  const handleClick = async (opt) => {
    if (opt === "logout") {
      data = await logoutTrigger();
    }
    if (opt === "change Password") {
      // impiment logic
    }
    if (opt === "upload profile") {
      // implement logic
    }
  }

  return (
    <Container className="cstm-layer pr-5  h-28 flex justify-end  text-black bg-slate-100 items-center gap-3">
      <div className=" outline-none ">
        <Menu>
          <Menu.Button className=" outline-none cstm-btn w-full my-2 mr-10 flex  flex-col items-center">
            <div className="w-20 rounded-full  shadow-2xl  ">
              <img
                src={userData.avatar.imageUrl}
                alt="profile"
                style={{ objectFit: 'cover' }}
                className="w-20 h-20 shadow-lg  rounded-full"
              />
            </div>
            <div>
              <IoMdArrowDropdown className={`text-3xl`} />
            </div>
          </Menu.Button>
          <div className="relative">
            <Menu.Items className="flex w-72 flex-col gap-3 absolute right-8 rounded-md bg-white border border-slate-200 shadow-md">
              {
                navopt.map(opt => {
                  return <Menu.Item
                    as="a"
                    key={opt}
                    // onClick={() => handleJobTypeSelection(JT)}
                    onClick={() => handleClick(opt)}
                    className="cursor-pointer py-2 px-4 hover:bg-slate-200 text-2xl"
                  >
                    {opt}
                  </Menu.Item>
                })
              }
            </Menu.Items>
          </div>
        </Menu>
      </div>

    </Container>
  );
};

export default EMP_Navbar;

const Container = styled.div`
  @media (max-width: ${props => props.theme.isMobile}) {
    .cstm-layer{
      .cstm-btn {
      }
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
      right:2rem;
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
      right:2rem;
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
