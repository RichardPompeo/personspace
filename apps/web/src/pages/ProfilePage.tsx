import { useTranslation } from "react-i18next";
import { Button } from "ui";
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
          <h1 className="text-3xl font-bold text-text">{t("profile.title")}</h1>
          <p className="mt-2 text-text-dim">{t("profile.subtitle")}</p>
        </div>

        <div className="space-y-6">
          {/* User Information Card */}
          <div className="rounded-lg border border-border bg-background p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-text">
              {t("profile.accountInformation")}
            </h2>
            <div className="space-y-4">
              <div>
                <div className="block text-sm font-medium text-text">
                  {t("profile.displayName")}
                </div>
                <p className="mt-1 text-text-dim">
                  {user?.displayName || t("profile.notSet")}
                </p>
              </div>
              <div>
                <div className="block text-sm font-medium text-text">
                  {t("profile.email")}
                </div>
                <p className="mt-1 text-text-dim">
                  {user?.email ||
                    firebaseUser?.email ||
                    t("profile.notAvailable")}
                </p>
              </div>
              <div>
                <div className="block text-sm font-medium text-text">
                  {t("profile.accountCreated")}
                </div>
                <p className="mt-1 text-text-dim">
                  {firebaseUser?.metadata.creationTime
                    ? new Date(
                        firebaseUser.metadata.creationTime,
                      ).toLocaleString()
                    : t("profile.notAvailable")}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="rounded-lg border border-border bg-background p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-text">
              {t("profile.actions")}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-text">
                  {t("profile.signOutTitle")}
                </h3>
                <p className="mt-1 text-sm text-text-dim">
                  {t("profile.signOutDescription")}
                </p>
                <Button
                  onClick={handleLogout}
                  variant="secondary"
                  className="mt-2"
                >
                  {t("profile.signOutButton")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
