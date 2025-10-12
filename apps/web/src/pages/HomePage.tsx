import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router";

import { Button } from "ui";
import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "@/components/LoadingSpinner";
import abstract from "@/assets/abstract.svg";

const HomePage = () => {
  const { t } = useTranslation();
  const { isLogged, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isLogged) {
    // Authenticated user view
    return (
      <section className="relative isolate flex h-full w-full flex-col items-center justify-center overflow-hidden bg-background px-6 text-text lg:flex-row lg:gap-28 lg:px-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-radial opacity-25" />
        <div className="relative z-10 max-w-xl space-y-8 text-center lg:text-left">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Welcome back,{" "}
            <span className="text-accent">{user?.displayName || "User"}</span>!
          </h1>
          <p className="text-lg text-text-dim sm:text-xl">
            Ready to explore your personal space? Access your saved data and
            continue where you left off.
          </p>
          <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-start">
            <Link to="/profile">
              <Button size="lg" className="w-full sm:w-auto">
                View Profile
              </Button>
            </Link>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              Explore Features
            </Button>
          </div>
        </div>
        <div className="relative z-10 mt-10 max-w-[22rem] lg:mt-0 lg:max-w-none">
          <div className="pointer-events-none absolute inset-0 rounded-full bg-accent/12 blur-3xl" />
          <img
            src={abstract}
            alt="Abstract illustration"
            className="relative hidden max-h-[28rem] w-full max-w-[28rem] drop-shadow-[0_30px_60px_rgba(142,181,240,0.25)] lg:block"
          />
        </div>
      </section>
    );
  }

  // Unauthenticated user view
  return (
    <section className="relative isolate flex h-full w-full flex-col items-center justify-center overflow-hidden bg-background px-6 text-text lg:flex-row lg:gap-28 lg:px-20">
      <div className="pointer-events-none absolute inset-0 bg-grid-radial opacity-25" />
      <div className="relative z-10 max-w-xl space-y-8 text-center lg:text-left">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          <Trans
            i18nKey="home.title"
            components={{ 0: <span className="text-accent" /> }}
          >
            {t("home.title")}
          </Trans>
        </h1>
        <p className="text-lg text-text-dim sm:text-xl">{t("home.subtitle")}</p>
        <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-start">
          <Link to="/register">
            <Button size="lg" className="w-full sm:w-auto">
              Get Started
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
      <div className="relative z-10 mt-10 max-w-[22rem] lg:mt-0 lg:max-w-none">
        <div className="pointer-events-none absolute inset-0 rounded-full bg-accent/12 blur-3xl" />
        <img
          src={abstract}
          alt="Abstract illustration"
          className="relative hidden max-h-[28rem] w-full max-w-[28rem] drop-shadow-[0_30px_60px_rgba(142,181,240,0.25)] lg:block"
        />
      </div>
    </section>
  );
};

export default HomePage;
