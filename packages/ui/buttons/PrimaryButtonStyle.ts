import { styled, keyframes } from "styled-components";

interface PrimaryButtonProps {
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

export const PrimaryButtonStyle = styled.button<PrimaryButtonProps>`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
  background-color: ${({ color, loading }) => (loading ? "#4f80ca" : color)};
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
    box-shadow: 2px 3px ${({ theme }) => theme.COLORS.DEFAULT_TWO};
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;
