import { styled } from "styled-components";

interface SecondaryButtonProps {
  color?: string;
  size?: "large" | "middle" | "small";
}

export const SecondaryButton = styled.button<SecondaryButtonProps>`
  cursor: pointer;
  padding: ${(props) =>
    (props.size === "large" && "1.3em 2.6em") ||
    ((props.size === "middle" || !props.size) && "0.8em 2em") ||
    (props.size === "small" && "0.6em 1em")};
  color: ${({ theme }) => theme.COLORS.DEFAULT};
  font-size: clamp(10pt, 2vw, 12pt);
  border: 2px solid ${({ theme }) => theme.COLORS.PRIMARY};
  border-radius: 10px;
  box-shadow: none;
  background-color: ${(props) => props.color};

  @media (max-width: 1600px) {
    font-size: clamp(9pt, 0.5vw, 10pt);
  }

  @media (max-width: 1200px) {
    padding: ${(props) =>
      (props.size === "large" && "1em 2em") ||
      ((props.size === "middle" || !props.size) && "0.7em 1.9em") ||
      (props.size === "small" && "0.5em 0.9em")};
    box-shadow: none;
  }
`;
