import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import i18n from "@/i18n";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | number): {
  relative: string;
  absolute: string;
} {
  const now = new Date();
  const inputDate = new Date(date);
  const diffMs = now.getTime() - inputDate.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  const currentLanguage = i18n.language;

  // Format absolute date based on language
  const absoluteDate =
    currentLanguage === "pt"
      ? inputDate.toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : inputDate.toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

  // Format relative date with translations
  let relative: string;

  if (diffMinutes < 1) {
    relative = i18n.t("date.justNow");
  } else if (diffMinutes === 1) {
    relative = i18n.t("date.minuteAgo");
  } else if (diffMinutes < 60) {
    relative = i18n.t("date.minutesAgo", { count: diffMinutes });
  } else if (diffHours === 1) {
    relative = i18n.t("date.hourAgo");
  } else if (diffHours < 24) {
    relative = i18n.t("date.hoursAgo", { count: diffHours });
  } else if (diffDays === 1) {
    relative = i18n.t("date.yesterday");
  } else if (diffDays < 7) {
    relative = i18n.t("date.daysAgo", { count: diffDays });
  } else if (diffWeeks === 1) {
    relative = i18n.t("date.weekAgo");
  } else if (diffWeeks < 4) {
    relative = i18n.t("date.weeksAgo", { count: diffWeeks });
  } else if (diffMonths === 1) {
    relative = i18n.t("date.monthAgo");
  } else if (diffMonths < 12) {
    relative = i18n.t("date.monthsAgo", { count: diffMonths });
  } else if (diffYears === 1) {
    relative = i18n.t("date.yearAgo");
  } else {
    relative = i18n.t("date.yearsAgo", { count: diffYears });
  }

  return {
    relative,
    absolute: absoluteDate,
  };
}
