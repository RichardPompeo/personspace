import { useCallback, useEffect, useRef, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client/react";
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
} from "ui";
import GET_USER_BY_EMAIL_QUERY from "@/graphql/users/getUserByEmailQuery";
import CREATE_NOTE_SHARE_MUTATION from "@/graphql/notes/createNoteShareMutation";
import { UserType } from "@/types/UserType";
import { useAuth } from "@/hooks/useAuth";
import { NoteShareType } from "@/types/NoteShareType";

interface ShareNoteDialogProps {
  id: string;
  shares: NoteShareType[];
  open: boolean;
  onClose: () => void;
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
}: ShareNoteDialogProps) {
  const [user, setUser] = useState<UserType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

      toast.success("Note shared successfully", {
        description: `The note has been shared with ${user.displayName}`,
      });

      setUser(null);
    } catch {
      toast.error("An error occurred while sharing the note");
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
          return toast.warning("You cannot share a note with yourself");
        }

        if (
          shares.some(
            (share: NoteShareType) =>
              share.personId === data.getUserByEmail.user?.id,
          )
        ) {
          return toast.warning(
            "You have already shared this note with this user",
          );
        }

        setError(null);
        setUser(data.getUserByEmail.user);
      } else {
        setUser(null);
        setError("No user found");
      }
    } catch (error) {
      console.error(error);
    }
  }, [token, getUserByEmail, shares, currentUser?.id]);

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
          <DialogTitle>Share Note</DialogTitle>
        </DialogHeader>
        <Label htmlFor="email">Email</Label>
        <InputGroup>
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            disabled={loading}
            id="email"
            ref={inputRef}
            placeholder="Enter email address"
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
              {shareLoading ? "Inviting..." : "Invite"}
            </Button>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
}
