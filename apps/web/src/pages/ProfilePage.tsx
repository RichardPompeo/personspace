import { Button } from "ui";
import { useAuth } from "@/hooks/useAuth";

const ProfilePage = () => {
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
          <h1 className="text-3xl font-bold text-text">Profile</h1>
          <p className="mt-2 text-text-dim">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* User Information Card */}
          <div className="rounded-lg border border-border bg-background p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-text">
              Account Information
            </h2>
            <div className="space-y-4">
              <div>
                <div className="block text-sm font-medium text-text">
                  Display Name
                </div>
                <p className="mt-1 text-text-dim">
                  {user?.displayName || "Not set"}
                </p>
              </div>
              <div>
                <div className="block text-sm font-medium text-text">Email</div>
                <p className="mt-1 text-text-dim">
                  {user?.email || firebaseUser?.email || "Not available"}
                </p>
              </div>
              <div>
                <div className="block text-sm font-medium text-text">
                  Account Created
                </div>
                <p className="mt-1 text-text-dim">
                  {firebaseUser?.metadata.creationTime
                    ? new Date(
                        firebaseUser.metadata.creationTime,
                      ).toLocaleString()
                    : "Not available"}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="rounded-lg border border-border bg-background p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-text">Actions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-text">Sign Out</h3>
                <p className="mt-1 text-sm text-text-dim">
                  Sign out of your account on this device
                </p>
                <Button
                  onClick={handleLogout}
                  variant="secondary"
                  className="mt-2"
                >
                  Sign Out
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
