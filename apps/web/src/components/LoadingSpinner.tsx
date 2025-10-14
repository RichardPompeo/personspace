import { Spinner } from "ui";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const LoadingSpinner = ({
  message,
  size = "md",
  className = "",
}: LoadingSpinnerProps) => {
  return <Spinner size={size} label={message} className={className} />;
};

export default LoadingSpinner;
