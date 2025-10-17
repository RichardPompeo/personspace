import { useTranslation } from "react-i18next";
import { Outlet, Link } from "react-router";
import { Languages } from "lucide-react";

import { Button } from "ui";
import logo from "@/assets/personspace-logo.svg";

const AuthLayout = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "pt" : "en";
    i18n.changeLanguage(newLang);
  };

  const currentLanguage = i18n.language === "en" ? "EN" : "PT";

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header with Logo */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="Personspace" className="h-8 w-8" />
            <span className="text-xl font-semibold">
              {t("navbar.personspace")}
            </span>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-2"
            aria-label={t("utility.language.changeLanguage")}
          >
            <Languages className="h-4 w-4" />
            <span className="hidden sm:inline">{currentLanguage}</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Outlet />
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-border bg-muted/30 py-6">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Personspace.{" "}
            {t("landing.footer.rights")}
          </p>
          <div className="mt-2 flex justify-center gap-4">
            <Link
              to="/privacy"
              className="transition-colors hover:text-foreground"
            >
              {t("auth.privacyPolicy")}
            </Link>
            <span>•</span>
            <Link
              to="/terms"
              className="transition-colors hover:text-foreground"
            >
              {t("auth.termsOfService")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
