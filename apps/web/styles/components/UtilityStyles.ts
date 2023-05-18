import { styled } from "styled-components";
import { OverlayButton } from "ui";

export const Container = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  padding: 0.1em 1.7em;
  border-radius: 10px;

  @media (max-width: 900px) {
    display: none;
  } 
`;

export const ContentRegistration = styled.div`
  display: flex;
  gap: 1em;
  padding-left: 30px;
  border-left: 1px solid ${({ theme }) => theme.COLORS.DEFAULT};
`;

export const ContainerPopover = styled.div`
  display: flex;
  margin-top: 2.5em;
  gap: 2em;
  align-items: flex-end;
  flex-direction: column;
`;

export const ContentPopover = styled.div`
  display: flex;
  gap: 1em;
  width: 100%;
  flex-direction: column;
`;

export const UtilityResponsiveButton = styled(OverlayButton)`
  display: none;
  top: 0;
  right: 0;

  @media (max-width: 900px) {
    display: flex;
  }  
`;

export const RegisterButton = styled.button`
  cursor: pointer;
  padding: 0.9em 2em;
  color: ${({ theme }) => theme.COLORS.DEFAULT_TWO};
  border: 2px solid ${({ theme }) => theme.COLORS.DEFAULT_TWO};
  border-radius: 10px;
  box-shadow: 4px 5px black;
  background-color: rgba(142, 181, 240);

  @media (max-width: 1200px) {
    padding: 0.6em 1.6em;
    box-shadow: 2px 3px;
  };
`;

export const LoginButton = styled(RegisterButton)`
  color: ${({ theme }) => theme.COLORS.DEFAULT};
  border: 2px solid ${({ theme }) => theme.COLORS.PRIMARY};
  box-shadow: none;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
`;