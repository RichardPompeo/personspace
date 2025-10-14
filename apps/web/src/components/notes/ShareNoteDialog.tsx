import { useCallback, useEffect, useRef, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { useTranslation } from "react-i18next";
import { Search, Forward } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  Button,
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  Kbd,
  Label,
  Card,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "ui";
import GET_USER_BY_EMAIL_QUERY from "@/graphql/users/getUserByEmailQuery";
import CREATE_NOTE_SHARE_MUTATION from "@/graphql/notes/createNoteShareMutation";
import { UserType } from "@/types/UserType";
import { useAuth } from "@/hooks/useAuth";
import { NoteShareType } from "@/types/notes/NoteShareType";

interface ShareNoteDialogProps {
  id: string;
  shares: NoteShareType[];
  open: boolean;
  onClose: () => void;
  onShare: () => void;
}

interface GetUserByEmail {
  sucess: boolean;
  error: string | null;
  user: UserType | null;
}

interface GetUserByEmailData {
  getUserByEmail: GetUserByEmail;
}

export default function ShareNoteDialog({
  id,
  shares,
  open,
  onClose,
  onShare,
}: ShareNoteDialogProps) {
  const [user, setUser] = useState<UserType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { t } = useTranslation();
  const { user: currentUser } = useAuth();

  const token = localStorage.getItem("idToken");

  const [getUserByEmail, { loading }] = useLazyQuery<GetUserByEmailData>(
    GET_USER_BY_EMAIL_QUERY,
  );

  const [shareNote, { loading: shareLoading }] = useMutation(
    CREATE_NOTE_SHARE_MUTATION,
    {
      context: { headers: { Authorization: `Bearer ${token}` } },
      onCompleted: () => {
        onClose();
      },
    },
  );

  const handleShareNote = async () => {
    if (!user) return;

    try {
      await shareNote({
        variables: {
          input: {
            noteId: id,
            personId: user.id,
          },
        },
      });

      toast.success(t("notes.shareDialog.success"), {
        description: t("notes.shareDialog.successDescription", {
          displayName: user.displayName,
        }),
      });

      setUser(null);
      onShare();
    } catch {
      toast.error(t("notes.shareDialog.error"));
    }
  };

  const handleSearchUser = useCallback(async () => {
    if (!inputRef.current?.value) return;

    const email = inputRef.current.value.trim();

    if (!email) return;

    try {
      const { data } = await getUserByEmail({
        context: { headers: { Authorization: `Bearer ${token}` } },
        variables: {
          input: {
            email,
          },
        },
      });

      if (data?.getUserByEmail.user && data.getUserByEmail.user !== null) {
        inputRef.current.value = "";

        if (data.getUserByEmail.user.id === currentUser?.id) {
          return toast.warning(t("notes.shareDialog.cannotShareWithSelf"));
        }

        if (
          shares.some(
            (share: NoteShareType) =>
              share.personId === data.getUserByEmail.user?.id,
          )
        ) {
          return toast.warning(t("notes.shareDialog.alreadyShared"));
        }

        setError(null);
        setUser(data.getUserByEmail.user);
      } else {
        setUser(null);
        setError(t("notes.shareDialog.noUserFound"));
      }
    } catch (error) {
      console.error(error);
    }
  }, [token, getUserByEmail, shares, currentUser?.id, t]);

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (
        event.key === "Enter" &&
        document.activeElement === inputRef.current
      ) {
        event.preventDefault();
        await handleSearchUser();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSearchUser]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("notes.shareDialog.title")}</DialogTitle>
        </DialogHeader>
        <Label htmlFor="email">{t("notes.shareDialog.email")}</Label>
        <InputGroup>
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            disabled={loading}
            id="email"
            ref={inputRef}
            placeholder={t("notes.shareDialog.emailPlaceholder")}
          />
          <InputGroupAddon align="inline-end">
            <Kbd>
              <Forward />
              Enter
            </Kbd>
          </InputGroupAddon>
        </InputGroup>
        {error && <p className="text-red-500">{error}</p>}
        {user && (
          <Card className="p-4 flex gap-3 items-center justify-betweeen">
            <div className="flex gap-3 w-full">
              <Avatar>
                <AvatarImage
                  src={user.avatarUrl || undefined}
                  alt={user.displayName}
                />
                <AvatarFallback>{user.displayName[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p>{user.displayName}</p>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Button
              onClick={handleShareNote}
              disabled={shareLoading}
              variant="outline"
            >
              {shareLoading
                ? t("notes.shareDialog.inviting")
                : t("notes.shareDialog.invite")}
            </Button>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
}
