import { styled } from "styled-components";

import { ProfileButton } from "ui";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;
  padding-right: 1.5em;
`;

export const LeftSide = styled.div`
  gap: 10px;
  display: flex;
  align-items: top;
`;

export const RightSide = styled.div`
  gap: 10px;
  display: flex;
  align-items: top;
  white-space: nowrap;
`;

export const ProfileBadge = styled(ProfileButton)`
  min-width: 35px;
  min-height: 35px;
  width: 35px;
  height: 35px;
  cursor: default;
`;

export const Name = styled.h1`
  font-size: 16px;
`;

export const Message = styled.p`
  color: #bbbbbb;
  font-size: 12px;
  padding: 5px 5px 5px 0;
`;

export const Content = styled.div`
  word-break: break-all;
`;

export const Time = styled.p`
  color: gray;
  word-wrap: normal;
  font-size: 12px;
`;

export const Badge = styled.p`
  padding: 4px;
  color: #bbbbbb;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
  font-size: 10px;
  text-transform: uppercase;
  height: 18px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
