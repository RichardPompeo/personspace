import { styled, keyframes } from "styled-components";

interface SecondaryButtonProps {
  color?: string;
  loading?: boolean;
  size?: "large" | "middle" | "small";
}

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SecondaryButtonStyle = styled.button<SecondaryButtonProps>`
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
  display: flex;
  justify-content: center;

  svg {
    display: "flex";
    margin-right: 10px;
    animation: ${({ loading }) => loading && spinAnimation} 1s linear infinite;
  }

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
