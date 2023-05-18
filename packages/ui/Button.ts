import { styled } from "styled-components";

interface OverlayButtonProps {
  setPosition: string;
  setIndex: string;
  setMarginSize: string;
};

interface CustomButtonProps {
  setPadding: string;
  setBackgroundColor: string;
  setFontSize: string;
};

export const OverlayButton = styled.button<OverlayButtonProps>`
  position: ${(props) => props.setPosition}; 
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${(props) => props.setIndex};
  cursor: pointer;
  padding: 12px;
  margin: ${(props) => props.setMarginSize};
  border-radius: 50%;
  background-color: rgba(142, 181, 240, 0.1);

  &:hover {
    background-color: ${({ theme }) => theme.COLORS.DEFAULT};

    svg {
      fill: ${({ theme }) => theme.COLORS.DEFAULT_TWO};
    }
  };

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

export const CustomDefaultButton = styled.button<CustomButtonProps>`
  cursor: pointer;
  padding: ${(props) => props.setPadding}; 
  color: ${({ theme }) => theme.COLORS.DEFAULT_TWO};
  font-size: ${(props) => props.setFontSize};
  border: 2px solid ${({ theme }) => theme.COLORS.DEFAULT_TWO};
  box-shadow: 4px 5px;
  border-radius: 10px;
  background-color: ${(props) => props.setBackgroundColor};
`;