import { styled } from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  input {
    width: 24em;
    height: 3.5em;
    border-radius: 10px;
    background-color: #26262C;
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: ${({ theme }) => theme.COLORS.DEFAULT};
  }

  button {
    box-shadow: none;
    border: none;
  }

  * + * {
    margin-top: 1em;
  }

  input + button {
    margin-top: 2em;
  }

  input::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }
`;