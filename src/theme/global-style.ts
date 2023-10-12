import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html {
        font-size: 16px;
    }
    
    body {
        margin: 0;
        font-family: 'Roboto', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #262626;
        font-weight: 500;
    }

    p {
        padding: 0;
        margin: 0;
    }
`;

export default GlobalStyle;
