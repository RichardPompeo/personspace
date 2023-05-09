import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
  * {
    margin: 0;
    border: 0;
    padding: 0;
    color: #fff;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
    font-family: 'Supreme', sans-serif;
  }
`;