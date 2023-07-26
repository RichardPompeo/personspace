import { styled } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 240px;
  border: 5px dashed #2d2e2e;

  border-radius: 15px;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;

  &:hover {
    background-color: #212126ff;
    cursor: pointer;
  }
`;

export const Title = styled.h2`
  color: #2d2e2e;
`;
