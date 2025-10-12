import { useTranslation } from "react-i18next";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LoadingSpinner = ({
  message,
  size = "md",
  className = ""
}: LoadingSpinnerProps) => {
  const { t } = useTranslation();

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const defaultMessage = t("common.loading");

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-accent border-t-transparent`}
      />
      {message !== undefined && (
        <p className="mt-4 text-sm text-text-dim">
          {message || defaultMessage}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
