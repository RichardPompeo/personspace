import { Fragment, useState } from "react";
import { BsGearFill, BsFillBoxFill } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";

import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { LanguageSelector } from "../ui/language-selector";

export interface UtilityBarLabels {
  signIn: string;
  signUp: string;
  popoverTitle: string;
  popoverProfile: string;
  popoverLogout: string;
  openUserActions?: string;
  openProfileMenu?: string;
  changeLanguage?: string;
}

export interface UtilityBarProps {
  isLoggedIn: boolean;
  onSignInClick: () => void;
  onSignUpClick: () => void;
  onLogout?: () => void;
  onProfileClick?: () => void;
  userName?: string | null;
  userEmail?: string | null;
  labels: UtilityBarLabels;
}

export const UtilityBar = ({
  isLoggedIn,
  onSignInClick,
  onSignUpClick,
  onLogout,
  onProfileClick,
  userName,
  userEmail,
  labels,
}: UtilityBarProps) => {
  const initials = userName?.charAt(0)?.toUpperCase() ?? "";
  const [desktopPopoverOpen, setDesktopPopoverOpen] = useState(false);

  const mobilePopoverContent = (
    <div className="flex w-52 flex-col items-stretch gap-3 text-sm text-text">
      {isLoggedIn ? (
        <Fragment>
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              className="h-12 w-12 rounded-full shadow-[0_10px_25px_-12px_rgba(142,181,240,0.6)] hover:shadow-[0_14px_28px_-12px_rgba(142,181,240,0.7)]"
            >
              <span className="text-lg font-bold uppercase">{initials}</span>
            </Button>
            <div className="space-y-1">
              <h3 className="text-base font-semibold">{userName}</h3>
              <p className="text-xs text-text/70">{userEmail}</p>
            </div>
          </div>
          <Button
            variant="secondary"
            onClick={() => onProfileClick?.()}
            className="w-full justify-center"
          >
            {labels.popoverProfile}
          </Button>
          <Button
            variant="destructive"
            onClick={() => onLogout?.()}
            className="w-full justify-center"
          >
            {labels.popoverLogout}
          </Button>
        </Fragment>
      ) : (
        <div className="flex flex-col gap-3 w-52">
          <Button
            variant="secondary"
            onClick={onSignInClick}
            className="w-full justify-center"
          >
            {labels.signIn}
          </Button>
          <Button onClick={onSignUpClick} className="w-full justify-center">
            {labels.signUp}
          </Button>
        </div>
      )}
    </div>
  );

  const desktopPopoverContent = (
    <div className="flex w-52 flex-col gap-1 text-sm text-text">
      <Button
        variant="ghost"
        onClick={() => onProfileClick?.()}
        className="h-auto justify-start gap-3 rounded-xl bg-transparent px-3 py-3 text-left hover:bg-accent/10 transition-colors duration-200"
      >
        <BsFillBoxFill size={18} className="text-accent" />
        <span>{labels.popoverProfile}</span>
      </Button>
      <div className="my-2 h-px bg-border" />
      <Button
        variant="ghost"
        onClick={() => onLogout?.()}
        className="h-auto justify-start gap-3 rounded-xl bg-transparent px-3 py-3 text-left text-danger hover:bg-danger/10 transition-colors duration-200"
      >
        <FaSignOutAlt size={18} />
        <span>{labels.popoverLogout}</span>
      </Button>
    </div>
  );

  return (
    <header className="relative flex items-center justify-end gap-4">
      <LanguageSelector
        className="hidden md:inline-flex"
        changeLanguageLabel={labels.changeLanguage}
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="md:hidden h-12 w-12 rounded-2xl shadow-[0_10px_25px_-12px_rgba(142,181,240,0.6)] hover:shadow-[0_14px_28px_-12px_rgba(142,181,240,0.7)]"
            aria-label={labels.openUserActions || "Open user actions"}
          >
            <BsGearFill size={20} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          side="bottom"
          className="flex w-60 max-w-[85vw] flex-col gap-4 rounded-2xl border border-white/10 bg-surface/95 p-4 shadow-xl backdrop-blur"
        >
          <div className="mb-2 text-sm font-semibold text-text">
            {labels.popoverTitle}
          </div>
          {mobilePopoverContent}
        </PopoverContent>
      </Popover>

      <div className="hidden items-center gap-3 md:flex">
        {isLoggedIn ? (
          <div
            className="relative"
            onMouseEnter={() => setDesktopPopoverOpen(true)}
            onMouseLeave={() => setDesktopPopoverOpen(false)}
          >
            <Popover
              open={desktopPopoverOpen}
              onOpenChange={setDesktopPopoverOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="default"
                  size="icon"
                  className="h-12 w-12 rounded-full shadow-[0_10px_25px_-12px_rgba(142,181,240,0.6)] hover:shadow-[0_14px_28px_-12px_rgba(142,181,240,0.7)] transition-shadow duration-200"
                  aria-label={labels.openProfileMenu || "Open profile menu"}
                >
                  <span className="text-lg font-bold uppercase">
                    {initials}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                side="bottom"
                className="w-64 rounded-2xl border border-white/10 bg-surface/95 p-4 shadow-2xl backdrop-blur"
                onMouseEnter={() => setDesktopPopoverOpen(true)}
                onMouseLeave={() => setDesktopPopoverOpen(false)}
              >
                <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-text/60">
                  {labels.popoverTitle}
                </div>
                {desktopPopoverContent}
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Fragment>
            <Button variant="secondary" onClick={onSignInClick}>
              {labels.signIn}
            </Button>
            <Button onClick={onSignUpClick}>{labels.signUp}</Button>
          </Fragment>
        )}
      </div>
    </header>
  );
};
