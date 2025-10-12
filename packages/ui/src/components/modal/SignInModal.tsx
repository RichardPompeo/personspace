import { useEffect, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { IoMdClose } from "react-icons/io";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";

export interface SignInModalLabels {
  title: string;
  subtitle: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  submitCta: string;
}

export interface SignInModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: { email: string; password: string }) => Promise<void> | void;
  loading?: boolean;
  labels: SignInModalLabels;
}

export const SignInModal = ({
  open,
  onClose,
  onSubmit,
  loading = false,
  labels,
}: SignInModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!open) {
      setEmail("");
      setPassword("");
    }
  }, [open]);

  const handleSubmit = async () => {
    await onSubmit({ email, password });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose();
        }
      }}
    >
      <DialogContent className="relative border border-white/10 bg-surface text-text">
        <DialogClose
          className="absolute right-6 top-6 text-text/50 transition hover:text-text"
          aria-label="Close dialog"
        >
          <IoMdClose size={22} />
        </DialogClose>
        <DialogHeader className="space-y-3 text-center sm:text-left">
          <DialogTitle className="text-3xl font-extrabold text-accent">
            {labels.title}
          </DialogTitle>
          <DialogDescription className="text-base text-text-dim">
            {labels.subtitle}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-left">
          <Input
            type="email"
            placeholder={labels.emailPlaceholder}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            type="password"
            placeholder={labels.passwordPlaceholder}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <DialogFooter className="mt-6 w-full sm:flex-row sm:gap-4">
          <Button
            size="lg"
            className="w-full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <VscLoading className="h-4 w-4 animate-spin" />
                {labels.submitCta}
              </span>
            ) : (
              labels.submitCta
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
