import { styled } from "styled-components";

interface IconButtonProps {
  zIndex?: string;
  position?: string;
}

const shouldForwardIconProp = (prop: PropertyKey) =>
  !["zIndex", "position"].includes(String(prop));

export const IconButton = styled.button.withConfig({
  shouldForwardProp: shouldForwardIconProp,
})<IconButtonProps>`
  position: ${(props) => props.position};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${(props) => props.zIndex};
  cursor: pointer;
  padding: 12px;
  margin: 20px;
  border-radius: 50%;
  background-color: rgba(142, 181, 240, 0.1);

  &:hover {
    background-color: ${({ theme }) => theme.COLORS.DEFAULT};

    svg {
      fill: ${({ theme }) => theme.COLORS.DEFAULT_TWO};
    }
  }

  @media (max-width: 1200px) {
    padding: 13px;

    svg {
      font-size: 25px;
    }
  }
  @media (max-width: 700px) {
    padding: 13px;

    svg {
      font-size: 25px;
    }
  }
`;

export const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
  width: 47px;
  height: 47px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.COLORS.SECONDARY};

  span {
    font-size: 19pt;
    font-weight: 800;
    text-transform: uppercase;
    font-family: "Supreme", sans-serif;
    color: ${({ theme }) => theme.COLORS.DEFAULT_TWO};
  }

  @media (max-width: 900px) {
    margin-right: 12px;
  }
`;
