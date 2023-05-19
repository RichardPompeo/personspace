import { styled } from "styled-components";

interface PrimaryButtonProps {
  color?: string;
}

export const PrimaryButton = styled.button<PrimaryButtonProps>`
  cursor: pointer;
  padding: 1.3em 2em;
  color: ${({ theme }) => theme.COLORS.DEFAULT_TWO};
  font-size: clamp(10pt, 1vw, 12pt);
  font-weight: 600;
  border: 2px solid ${({ theme }) => theme.COLORS.DEFAULT_TWO};
  box-shadow: 4px 5px ${({ theme }) => theme.COLORS.DEFAULT_TWO};
  border-radius: 10px;
  background-color: ${(props) => props.color};

  @media (max-width: 1600px) {
    font-size: clamp(9pt, 0.5vw, 10pt);
  }

  @media (max-width: 1200px) {
    padding: 0.9em 1em;
    box-shadow: 2px 3px ${({ theme }) => theme.COLORS.DEFAULT_TWO};
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`;
