import { styled } from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  input {
    width: 21em;
    height: 2.9em;
    font-size: medium;
    border-radius: 10px;
    background-color: #26262c;
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: ${({ theme }) => theme.COLORS.DEFAULT};
  }

  span {
    background-color: #26262c;
    border-radius: 10px;
    font-size: medium;
    border: 1px solid rgba(255, 255, 255, 0.3);

    input {
      width: 18em;
      height: 2.3em;
      color: ${({ theme }) => theme.COLORS.DEFAULT};
    }

    span {
      margin: 0;
      border: none;
    }
  }

  button {
    box-shadow: none;
    border: none;
    font-size: 12pt;
    padding: 0.8em 2em;

    @media (max-width: 1600px) {
      font-size: 12pt;
    }

    @media (max-width: 1200px) {
      padding: 0.8em 2em;
    }
  }

  * + * {
    margin-top: 1em;
  }

  span + button {
    margin-top: 2em;
  }

  input::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }
`;
