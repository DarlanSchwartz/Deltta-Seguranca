import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    html,body{
        height: 100%;
        background-color: black;
    }

    body{
        background:url('https://www.verzani.com.br/wp-content/uploads/2021/12/post_thumbnail-bc02427cd031793c1655ad1a23c688cd.jpeg');
        background-repeat: no-repeat;
        background-size: cover;
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