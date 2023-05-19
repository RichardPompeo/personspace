import { styled } from "styled-components";

interface OverlayButtonProps {
  setPosition: string;
  setIndex: string;
  setMarginSize: string;
};

interface CustomPrimaryButtonProps {
  setPadding: string;
  setBackgroundColor: string;
  setFontSize?: string;
  setFontWeight?: string;
  setResFontSize?: string;
  setResPadding: string;
  setWidth?: string;
};

interface CustomSecondaryButtonProps {
  setColor?: string;
  setColorBorder?: string;
  setBoxShadow?: string;
  setBackgroundColor?: string;
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

export const CustomPrimaryButton = styled.button<CustomPrimaryButtonProps>`
  cursor: pointer;
  padding: ${(props) => props.setPadding}; 
  color: ${({ theme }) => theme.COLORS.DEFAULT_TWO};
  font-size: ${(props) => props.setFontSize};
  font-weight: ${(props) => props.setFontWeight};
  border: 2px solid ${({ theme }) => theme.COLORS.DEFAULT_TWO};
  box-shadow: 4px 5px ${({ theme }) => theme.COLORS.DEFAULT_TWO};
  border-radius: 10px;
  background-color: ${(props) => props.setBackgroundColor};

  @media (max-width: 1600px) {
    font-size: ${(props) => props.setResFontSize};
  }

  @media (max-width: 1200px) {
    padding: ${(props) => props.setResPadding};
    box-shadow: 2px 3px ${({ theme }) => theme.COLORS.DEFAULT_TWO};
  }

  @media (max-width: 800px) {
    width: ${(props) => props.setWidth};
  }
`;
export const CustomSecondaryButton = styled.button<CustomSecondaryButtonProps>`
  cursor: pointer;
  padding: 0.9em 2em;
  color: ${(props) => props.setColor};
  border: 2px solid ${(props) => props.setColorBorder};
  border-radius: 10px;
  box-shadow: ${(props) => props.setBoxShadow};
  background-color: ${(props) => props.setBackgroundColor};

  @media (max-width: 1200px) {
    padding: 0.6em 1.6em;
    box-shadow:  ${(props) => props.setBoxShadow};
  };
`;