import { useTranslation } from "react-i18next";
import { useState, useRef, ChangeEvent, DragEvent } from "react";
import { useMutation } from "@apollo/client/react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "ui";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { uploadProfilePicture } from "@/lib/uploadProfilePicture";
import UPDATE_USER_MUTATION from "@/graphql/users/updateUser";
import type {
  UpdateUserData,
  UpdateUserVariables,
} from "@/graphql/users/types";

const ProfilePage = () => {
  const { t } = useTranslation();
  const { user, firebaseUser, logout, refresh } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [updateUser] = useMutation<UpdateUserData, UpdateUserVariables>(
    UPDATE_USER_MUTATION,
  );

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const handleFileSelect = async (file: File | null) => {
    if (!file || !user) return;

    setIsUploading(true);
    try {
      // Upload to Firebase Storage
      const avatarUrl = await uploadProfilePicture(file, user.id);

      // Update user in database
      const idToken = localStorage.getItem("idToken");
      await updateUser({
        variables: {
          input: { avatarUrl },
        },
        context: {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        },
      });

      // Refresh user data
      await refresh();

      toast.success(t("profile.pictureUpdated"));
    } catch (error) {
      console.error("Failed to upload profile picture:", error);
      toast.error(
        error instanceof Error ? error.message : t("profile.uploadError"),
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleFileSelect(file);
    // Reset input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileSelect(file);
    }
  };

  const handleRemovePicture = async () => {
    if (!user) return;

    setIsUploading(true);
    try {
      const idToken = localStorage.getItem("idToken");
      await updateUser({
        variables: {
          input: { avatarUrl: null },
        },
        context: {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        },
      });

      // Refresh user data
      await refresh();

      toast.success(t("profile.pictureRemoved"));
    } catch (error) {
      console.error("Failed to remove profile picture:", error);
      toast.error(t("profile.updateError"));
    } finally {
      setIsUploading(false);
    }
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
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
          {/* Profile Picture Card */}
          <Card>
            <CardHeader>
              <CardTitle>{t("profile.profilePicture")}</CardTitle>
              <CardDescription>{t("profile.supportedFormats")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                {/* Avatar Display */}
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={user?.avatarUrl || undefined}
                    alt={user?.displayName || "User"}
                  />
                  <AvatarFallback className="text-2xl">
                    {getInitials(user?.displayName)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-4">
                  <div
                    role="button"
                    tabIndex={0}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        fileInputRef.current?.click();
                      }
                    }}
                    className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
                      isDragging
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/25 hover:border-primary/50"
                    }`}
                  >
                    <p className="text-sm text-muted-foreground">
                      {t("profile.dragDropImage")}
                    </p>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleInputChange}
                    className="hidden"
                  />

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      variant="default"
                    >
                      {isUploading
                        ? t("profile.uploadingPicture")
                        : t("profile.uploadPicture")}
                    </Button>
                    {user?.avatarUrl && (
                      <Button
                        onClick={handleRemovePicture}
                        disabled={isUploading}
                        variant="outline"
                      >
                        {t("profile.removePicture")}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

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
