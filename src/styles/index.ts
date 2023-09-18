import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    html, body {
        height: 100%;
    }

    body {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #f5f5f5;

        font-family: 'Roboto', sans-serif;
        -webkit-font-smoothing: antialiased;
    }

    input, button {
        font: 400 18px Roboto, sans-serif;
    }

    a {
        color: #444;
        text-decoration: none;
    }
`;
