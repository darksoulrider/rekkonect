import React from 'react'

// *********** components imports ******
import Ment_Navbar from './components/Ment_Navbar';
import Ment_Footer from './components/Ment_Footer';
import Ment_Leftinfo from './components/Ment_Leftinfo';
import Ment_Rightinfo from './components/Ment_Rightinfo';
import banner from '/assets/images/carear-choice_img.png';
import { styled } from 'styled-components';




const profile_img = "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"


const Mentordashboard = () => {
  return (
    // ! hidden make overflow hidden below
    <Container className='overflow-x-hidden'>
      <div className='fixed w-full z-10 shadow-ml'>
        <Ment_Navbar />
      </div>
      <div className='w-full pt-32 '>
        <img src={banner} className='w-full h-[15rem] object-cover' alt="banner" />
        <div className='relative'>
          <div className='absolute left-[4rem] top-[-5rem]'>
            <img className='border-4 border-green-600 w-40 h-40 object-cover rounded-full cursor-pointer shadow-2xl' src={profile_img} alt="profile photo" />
          </div>
        </div>
      </div>
      <div className="cstm-layer-left-right pt-40 bg-[#f7f8fa]">
        <div className='cstm-leftside'>
          <Ment_Leftinfo />
        </div>

        <div className='cstm-rightside'>
          <Ment_Rightinfo />
        </div>
      </div>


      <div>
        <h1>Reviews section</h1>
      </div>

      <div>
        <Ment_Footer />
      </div>
    </Container>
  )
}

export default Mentordashboard;


const Container = styled.div`



@media (min-width: ${props => props.theme.isTab} ) and (max-width: ${props => props.theme.isLargeTab}){
  .cstm-layer-left-right{
  border: 2px solid red;
  display:grid;
  grid-template-columns: 70% 30%;
  .cstm-leftside{
    border: 1px solid blue;
  }
  >.cstm-rightside{
      border:3px solid green;
      flex-grow: 1;
  }

  }
}
@media (max-width: ${props => props.theme.isMobile}){
  .cstm-layer-left-right{
    display:flex;
    flex-direction:column;
    justify-content: center;
  }
}

@media (min-width: ${props => props.theme.isMobile} ) and (max-width: ${props => props.theme.isTab}){
  .cstm-layer-left-right{
    display:flex;
    flex-direction:column;
    justify-content: center;
  }
}
 /* @media (min-width: ${props => props.theme.isTab} ) and (max-width: ${props => props.theme.isLargeTab}){
  .cstm-layer-left-right{
    display:flex;
    justify-content: center;

    >.cstm-leftside{
      flex-basis: 60%;

      border: 1px solid blue;
    }
    >.cstm-rightside{
      flex-basis: 40%;

      border: 2px solid green;
    } 

  }
}  */

@media (min-width: ${props => props.theme.isLargeTab} ) and (max-width: ${props => props.theme.isDesktop}){

  .cstm-layer-left-right{
    display:flex;
    gap:4rem;
    justify-content: center;
    border: 3px solid black;
    >.cstm-rightside{
      border:3px solid green;
    }
    >.cstm-leftside{
      border:3px solid green;
      
    }
  }

}

`