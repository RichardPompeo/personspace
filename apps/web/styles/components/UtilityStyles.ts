import { styled } from "styled-components";

import { IconButton } from "ui";

export const Container = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  padding: 0.1em 1.7em;
  border-radius: 10px;

  @media (max-width: 900px) {
    padding: 0;
  }
`;

export const ContentRegistration = styled.div`
  display: flex;
  gap: 1em;
  padding-left: 30px;
  border-left: 1px solid ${({ theme }) => theme.COLORS.DEFAULT};

  @media (max-width: 900px) {
    display: none;
  }
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

export const UtilityResponsiveButton = styled(IconButton)`
  display: none;
  margin-left: 0px;

  @media (max-width: 900px) {
    display: flex;
  }
`;
