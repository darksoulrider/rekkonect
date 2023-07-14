import React, { useEffect } from "react";
import { styled } from "styled-components";
import carearChoice from "/assets/images/carear-choice_img.png";
import PersonalInfo from "./components/PersonalInfo";
import ProfessionalInfo from "./components/ProfessionalInfo";
import { useGetProfileQuery } from "../../redux/apicall/employer/userProfile";
import axios from 'axios';
const Profile = () => {

  const { data, error, isLoading } = useGetProfileQuery(
    undefined, {
    refetchOnMountOrArgChange: true,
  }
  );


  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "black" }}>Error: {error.message}</p>;
  }

  if (!data) {
    return null; // or render a placeholder or loading state
  }




  return (

    <Container>
      <div>
        <div className="cstm-top-imgs ">
          <img
            className="cstm-profile shadow-md"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
            alt="Profile picture"
          />
          <h2 className="text-slate-900 font-bold">{data.user.companyName}</h2>
        </div>
        <div className="cstm-info">
          <PersonalInfo className="cstm-personal" userdata={data} />
          <ProfessionalInfo className="cstm-professional" userdata={data} />
        </div>
      </div>
    </Container>
  );
};

export default Profile;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
   @media (max-width: ${(props) => props.theme.isMobile}) {
    .cstm-profile {
      height: 100vh;
      background-repeat: no-repeat;
      max-width: 5rem;
      max-height: 5rem;
      background-size: cover;
      border-radius: 50%;
    }
  }

  @media (min-width: ${(props) => props.theme.isMobile}) and (max-width: ${(props) => props.theme.isTab}) {
    .cstm-top-imgs{
      display:flex;
      flex-direction:column;
      justify-content: center;
      align-items: center;
      margin-top: 2rem;

      border-bottom : 1px solid rgba(56, 53, 53,0.5);
    
      >h2{
        font-size: 2rem;
        padding-bottom:0.8rem;
        margin-top:1.2rem;
      }
    }
    .cstm-profile {
      
      height: 100vh;
      background-repeat: no-repeat;
      max-width: 5rem;
      max-height: 5rem;
      background-size: cover;
      border-radius: 50%;

    }
    
    .cstm-info {
      display: flex;
      flex-direction: column;

      gap: 1rem;
    }
    
  }
  @media(min-width: ${props => props.theme.isTab}) and (max-width: ${props => props.theme.isLargeTab}) { 
    .cstm-top-imgs{
      display:flex;
      flex-direction:column;
      justify-content: center;
      align-items: center;
      margin-top: 2rem;
      border-bottom : 1px solid rgba(56, 53, 53,0.5);
    
      >h2{
        font-size: 2rem;
        padding-bottom:0.8rem;
        margin-top:-0.34em;
      }
    }
    .cstm-profile {
      width: 8rem;
      height: 8rem;
      background-size: cover;
      border-radius: 50%;
      background-repeat: no-repeat;
      position:relative;
      top: -2rem;
      /* border: 3px solid #e05402; */
      
      
    }
    .cstm-info{
      display: flex;
      width: 100%;
      height: 100vh;
      justify-content: space-around;

      >.cstm-personal{
        background-color: #ffffff;
        color:white;
      }
    }
        
  }
  @media (min-width: ${(props) => props.theme.isLargeTab}) and (max-width: ${(props) => props.theme.isDesktop}) {
    .cstm-top-imgs{
      display:flex;
      flex-direction:column;
      justify-content: center;
      align-items: center;
      margin-top: 2rem;
      border-bottom : 1px solid rgba(56, 53, 53,0.5);
      >.cstm-profile {
        width: 8rem;
        height: 8rem;
        background-size: cover;
        border-radius: 50%;
        background-repeat: no-repeat;
        position:relative;
        top: -2rem;      
      }
      >h2{
        font-size: 2rem;
        padding-bottom:0.8rem;
        margin-top:-0.34em;
      }
    }
 
    .cstm-info{
      display: flex;
      width: 100%;
      flex-direction: column;
      justify-content: space-around;
   
    }
  }

 `;

// >.cstm-personal{
//   background-color: #ffffff;
//   color:white;
// }