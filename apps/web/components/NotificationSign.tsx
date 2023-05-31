type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const openNotificationSignUp = (type: NotificationType, t, api) => {
  api[type]({
    message: <h4>{type === "success" ? t("notificationSignUp.success.title") : t("notificationSignUp.error.title")}</h4>,
    description: type === "success" ? t("notificationSignUp.success.description") : t("notificationSignUp.error.description"),
    placement: "topLeft",
    style: {
      backgroundColor: type === "success" ? '#008000' : '#FF0000',
      color: '#FFFFFFFF',
      borderRadius: "10px"
    },
  });
};

export const openNotificationSignIn = (type: NotificationType, t, api) => {
  api[type]({
    message: <h4>{type === "success" ? t("notificationSignIn.success.title") : t("notificationSignIn.error.title")}</h4>,
    description: type === "success" ? t("notificationSignIn.success.description") : t("notificationSignIn.error.description"),
    placement: "topLeft",
    style: {
      backgroundColor: type === "success" ? '#008000' : '#FF0000',
      color: '#FFFFFFFF',
      borderRadius: "10px"
    },
  });
};