import { styled } from "styled-components";

import { ProfileButton } from "ui";

export const Container = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const ProfileBadge = styled(ProfileButton)`
  min-width: 35px;
  min-height: 35px;
  width: 35px;
  height: 35px;
  cursor: default;
`;

export const LeftSide = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
`;

export const RightSide = styled.div`
  gap: 10px;
  display: flex;
  align-items: top;
  white-space: nowrap;
  margin-left: auto;
`;

export const Name = styled.h1`
  font-size: 16px;
`;

export const Email = styled.p`
  color: #bbbbbb;
  font-size: 12px;
`;

export const Content = styled.div`
  word-break: break-all;
`;

export const Button = styled.span`
  &:hover {
    cursor: pointer;
  }
`;
