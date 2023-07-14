import { createGlobalStyle } from "styled-components"

export const screenSize = {
    isMobile: "640px",
    isTab: "880px",
    isDesktop: "2000px",
}



const GlobalStyles = createGlobalStyle`

   

    *{
        margin:0px;
        padding: 0px;
        box-sizing: border-box;
    }

    body{
        /* font-family: 'Roboto', sans-serif; */
        overflow-x: hidden;
        font-family: 'Poppins', sans-serif;
        /* font-family:  'sans-serif'; */
        
        max-width: 100%;
        max-height: 100%;
        /* overflow-x: hidden; */
        background-color: white;
    }
    input{
        font-size: 1.6rem;
        border-radius: 0.8rem;
        border-style: none;
        outline: none;
        height: 4.2rem;
        width: 29rem;
        padding: 1.2rem;
        /* filter: drop-shadow(0.01rem 0.01rem 0.1rem black); */
    }
    h1,h2,h3,h4,h5,h6 {
        
    }
    p{

    }
    button{
        cursor : pointer;
        text-transform: uppercase;
        letter-spacing: 0.2rem;
        margin: 2rem 0;
        transition : 500ms;
        outline: none;
        border-style: none;
    }
    html{
        font-size: 65.5%;
    }
    
`


export default GlobalStyles;