import React, { ReactNode } from "react";
import { VscLoading } from "react-icons/vsc";

import { SecondaryButtonStyle } from "./SecondaryButtonStyle";

interface SecondaryButtonProps {
  children: ReactNode;
  size?: "large" | "middle" | "small";
  color?: string;
  loading?: boolean;
  icon?: any;
  onClick?: () => void;
}

export const SecondaryButton = (props: SecondaryButtonProps) => {
  return (
    <SecondaryButtonStyle
      onClick={props.onClick}
      color={props.color}
      size={props.size}
      disabled={props.loading}
      loading={props.loading}
    >
      {props.loading ? <VscLoading fill="#000000" /> : props.icon && props.icon}
      {props.children}
    </SecondaryButtonStyle>
  );
};
