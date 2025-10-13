import { useContext, useMemo } from "react";
import clsx from "clsx";
import { Outlet, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Lightbulb,
  Calendar,
  X,
  HelpCircle,
  LayoutGrid,
  BookOpen,
  Edit,
  Home,
  Menu,
  Languages,
} from "lucide-react";

import { SidebarNav, UtilityBar, Button, type NavSection } from "ui";

import { LayoutContext } from "@/contexts/LayoutProvider";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/personspace-logo.svg";

const RootLayout = () => {
  const { isMenuOpen, toggleMenu } = useContext(LayoutContext);
  const { isLogged, user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "pt" : "en";
    i18n.changeLanguage(newLang);
  };

  const currentLanguage = i18n.language === "en" ? "EN" : "PT";

  const navSections = useMemo<NavSection[]>(
    () => [
      {
        id: "pages",
        title: t("navbar.pages"),
        items: [
          {
            id: "home",
            label: t("navbar.home"),
            icon: <Home size={18} />,
            to: "/",
          },
          {
            id: "about",
            label: t("navbar.about"),
            icon: <Lightbulb size={18} />,
            to: "#about",
          },
        ],
      },
      {
        id: "personal",
        title: t("navbar.personal"),
        items: [
          {
            id: "annotation",
            label: t("navbar.annotation"),
            icon: <Edit size={18} />,
            to: "/notes",
          },
          {
            id: "calendar",
            label: t("navbar.calendar"),
            icon: <Calendar size={18} />,
            to: "#calendar",
          },
          {
            id: "contacts",
            label: t("navbar.contacts"),
            icon: <BookOpen size={18} />,
            to: "#contacts",
          },
          {
            id: "schedule",
            label: t("navbar.schedule"),
            icon: <LayoutGrid size={18} />,
            to: "#schedule",
          },
        ],
      },
      {
        id: "central",
        title: t("navbar.central"),
        items: [
          {
            id: "help",
            label: t("navbar.helpMe"),
            icon: <HelpCircle size={18} />,
            to: "#help",
          },
        ],
      },
    ],
    [t],
  );

  const utilityLabels = useMemo(
    () => ({
      signIn: t("utility.signInButton"),
      signUp: t("utility.signUpButton"),
      popoverTitle: t("utility.popover.title"),
      popoverProfile: t("utility.popover.profile"),
      popoverLogout: t("utility.popover.logoutButton"),
      openUserActions: t("utility.accessibility.openUserActions"),
      openProfileMenu: t("utility.accessibility.openProfileMenu"),
    }),
    [t],
  );

  const toggleLabel = isMenuOpen ? t("navbar.hideMenu") : t("navbar.showMenu");

  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/register");
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="relative flex min-h-screen bg-background text-foreground">
      {/* Overlay for mobile */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
      <SidebarNav
        isOpen={isMenuOpen}
        brand={{ logoSrc: logo, label: t("navbar.personspace") }}
        sections={navSections}
        onClose={toggleMenu}
      />
      <div
        className={clsx(
          "flex min-h-screen w-full flex-col transition-all duration-300",
          isMenuOpen ? "md:pl-72" : "md:pl-0",
        )}
      >
        <div className="sticky top-0 z-30 flex items-center justify-between bg-background border-b border-border px-4 py-3 md:px-8">
          <Button
            variant="ghost"
            size="icon"
            aria-label={toggleLabel}
            onClick={toggleMenu}
            className="h-10 w-10"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
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
            <UtilityBar
              isLoggedIn={isLogged}
              onSignInClick={handleSignInClick}
              onSignUpClick={handleSignUpClick}
              onLogout={handleLogout}
              onProfileClick={handleProfileClick}
              userName={user?.displayName ?? null}
              userEmail={user?.email ?? null}
              labels={utilityLabels}
            />
          </div>
        </div>
        <main className="flex-1 overflow-hidden bg-background">
          <div className="h-full w-full overflow-hidden">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
