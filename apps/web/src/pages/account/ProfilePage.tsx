import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "ui";
import { useAuth } from "@/hooks/useAuth";

const ProfilePage = () => {
  const { t } = useTranslation();
  const { user, firebaseUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            {t("profile.title")}
          </h1>
          <p className="mt-2 text-muted-foreground">{t("profile.subtitle")}</p>
        </div>

        <div className="space-y-6">
          {/* User Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>{t("profile.accountInformation")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="block text-sm font-medium">
                  {t("profile.displayName")}
                </div>
                <p className="mt-1 text-muted-foreground">
                  {user?.displayName || t("profile.notSet")}
                </p>
              </div>
              <div>
                <div className="block text-sm font-medium">
                  {t("profile.email")}
                </div>
                <p className="mt-1 text-muted-foreground">
                  {user?.email ||
                    firebaseUser?.email ||
                    t("profile.notAvailable")}
                </p>
              </div>
              <div>
                <div className="block text-sm font-medium">
                  {t("profile.accountCreated")}
                </div>
                <p className="mt-1 text-muted-foreground">
                  {firebaseUser?.metadata.creationTime
                    ? new Date(
                        firebaseUser.metadata.creationTime,
                      ).toLocaleString()
                    : t("profile.notAvailable")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>{t("profile.actions")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">
                  {t("profile.signOutTitle")}
                </h3>
                <CardDescription className="mt-1">
                  {t("profile.signOutDescription")}
                </CardDescription>
                <Button
                  onClick={handleLogout}
                  variant="secondary"
                  className="mt-2"
                >
                  {t("profile.signOutButton")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
