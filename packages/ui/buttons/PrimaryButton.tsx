import React from "react";
import { VscLoading } from "react-icons/vsc";

import { PrimaryButtonStyle } from "./PrimaryButtonStyle";

interface PrimaryButtonProps {
  children: any;
  size?: "large" | "middle" | "small";
  color?: string;
  loading?: boolean;
  icon?: any;
  onClick: () => void;
}
export const PrimaryButton = (props: PrimaryButtonProps) => {
  return (
    <PrimaryButtonStyle
      onClick={props.onClick}
      color={props.color}
      size={props.size}
      disabled={props.loading}
      loading={props.loading}
    >
      {props.loading ? <VscLoading fill="#000000" /> : props.icon}
      {props.children}
    </PrimaryButtonStyle>
  );
};
