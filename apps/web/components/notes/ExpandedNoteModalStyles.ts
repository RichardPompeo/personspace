import { styled } from "styled-components";

import { Col } from "antd";

import { ProfileButton } from "ui";

interface ColorProps {
  color: string;
}

interface FlexColProps {
  bordered?: boolean;
}

interface SwitchTextProps {
  active: boolean;
}

export const ExpandedNoteModalContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 2em 1.5em 2em 2.5em;
  flex-direction: column;
  display: flex;
`;

export const Header = styled.div`
  display: flex;
  align-items: top;
  margin-right: 45px;
  justify-content: space-between;
  margin-left: 10px;
`;

export const ContentDescription = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
  overflow-y: auto;
  padding-right: 1.5em;
  word-break: break-word;
`;

export const Description = styled.h3`
  color: gray;
  margin: 25px 0;
  outline: none;
  font-weight: normal;
  white-space: pre-line;
`;

export const TitleContainer = styled.div`
  display: flex;
  gap: 10px;
  padding-right: 10px;
  align-items: center;
  justify-content: space-between;
`;

export const Color = styled.div<ColorProps>`
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background-color: ${({ color }) => color};
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
`;

export const FlexCol = styled(Col)<FlexColProps>`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-right: ${({ theme, bordered }) =>
    bordered && `2px solid ${theme.COLORS.PRIMARY}`};

  @media (max-width: 991px) {
    border-right: none;
  }
`;

export const Time = styled.p`
  color: #bbbbbb;
`;

export const PointDivider = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: gray;
  opacity: 0.25;
  margin: 0 10px;
`;

export const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 991px) {
    padding-right: 30px;
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
  outline: none;
  gap: 0.4em;
  font-size: 24px;
  align-items: center;

  span {
    display: flex;
    align-items: center;
    padding: 0 13px 2px 13px;
    height: 1.2em;
    border-radius: 15px;
    background-color: #212126ff;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const Input = styled.input`
  border-bottom: ${({ theme }) => `2px solid ${theme.COLORS.SECONDARY}`};
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
  padding: 10px;
  outline: none;
  width: 100%;
`;

export const ProfileBadge = styled(ProfileButton)`
  min-width: 35px;
  min-height: 35px;
  width: 35px;
  height: 35px;
  cursor: default;
  margin-left: 10px;
`;

export const Switch = styled.div`
  background-color: #212126ff;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.2);
  border-radius: 25px;
  display: flex;
`;

export const SwitchText = styled.p<SwitchTextProps>`
  color: ${({ active }) => (active ? "white" : "#bbbbbb")};
  padding: 10px 13px;
  font-size: 12px;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  border-radius: 25px;
  background-color: ${({ theme, active }) =>
    active ? theme.COLORS.PRIMARY : "transparent"};
`;

export const Content = styled.div`
  margin: 25px 0;
  flex-direction: column;
  overflow-y: scroll;
  height: 100%;
  width: 100%;
  display: flex;
  margin: 10px;
`;

export const PopoverContainer = styled.div`
  display: flex;
  cursor: pointer;
  padding: 5px 5px 5px 0;
  border-radius: 10px;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(211, 211, 211, 0.1);
  }
`;
