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
    padding-top: 80px;
  }
`;

export const Content = styled.div`
  padding: 25px 0;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

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

export const Switch = styled.div`
  background-color: #212126ff;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.2);
  border-radius: 25px;
  display: flex;
`;

export const SwitchText = styled.p<SwitchTextProps>`
  color: ${({ active }) => (active ? "white" : "#bbbbbb")};
  padding: 12px 15px;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  border-radius: 25px;
  background-color: ${({ theme, active }) =>
    active ? theme.COLORS.PRIMARY : "transparent"};
  box-shadow: ${({ active }) =>
    active ? "1px 1px 15px rgba(0, 0, 0, 0.2)" : "none"};
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

export const Title = styled.h1`
  font-size: 24px;
`;
