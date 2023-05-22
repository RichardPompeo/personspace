import { styled } from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  input {
    width: 23em;
    height: 3em;
    /* background-color: transparent; */
  }

  input + input {
    margin-top: 2em;
  }
`;