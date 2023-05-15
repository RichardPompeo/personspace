import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  padding: 0.2em 1.6em;
  border-radius: 10px;
`;

export const GlobeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 12px;
  margin: 10px 20px;
  border-radius: 50%;
  background-color: rgba(142, 181, 240, 0.1);

  &:hover {
    background-color: ${({ theme }) => theme.COLORS.DEFAULT};

    svg {
      fill: ${({ theme }) => theme.COLORS.DEFAULT_TWO};
    }
  }
`;

export const ContentRegistration = styled.div`
  display: flex;
  gap: 1em;
  padding-left: 30px;
  border-left: 1px solid ${({ theme }) => theme.COLORS.DEFAULT};
`;

export const ButtonSU = styled.button`
  cursor: pointer;
  padding: 0.9em 2em;
  color: ${({ theme }) => theme.COLORS.DEFAULT_TWO};
  border: 2px solid ${({ theme }) => theme.COLORS.DEFAULT_TWO};
  border-radius: 10px;
  box-shadow: 4px 5px black;
  background-color: rgba(142, 181, 240);
`;

export const ButtonSI = styled(ButtonSU)`
  color: ${({ theme }) => theme.COLORS.DEFAULT};
  border: 2px solid ${({ theme }) => theme.COLORS.PRIMARY};
  box-shadow: none;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
`;