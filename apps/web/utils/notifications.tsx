import { notification } from "antd";
import { IoIosCloseCircle } from "react-icons/io";

type NotificationType = "success" | "info" | "warning" | "error";

export const sendNotification = (
  type: NotificationType,
  message: string,
  description: string
) => {
  return notification.open({
    type,
    message: <h4>{message}</h4>,
    description: description,
    placement: "topLeft",
    closeIcon: <IoIosCloseCircle size={24} />,
    style: {
      backgroundColor:
        type === "success"
          ? "#008000"
          : type === "error"
          ? "#FF0000"
          : type === "info"
          ? "blue"
          : "yellow",
      color: "#FFFFFFFF",
      borderRadius: "10px",
    },
  });
};
