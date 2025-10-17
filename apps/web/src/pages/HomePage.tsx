import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
  FileText,
  Calendar,
  BookOpen,
  LayoutGrid,
  Shield,
  Zap,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { Button } from "ui";
import abstract from "@/assets/abstract.svg";

const HomePage = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: t("landing.features.notes.title"),
      description: t("landing.features.notes.description"),
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: t("landing.features.calendar.title"),
      description: t("landing.features.calendar.description"),
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: t("landing.features.contacts.title"),
      description: t("landing.features.contacts.description"),
    },
    {
      icon: <LayoutGrid className="h-6 w-6" />,
      title: t("landing.features.schedule.title"),
      description: t("landing.features.schedule.description"),
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t("landing.features.sharing.title"),
      description: t("landing.features.sharing.description"),
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t("landing.features.security.title"),
      description: t("landing.features.security.description"),
    },
  ];

  const benefits = [
    t("landing.benefits.organized"),
    t("landing.benefits.accessible"),
    t("landing.benefits.secure"),
    t("landing.benefits.collaborative"),
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 px-4 py-20 md:px-8 lg:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(142,181,240,0.1),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(142,181,240,0.08),transparent_50%)]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Text Content */}
            <div className="space-y-8 text-center lg:text-left">
              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <Trans
                  i18nKey="landing.hero.title"
                  components={{ 0: <span className="text-primary" /> }}
                >
                  {t("landing.hero.title")}
                </Trans>
              </h1>

              <p className="text-lg text-muted-foreground sm:text-xl md:text-2xl">
                {t("landing.hero.subtitle")}
              </p>

              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Link to="/register">
                  <Button size="lg" className="group w-full sm:w-auto">
                    {t("landing.hero.cta")}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    {t("auth.signIn")}
                  </Button>
                </Link>
              </div>

              {/* Benefits List */}
              <div className="grid gap-3 pt-4 sm:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-primary/10 blur-3xl" />
              <img
                src={abstract}
                alt="Personspace illustration"
                className="mx-auto w-full max-w-lg drop-shadow-2xl lg:max-w-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="scroll-mt-16 px-4 py-20 md:px-8 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {t("landing.features.title")}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t("landing.features.subtitle")}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Zap className="h-8 w-8 text-primary" />
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {t("landing.cta.title")}
            </h2>

            <p className="text-lg text-muted-foreground md:text-xl">
              {t("landing.cta.subtitle")}
            </p>

            <div className="flex flex-col items-center gap-4 pt-4 sm:justify-center">
              <Link to="/register">
                <Button size="lg" className="group w-full sm:w-auto">
                  {t("landing.cta.button")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">
                {t("landing.cta.note")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="scroll-mt-16 px-4 py-20 md:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {t("landing.about.title")}
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground pb-4">
                <p>{t("landing.about.description1")}</p>
                <p>{t("landing.about.description2")}</p>
                <p>{t("landing.about.description3")}</p>
              </div>

              <Link to="/register">
                <Button size="lg" className="group">
                  {t("landing.about.cta")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
