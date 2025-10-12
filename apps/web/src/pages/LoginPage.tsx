import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useLocation } from "react-router";
import { FirebaseError } from "firebase/app";

import { Button } from "ui";
import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "@/components/LoadingSpinner";

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, loading, isLogged } = useAuth();

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

      // Redirect to the page user was trying to access, or home
      const from = location.state?.from?.pathname || "/";
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
            {t("auth.signIn")}
          </h2>
          <p className="mt-2 text-center text-sm text-text-dim">
            {t("auth.dontHaveAccount")}{" "}
            <Link
              to="/register"
              className="font-medium text-accent hover:text-accent/80"
            >
              {t("auth.signUp")}
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
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
                autoComplete="current-password"
                required
                className="relative block w-full rounded-lg border border-border bg-background px-3 py-3 text-text placeholder-text-dim focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent sm:text-sm"
                placeholder={t("auth.password")}
                value={formData.password}
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
                  {t("auth.signingIn")}
                </>
              ) : (
                t("auth.signIn")
              )}
            </Button>
          </div>

          <div className="text-center">
            <Link
              to="/forgot-password"
              className="text-sm text-accent hover:text-accent/80"
            >
              {t("auth.forgotPassword")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
