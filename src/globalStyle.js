import { createGlobalStyle } from "styled-components";
import logo from '/logo-background.png';

const GlobalStyle = createGlobalStyle`

    html,body{
        height: 100%;
    }

    body{
        background:url(${logo});
        background-repeat: repeat;
        background-size: 400px ;
        background-color: #ffffffcf;
    }

    #root{
        height: 100%;
    }

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Mulish', sans-serif;
    }
`;

export default GlobalStyle;