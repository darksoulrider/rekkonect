import React from 'react'
import { styled } from 'styled-components'

import logo from '/assets/images/logo.png';
import { Menu } from "@headlessui/react";
import { IoMdArrowDropdown } from "react-icons/io"
import { useNavigate } from 'react-router-dom';
const profile_img = "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
const Ment_Navbar = () => {

    const navigate = useNavigate();

    const opt = [
        'change Profile',
        'change password',
        'logout',
    ]

    const handleClick = () => {

    }

    return (
        <Container className="shadow-xl">
            <div className='h-[8.4rem] bg-white'>
                <div className={`cstm-nav-layer`}>
                    <div className='pl-10' onClick={() => navigate('/mentor/dashboard')}>
                        <img className="cstm-logo w-[7.2rem] cursor-pointer object-contain h-[7.2rem]" src={logo} alt='logo' />
                    </div>
                    {/* <div>Links</div> */}
                    <div className='flex gap-4 items-center'>
                        <p className='cstm-welcome text-3xl font-medium tracking-wider '>Welcome mentor!</p>
                        <Menu>
                            <Menu.Button>
                                <div className='flex justify-center items-center'>
                                    <img className='border-4 border-green-600 w-20 h-20 object-cover rounded-full cursor-pointer shadow-2xl' src={profile_img} alt="profile photo" />
                                    <div>
                                        <IoMdArrowDropdown className={`text-5xl text-cstmO`} />
                                    </div>
                                </div>
                            </Menu.Button>
                            <div className="relative">
                                <Menu.Items className="flex w-72 flex-col gap-3 absolute right-10 top-20 py-2  rounded-md bg-white border border-slate-200 shadow-md">
                                    {
                                        opt.map(opt => {
                                            return <Menu.Item
                                                as="a"
                                                key={opt}

                                                onClick={() => handleClick(opt)}
                                                className="cursor-pointer py-2 px-4 hover:bg-cstmB hover:text-white text-[1.6rem]"
                                            >
                                                {opt}
                                            </Menu.Item>
                                        })
                                    }
                                </Menu.Items>
                            </div>
                        </Menu>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Ment_Navbar;


const Container = styled.div`

    @media (max-width: ${props => props.theme.isMobile}) {
        .cstm-nav-layer{
            display: flex;
            justify-content: space-between;
            align-items:center;
            >div>.cstm-welcome{
                font-size: 1.4rem;
            }
            >div>.cstm-logo{
                width:6rem;
                height:6rem;
                object-fit: contain;
                -webkit-tap-highlight-color: transparent;   
                
            }
        }
    }
    @media (min-width: ${props => props.theme.isMobile}) and (max-width: ${props => props.theme.isTab}) {

        .cstm-nav-layer{
            display: flex;
            justify-content: space-between;
            align-items:center;
            >div>.cstm-logo{
                object-fit: contain;
                -webkit-tap-highlight-color: transparent;   
                
            }
        }

    }

    
    @media (min-width: ${props => props.theme.isTab}) and (max-width: ${props => props.theme.isLargeTab}) {

        .cstm-nav-layer{
            display: flex;
            justify-content: space-between;
            align-items:center;

            >div>.cstm-logo{
                object-fit: contain;
                -webkit-tap-highlight-color: transparent;   
   
            }
        }

    }


    @media (min-width: ${props => props.theme.isLargeTab}) and (max-width: ${props => props.theme.isDesktop}) {
        .cstm-nav-layer{
            display: flex;
            justify-content: space-between;
            align-items:center;
        }



    }


`