import { styled } from "styled-components";

import { Popover } from "antd";
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

export const overlayStyle = {
  background: "#23232fff",
  width: "250px",
  borderRadius: "10px",
};

export const ContainerPopover = styled.div`
  display: flex;
  margin-top: 1.5em;
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
  padding: 13px;
  margin-left: 0px;

  svg {
    font-size: 25px;
  }

  @media (max-width: 900px) {
    display: flex;
  }
`;
