import * as React from "react";
import { User, ChevronDown, LogOut, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

export interface UtilityBarProps {
  isLoggedIn: boolean;
  onSignInClick: () => void;
  onSignUpClick: () => void;
  onLogout: () => void;
  onProfileClick: () => void;
  userName?: string | null;
  userEmail?: string | null;
  labels: {
    signIn: string;
    signUp: string;
    popoverTitle: string;
    popoverProfile: string;
    popoverLogout: string;
    openUserActions: string;
    openProfileMenu: string;
    changeLanguage?: string;
  };
  className?: string;
}

const UtilityBar = React.forwardRef<HTMLDivElement, UtilityBarProps>(
  (
    {
      isLoggedIn,
      onSignInClick,
      onSignUpClick,
      onLogout,
      onProfileClick,
      userName,
      userEmail,
      labels,
      className,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);

    if (!isLoggedIn) {
      return (
        <div ref={ref} className={cn("flex items-center gap-2", className)}>
          <Button variant="ghost" size="sm" onClick={onSignInClick}>
            {labels.signIn}
          </Button>
          <Button variant="default" size="sm" onClick={onSignUpClick}>
            {labels.signUp}
          </Button>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("flex items-center gap-2", className)}>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
              aria-label={labels.openUserActions}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <User className="h-4 w-4" />
              </div>
              <span className="hidden md:inline-block">
                {userName || userEmail || "User"}
              </span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>{labels.popoverTitle}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {userName && (
                <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate font-medium">{userName}</p>
                    {userEmail && (
                      <p className="truncate text-sm text-muted-foreground">
                        {userEmail}
                      </p>
                    )}
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    onProfileClick();
                    setIsOpen(false);
                  }}
                >
                  <UserCircle className="h-4 w-4" />
                  {labels.popoverProfile}
                </Button>
                <Button
                  variant="destructive"
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  {labels.popoverLogout}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
);

UtilityBar.displayName = "UtilityBar";

export { UtilityBar };
