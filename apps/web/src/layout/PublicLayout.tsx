import { useTranslation } from "react-i18next";
import { Outlet, Link, useLocation } from "react-router";
import { Languages } from "lucide-react";

import { Button } from "ui";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/personspace-logo.svg";

const PublicLayout = () => {
  const { t, i18n } = useTranslation();
  const { isLogged } = useAuth();
  const location = useLocation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "pt" : "en";
    i18n.changeLanguage(newLang);
  };

  const currentLanguage = i18n.language === "en" ? "EN" : "PT";

  const isHomePage = location.pathname === "/";

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="Personspace" className="h-8 w-8" />
            <span className="text-xl font-semibold">
              {t("navbar.personspace")}
            </span>
          </Link>

          <div className="flex items-center gap-2">
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

            {isHomePage && (
              <>
                {!isLogged ? (
                  <>
                    <Link to="/login">
                      <Button variant="ghost" size="sm">
                        {t("auth.signIn")}
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button size="sm">{t("auth.signUp")}</Button>
                    </Link>
                  </>
                ) : (
                  <Link to="/dashboard">
                    <Button size="sm">Dashboard</Button>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer - only show on home page */}
      {isHomePage && (
        <footer className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Brand */}
              <div className="space-y-4">
                <Link to="/" className="flex items-center space-x-3">
                  <img src={logo} alt="Personspace" className="h-8 w-8" />
                  <span className="text-xl font-semibold">
                    {t("navbar.personspace")}
                  </span>
                </Link>
                <p className="text-sm text-muted-foreground">
                  {t("landing.footer.tagline")}
                </p>
              </div>

              {/* Product */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold">
                  {t("landing.footer.product")}
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      to="#features"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {t("landing.footer.features")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#about"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {t("landing.footer.about")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {t("landing.footer.getStarted")}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold">
                  {t("landing.footer.company")}
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      to="#about"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {t("landing.footer.aboutUs")}
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold">
                  {t("landing.footer.legal")}
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      to="/privacy"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {t("auth.privacyPolicy")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {t("auth.termsOfService")}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
              <p>
                © {new Date().getFullYear()} Personspace.{" "}
                {t("landing.footer.rights")}
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default PublicLayout;
