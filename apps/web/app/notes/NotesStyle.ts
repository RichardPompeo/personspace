import { styled } from "styled-components";

interface SwitchTextProps {
  active: boolean;
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 25px;
  position: relative;

  @media (max-width: 767px) {
    padding-top: 100px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 2em;
  
  @media (max-width: 776px) {
    justify-content: space-between;
  }
  `;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const Button = styled.span`
  &:hover {
    cursor: pointer;
  }
`;

export const Title = styled.h1`
  display: flex;
  gap: 0.5em;
  font-size: 24px;
  align-items: center;
  

  span {
    display: flex;
    align-items: center;
    padding: 0 15px 3px 15px;
    height: 1.2em;
    border-radius: 15px;

    background-color: #212126ff;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const Switch = styled.div`
  display: flex;
  background-color: #212126ff;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.2);
  border-radius: 25px;
`;

export const SwitchText = styled.p<SwitchTextProps>`
  color: ${({ active }) => (active ? "white" : "#bbbbbb")};
  padding: 12px 15px;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  border-radius: 25px;
  background-color: ${({ theme, active }) =>
    active ? theme.COLORS.PRIMARY : "transparent"};
`;

export const Content = styled.div`
  padding: 25px 0;
  margin-top: 3em;

`;

export const SharedNoteData = styled.div`
  border: 5px dashed #2d2e2e;
  border-radius: 15px;
  padding: 25px;
  text-align: center;
  height: 240px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 10px;
`;

export const SharedNoteTitle = styled.h1`
  color: #2d2e2e;
  padding: 15px 0 0 0;
`;