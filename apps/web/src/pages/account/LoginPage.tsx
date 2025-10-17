import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useLocation } from "react-router";
import { FirebaseError } from "firebase/app";

import {
  Button,
  Input,
  Label,
  Alert,
  AlertDescription,
  Card,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "ui";
import { useAuth } from "@/hooks/useAuth";

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, isLogged, loading, user } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await signIn(formData.email, formData.password);

      // Redirect to the page user was trying to access, or notes
      const from = location.state?.from?.pathname || "/notes";
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login error:", error);

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/user-not-found":
          case "auth/wrong-password":
            setError(t("auth.errors.invalidCredentials"));
            break;
          case "auth/invalid-email":
            setError(t("auth.errors.invalidEmail"));
            break;
          case "auth/user-disabled":
            setError(t("auth.errors.userDisabled"));
            break;
          case "auth/too-many-requests":
            setError(t("auth.errors.tooManyRequests"));
            break;
          default:
            setError(t("auth.errors.loginFailed"));
        }
      } else {
        setError(t("auth.errors.loginFailed"));
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          {t("auth.welcomeBack")}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("auth.dontHaveAccount")}{" "}
          <Link
            to="/register"
            className="font-medium text-primary transition-colors hover:text-primary/80"
          >
            {t("auth.signUp")}
          </Link>
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("auth.email")}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder={t("auth.emailPlaceholder")}
              value={formData.email}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Link
                to="/forgot-password"
                className="text-sm text-primary transition-colors hover:text-primary/80"
              >
                {t("auth.forgotPassword")}
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder={t("auth.passwordPlaceholder")}
              value={formData.password}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="h-11"
            />
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              {t("auth.signingIn")}
            </>
          ) : (
            t("auth.signIn")
          )}
        </Button>
      </form>

      {!loading && user && isLogged && (
        <div className="gap-3 flex flex-col">
          <p className="text-foreground">{t("auth.alreadySignedIn")}</p>
          <Card className="p-4 flex gap-3 items-center justify-betweeen">
            <div className="flex gap-3 w-full items-center">
              <Avatar>
                <AvatarImage
                  src={user.avatarUrl || undefined}
                  alt={user.displayName}
                />
                <AvatarFallback>{user.displayName[0]}</AvatarFallback>
              </Avatar>
              <p className="text-foreground">{user.displayName}</p>
            </div>
            <Button onClick={() => navigate("/dashboard")} variant="outline">
              {t("auth.continue")}
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
