import { useContext, useMemo, useState } from "react";
import clsx from "clsx";
import { Outlet } from "react-router";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client/react";
import { AiFillBulb } from "react-icons/ai";
import { IoCalendar } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { MdHelpCenter, MdViewAgenda } from "react-icons/md";
import { RiContactsBook2Fill, RiEdit2Fill, RiHome3Fill } from "react-icons/ri";
import { TfiMenuAlt } from "react-icons/tfi";

import {
  SidebarNav,
  UtilityBar,
  SignInModal,
  SignUpModal,
  Button,
  type NavSection,
} from "ui";

import { LayoutContext } from "@/contexts/LayoutProvider";
import { AuthContext } from "@/contexts/AuthProvider";
import SIGN_IN_WITH_EMAIL_AND_PASSWORD_MUTATION from "@/graphql/signInWithEmailAndPassword";
import SIGN_UP_WITH_EMAIL_AND_PASSWORD_MUTATION from "@/graphql/signUpWithEmailAndPassword";
import type {
  SignInWithEmailAndPasswordData,
  SignInWithEmailAndPasswordVariables,
  SignUpWithEmailAndPasswordData,
  SignUpWithEmailAndPasswordVariables,
} from "@/graphql/types";
import logo from "@/assets/personspace-logo.svg";
import { sendNotification } from "@/utils/notifications";

const RootLayout = () => {
  const { isMenuOpen, toggleMenu } = useContext(LayoutContext);
  const { isLogged, user, refresh, logout } = useContext(AuthContext);
  const { t } = useTranslation();

  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const [signIn, { loading: signingIn }] = useMutation<
    SignInWithEmailAndPasswordData,
    SignInWithEmailAndPasswordVariables
  >(SIGN_IN_WITH_EMAIL_AND_PASSWORD_MUTATION);

  const [signUp, { loading: signingUp }] = useMutation<
    SignUpWithEmailAndPasswordData,
    SignUpWithEmailAndPasswordVariables
  >(SIGN_UP_WITH_EMAIL_AND_PASSWORD_MUTATION);

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
    [t]
  );

  const utilityLabels = useMemo(
    () => ({
      signIn: t("utility.signInButton"),
      signUp: t("utility.signUpButton"),
      popoverTitle: t("utility.popover.title"),
      popoverProfile: t("utility.popover.profile"),
      popoverAccount: t("utility.popover.account"),
      popoverLogout: t("utility.popover.logoutButton"),
    }),
    [t]
  );

  const signInLabels = useMemo(
    () => ({
      title: t("utility.signInModal.title"),
      subtitle: t("utility.signInModal.subTitle"),
      emailPlaceholder: t("utility.emailPlaceholder"),
      passwordPlaceholder: t("utility.passwordPlaceholder"),
      submitCta: t("utility.signInModal.loginButton"),
    }),
    [t]
  );

  const signUpLabels = useMemo(
    () => ({
      title: t("utility.signUpModal.title"),
      subtitle: t("utility.signUpModal.subTitle"),
      namePlaceholder: t("utility.signUpModal.namePlaceholder"),
      emailPlaceholder: t("utility.emailPlaceholder"),
      passwordPlaceholder: t("utility.passwordPlaceholder"),
      submitCta: t("utility.signUpModal.registerButton"),
    }),
    [t]
  );

  const toggleLabel = isMenuOpen
    ? t("navbar.hideMenu", { defaultValue: "Close navigation" })
    : t("navbar.showMenu", { defaultValue: "Open navigation" });

  const handleSignIn = async ({ email, password }: { email: string; password: string }) => {
    try {
      const { data } = await signIn({
        variables: {
          input: {
            email,
            password,
          },
        },
      });

      const result = data?.signInWithEmailAndPassword;

      if (result?.success && result.user) {
        localStorage.setItem("idToken", result.user.idToken);
        await refresh();

        sendNotification(
          "success",
          t("utility.signInModal.notification.success.title"),
          t("utility.signInModal.notification.success.description")
        );

        setIsSignInOpen(false);
        return;
      }

      sendNotification(
        "error",
        t("utility.signInModal.notification.error.title"),
        t("utility.signInModal.notification.error.description")
      );
    } catch (error) {
      console.error("Failed to sign in", error);
      sendNotification(
        "error",
        t("utility.signInModal.notification.error.title"),
        t("utility.signInModal.notification.error.description")
      );
    }
  };

  const handleSignUp = async ({
    displayName,
    email,
    password,
  }: {
    displayName: string;
    email: string;
    password: string;
  }) => {
    try {
      const { data } = await signUp({
        variables: {
          input: {
            displayName,
            email,
            password,
          },
        },
      });

      const result = data?.signUpWithEmailAndPassword;

      if (result?.success) {
        sendNotification(
          "success",
          t("utility.signUpModal.notification.success.title"),
          t("utility.signUpModal.notification.success.description")
        );
        setIsSignUpOpen(false);
        return;
      }

      sendNotification(
        "error",
        t("utility.signUpModal.notification.error.title"),
        t("utility.signUpModal.notification.error.description")
      );
    } catch (error) {
      console.error("Failed to sign up", error);
      sendNotification(
        "error",
        t("utility.signUpModal.notification.error.title"),
        t("utility.signUpModal.notification.error.description")
      );
    }
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
          isMenuOpen ? "md:pl-[18rem]" : "md:pl-8"
        )}
      >
        <div className="sticky top-0 z-30 flex items-center justify-end bg-background/95 px-4 py-4 backdrop-blur md:px-8">
          <UtilityBar
            isLoggedIn={isLogged}
            onSignInClick={() => setIsSignInOpen(true)}
            onSignUpClick={() => setIsSignUpOpen(true)}
            onLogout={logout}
            userName={user?.displayName ?? null}
            userEmail={user?.email ?? null}
            labels={utilityLabels}
          />
        </div>
        <main className="flex-1 overflow-hidden">
          <div className="h-full w-full overflow-hidden">
            <Outlet />
          </div>
        </main>
      </div>

      <SignInModal
        open={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSubmit={handleSignIn}
        loading={signingIn}
        labels={signInLabels}
      />

      <SignUpModal
        open={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSubmit={handleSignUp}
        loading={signingUp}
        labels={signUpLabels}
      />
    </div>
  );
};

export default RootLayout;
