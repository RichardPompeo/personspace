import { useContext, useMemo } from "react";
import clsx from "clsx";
import { Outlet, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { AiFillBulb } from "react-icons/ai";
import { IoCalendar } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { MdHelpCenter, MdViewAgenda } from "react-icons/md";
import { RiContactsBook2Fill, RiEdit2Fill, RiHome3Fill } from "react-icons/ri";
import { TfiMenuAlt } from "react-icons/tfi";

import { SidebarNav, UtilityBar, Button, type NavSection } from "ui";

import { LayoutContext } from "@/contexts/LayoutProvider";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/personspace-logo.svg";

const RootLayout = () => {
  const { isMenuOpen, toggleMenu } = useContext(LayoutContext);
  const { isLogged, user, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navSections = useMemo<NavSection[]>(
    () => [
      {
        id: "pages",
        title: t("navbar.pages"),
        items: [
          {
            id: "home",
            label: t("navbar.home"),
            icon: <RiHome3Fill size={18} />,
            to: "/",
          },
          {
            id: "about",
            label: t("navbar.about"),
            icon: <AiFillBulb size={18} />,
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
            icon: <RiEdit2Fill size={18} />,
            to: "#annotation",
          },
          {
            id: "calendar",
            label: t("navbar.calendar"),
            icon: <IoCalendar size={18} />,
            to: "#calendar",
          },
          {
            id: "contacts",
            label: t("navbar.contacts"),
            icon: <RiContactsBook2Fill size={18} />,
            to: "#contacts",
          },
          {
            id: "schedule",
            label: t("navbar.schedule"),
            icon: <MdViewAgenda size={18} />,
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
            icon: <MdHelpCenter size={18} />,
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
      changeLanguage: t("utility.language.changeLanguage"),
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
    <div className="relative flex min-h-screen bg-background text-text">
      <Button
        variant="default"
        size="icon"
        aria-label={toggleLabel}
        onClick={toggleMenu}
        className="fixed left-4 top-4 z-50 h-11 w-11 rounded-full shadow-[0_12px_28px_-12px_rgba(142,181,240,0.65)] hover:shadow-[0_16px_32px_-12px_rgba(142,181,240,0.75)]"
      >
        {isMenuOpen ? <IoMdClose size={20} /> : <TfiMenuAlt size={20} />}
      </Button>
      <SidebarNav
        isOpen={isMenuOpen}
        brand={{ logoSrc: logo, label: t("navbar.personspace") }}
        sections={navSections}
      />
      <div
        className={clsx(
          "flex min-h-screen w-full flex-col transition-all duration-300",
          isMenuOpen ? "md:pl-[18rem]" : "md:pl-8",
        )}
      >
        <div className="sticky top-0 z-30 flex items-center justify-end bg-background px-4 py-4 md:px-8">
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
