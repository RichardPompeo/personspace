import { styled } from "styled-components";

interface IconButtonProps {
  zIndex?: string;
  position?: string;
}

export const IconButton = styled.button<IconButtonProps>`
  position: ${(props) => props.position};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${(props) => props.zIndex};
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

  @media (max-width: 1200px) {
    padding: 10px;

    svg {
      font-size: 19px;
    }
  }
  @media (max-width: 700px) {
    padding: 9px;

    svg {
      font-size: 18px;
    }
  }
`;