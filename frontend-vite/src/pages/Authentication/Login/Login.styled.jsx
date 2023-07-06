import { styled } from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width:100%;
    min-height:100vh;
    padding-top: 8rem;
    background-color: #262b322d;
        
`
export const Form = styled.form`
    display:flex;
    flex-direction: column;    
    background-color: #201;
    align-items: center;
    margin-top: -3rem;
    min-width: 34rem;
    min-height: 54rem;
    color:white;
    border-radius: 1rem;
    filter: drop-shadow(1.1rem 1.1rem 2.2rem gray);
    h1{
        margin-top: 3rem;
        font-size: 2.3rem;
    }
    input{
        margin-top:2.3rem;
        
        &::placeholder{
            color: #030B42;
            opacity: 0.7;
        }
    }
    button{
        margin-top:3rem;
        font-size: 1.4rem;
        min-width: 6rem;
        min-height:4rem;
        font-family: Roboto, sans-serif;
        color: white;
        padding: 1rem 4rem;
        border-radius: 1rem;
        background-color: rgb(110, 89, 74);

        /* background-color: rgb(255,100,0); */
        &:hover{
            transition : 50ms;
            padding: 1rem 4.1rem;
            background-color: #4d0f04;
            color: white;
        }
    }
    .error{
        /* margin-right:auto; */
        margin-left: 2.6rem;
        font-size: 1.2rem;
        margin-top: 0.2rem;
        color: #fba3a3;
    }
    .infos{
        min-width: 90%;
    /* border:1px solid red; */
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    min-height:4rem;
    font-size: 1rem;
    margin-top: 2rem;
    .one{
        font-size: 1.3rem;
        span{
            margin-left: 0.5rem;
            cursor: pointer;
            font-weight: bold;
            &:hover{
                color: red;
            }
        }
    }
    .two{
        font-size: 1.3rem;
        cursor: pointer;
        &:hover{
            color: red;
        }
    }
    }


`
export const ImageContainer = styled.div`

`