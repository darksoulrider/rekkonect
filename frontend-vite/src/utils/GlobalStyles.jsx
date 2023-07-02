import {createGlobalStyle} from "styled-components"

export const screenSize = {
    mobile:"480px",
    tab:"980",
    desktop:"1380px",
    extraLarge:"1920px",
}



const GlobalStyles = createGlobalStyle`
    *{
        margin:0px;
        padding: 0px;
        box-sizing: border-box;
    }
    html{
        font-size: 65.5%;
    }
    body{
        font-family: 'Roboto', sans-serif;
        max-width: 100%;
        max-height: 100%;
        /* overflow-x: hidden; */
    }
    input{
        font-size: 1.7rem;
        border-radius: 0.8rem;
        border-style: none;
        outline: none;
        height: 4.3rem;
        min-width: 29rem;
        padding: 1.2rem;
        /* filter: drop-shadow(0.01rem 0.01rem 0.1rem black); */
    }
    h1,h2,h3,h4,h5,h6 {
        
    }
    p{

    }

`


export default GlobalStyles;