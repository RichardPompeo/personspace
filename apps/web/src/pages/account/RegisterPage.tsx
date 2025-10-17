import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useLocation } from "react-router";
import { FirebaseError } from "firebase/app";

import { Button, Input, Label, Alert, AlertDescription } from "ui";
import { useAuth } from "@/hooks/useAuth";

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { signUp } = useAuth();

  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  const validateForm = () => {
    if (!formData.displayName.trim()) {
      setError(t("auth.errors.displayNameRequired"));
      return false;
    }

    if (!formData.email.trim()) {
      setError(t("auth.errors.emailRequired"));
      return false;
    }

    if (formData.password.length < 6) {
      setError(t("auth.errors.passwordTooShort"));
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t("auth.errors.passwordsDoNotMatch"));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      await signUp(formData.email, formData.password, formData.displayName);

      // Redirect to the page user was trying to access, or notes
      const from = location.state?.from?.pathname || "/notes";
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Registration error:", error);

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setError(t("auth.errors.emailAlreadyInUse"));
            break;
          case "auth/invalid-email":
            setError(t("auth.errors.invalidEmail"));
            break;
          case "auth/operation-not-allowed":
            setError(t("auth.errors.operationNotAllowed"));
            break;
          case "auth/weak-password":
            setError(t("auth.errors.weakPassword"));
            break;
          default:
            setError(t("auth.errors.registrationFailed"));
        }
      } else {
        setError(t("auth.errors.registrationFailed"));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          {t("auth.createAccount")}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("auth.alreadyHaveAccount")}{" "}
          <Link
            to="/login"
            className="font-medium text-primary transition-colors hover:text-primary/80"
          >
            {t("auth.signIn")}
          </Link>
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">{t("auth.displayName")}</Label>
            <Input
              id="displayName"
              name="displayName"
              type="text"
              autoComplete="name"
              required
              placeholder={t("auth.displayNamePlaceholder")}
              value={formData.displayName}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="h-11"
            />
          </div>

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
            <Label htmlFor="password">{t("auth.password")}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder={t("auth.passwordPlaceholder")}
              value={formData.password}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="h-11"
            />
            <p className="text-xs text-muted-foreground">
              {t("auth.passwordRequirement")}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t("auth.confirmPassword")}</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              placeholder={t("auth.confirmPasswordPlaceholder")}
              value={formData.confirmPassword}
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
              {t("auth.creatingAccount")}
            </>
          ) : (
            t("auth.signUp")
          )}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          {t("auth.bySigningUp")}{" "}
          <Link
            to="/terms"
            className="text-primary transition-colors hover:text-primary/80"
          >
            {t("auth.termsOfService")}
          </Link>{" "}
          {t("auth.and")}{" "}
          <Link
            to="/privacy"
            className="text-primary transition-colors hover:text-primary/80"
          >
            {t("auth.privacyPolicy")}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
