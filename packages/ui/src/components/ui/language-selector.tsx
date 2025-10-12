import { useState } from "react";
import { useTranslation } from "react-i18next";
import { RiGlobeFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";

import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
];

export interface LanguageSelectorProps {
  className?: string;
  changeLanguageLabel?: string;
}

export const LanguageSelector = ({
  className,
  changeLanguageLabel,
}: LanguageSelectorProps) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = async (languageCode: string) => {
    try {
      await i18n.changeLanguage(languageCode);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to change language:", error);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className={`h-12 w-12 rounded-full shadow-[0_10px_25px_-12px_rgba(142,181,240,0.6)] hover:shadow-[0_14px_28px_-12px_rgba(142,181,240,0.7)] ${className}`}
          aria-label={changeLanguageLabel || "Change language"}
        >
          <RiGlobeFill size={22} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        className="w-48 rounded-2xl border border-white/10 bg-surface/95 p-3 shadow-2xl backdrop-blur"
      >
        <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-text/60">
          {i18n.language === "pt" ? "Idioma" : "Language"}
        </div>
        <div className="space-y-1">
          {languages.map((language) => (
            <Button
              key={language.code}
              variant="ghost"
              onClick={() => handleLanguageChange(language.code)}
              className={`h-auto w-full justify-start gap-3 rounded-xl px-3 py-2 text-left hover:bg-accent/10 ${
                currentLanguage.code === language.code
                  ? "bg-accent/10 text-accent"
                  : "text-text"
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="flex-1">{language.name}</span>
              {currentLanguage.code === language.code && (
                <FaCheck size={14} className="text-accent" />
              )}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
