import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useLocation } from "react-router";
import { FirebaseError } from "firebase/app";

import { Button } from "ui";
import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "@/components/LoadingSpinner";

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { signUp, loading, isLogged } = useAuth();

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

      // Redirect to the page user was trying to access, or home
      const from = location.state?.from?.pathname || "/";
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

  // If already logged in, redirect to home or intended page
  if (isLogged) {
    const from = location.state?.from?.pathname || "/";
    navigate(from, { replace: true });
    return null;
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-text">
            {t("auth.signUp")}
          </h2>
          <p className="mt-2 text-center text-sm text-text-dim">
            {t("auth.alreadyHaveAccount")}{" "}
            <Link
              to="/login"
              className="font-medium text-accent hover:text-accent/80"
            >
              {t("auth.signIn")}
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="displayName" className="sr-only">
                {t("auth.displayName")}
              </label>
              <input
                id="displayName"
                name="displayName"
                type="text"
                autoComplete="name"
                required
                className="relative block w-full rounded-lg border border-border bg-background px-3 py-3 text-text placeholder-text-dim focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent sm:text-sm"
                placeholder={t("auth.displayName")}
                value={formData.displayName}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                {t("auth.email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-lg border border-border bg-background px-3 py-3 text-text placeholder-text-dim focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent sm:text-sm"
                placeholder={t("auth.email")}
                value={formData.email}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                {t("auth.password")}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="relative block w-full rounded-lg border border-border bg-background px-3 py-3 text-text placeholder-text-dim focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent sm:text-sm"
                placeholder={t("auth.password")}
                value={formData.password}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                {t("auth.confirmPassword")}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="relative block w-full rounded-lg border border-border bg-background px-3 py-3 text-text placeholder-text-dim focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent sm:text-sm"
                placeholder={t("auth.confirmPassword")}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-4">
              <div className="text-sm text-red-800">{error}</div>
            </div>
          )}

          <div>
            <Button
              type="submit"
              className="group relative flex w-full justify-center rounded-lg py-3 px-4 text-sm font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                  {t("auth.creatingAccount")}
                </>
              ) : (
                t("auth.signUp")
              )}
            </Button>
          </div>

          <div className="text-sm text-text-dim text-center">
            {t("auth.bySigningUp")}{" "}
            <Link to="/terms" className="text-accent hover:text-accent/80">
              {t("auth.termsOfService")}
            </Link>{" "}
            {t("auth.and")}{" "}
            <Link to="/privacy" className="text-accent hover:text-accent/80">
              {t("auth.privacyPolicy")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
