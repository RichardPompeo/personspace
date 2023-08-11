import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    border: 0;
    padding: 0;
    color: #fff;
    box-sizing: border-box;
  };

  :root { 
    color-scheme: dark;
  }

  body {
    font-family: 'Supreme', sans-serif;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  };
`;