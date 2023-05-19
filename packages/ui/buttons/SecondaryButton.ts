import { styled } from "styled-components";

interface SecondaryButtonProps {
  color?: string;
}

export const SecondaryButton = styled.button<SecondaryButtonProps>`
  cursor: pointer;
  padding: 0.9em 2em;
  color: ${({ theme }) => theme.COLORS.DEFAULT};
  border: 2px solid ${({ theme }) => theme.COLORS.PRIMARY};
  border-radius: 10px;
  box-shadow: none;
  background-color: ${(props) => props.color};

  @media (max-width: 1200px) {
    padding: 0.6em 1.6em;
    box-shadow: none;
  }
`;
