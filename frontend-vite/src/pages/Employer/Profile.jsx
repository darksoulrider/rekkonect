import React, { useEffect } from "react";
import { styled } from "styled-components";
import PersonalInfo from "./components/PersonalInfo";
import ProfessionalInfo from "./components/ProfessionalInfo";
import { useGetProfileQuery, useGetAdditionalInfoQuery } from "../../redux/apicall/employer/userProfile";

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
      <div className="">
        <div className="cstm-top-imgs ">
          <img
            className="cstm-profile shadow-md"
            src={data.user.avatar.imageUrl}
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
  margin-top: 10rem;
  width: 100%;
  
  background-color: #ffffff;
  /* background-color: blue; */
   @media (max-width: ${(props) => props.theme.isMobile}) {
    margin-top:1rem;

  
    .cstm-top-imgs{
      display:flex;
      flex-direction:column;
      justify-content: center;
      align-items: center;
      margin-top: 2rem;
      border-bottom : 1px solid rgba(56, 53, 53,0.5);
      >.cstm-profile {
        height: 100vh;
        background-repeat: no-repeat;
        max-width: 5rem;
        max-height: 5rem;
        background-size: cover;
        border-radius: 50%;
      }
      >h2{
        font-size: 2rem;
        padding-bottom:0.8rem;
        margin-top:1.2rem;
      }
    }
    .cstm-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
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
      justify-content: space-around;
      flex-direction: column;
      >.cstm-personal{
        background-color: #ffffff;
        color:white;
        border:4rem solid black;
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
        object-fit: cover;
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
      
      flex-direction: row;
      justify-content: space-around;
      /* background-color: blue */
    }

  }

 `;

// >.cstm-personal{
//   background-color: #ffffff;
//   color:white;
// }