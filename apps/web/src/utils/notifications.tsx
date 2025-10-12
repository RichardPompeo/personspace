import { toast } from "ui";

type NotificationType = "success" | "info" | "warning" | "error";

export const sendNotification = (
  type: NotificationType,
  message: string,
  description: string
) => {
  const variant = type === "error" ? "destructive" : "default";

  toast({
    title: message,
    description,
    variant,
    duration: 5000,
  });
};
