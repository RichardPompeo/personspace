import { styled } from "styled-components";

interface PrimaryButtonProps {
  color?: string;
  size?: "large" | "middle" | "small";
}

export const PrimaryButton = styled.button<PrimaryButtonProps>`
  cursor: pointer;
  padding: ${(props) =>
    (props.size === "large" && "1.3em 2.6em") ||
    ((props.size === "middle" || !props.size) && "0.8em 2em") ||
    (props.size === "small" && "0.6em 1em")};
  color: ${({ theme }) => theme.COLORS.DEFAULT_TWO};
  font-size: clamp(10pt, 2vw, 12pt);
  font-weight: 600;
  border: 2px solid ${({ theme }) => theme.COLORS.DEFAULT_TWO};
  box-shadow: 4px 5px ${({ theme }) => theme.COLORS.DEFAULT_TWO};
  border-radius: 10px;
  background-color: ${(props) => props.color};

  @media (max-width: 1600px) {
    font-size: clamp(9pt, 0.5vw, 10pt);
  }

  @media (max-width: 1200px) {
    padding: ${(props) =>
      (props.size === "large" && "1em 2em") ||
      ((props.size === "middle" || !props.size) && "0.7em 1.9em") ||
      (props.size === "small" && "0.5em 0.9em")};
    box-shadow: 2px 3px ${({ theme }) => theme.COLORS.DEFAULT_TWO};
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`;
