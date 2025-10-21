import { Trash2 } from "lucide-react";
import { useMutation } from "@apollo/client/react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogFooter,
  Button,
  DialogHeader,
} from "ui";
import DELETE_NOTE_SHARE_MUTATION from "@/graphql/notes/deleteNoteShareMutation";

interface RemoveNoteShareDialogProps {
  id: string;
  open: boolean;
  onClose: () => void;
  onRemove: () => void;
}

interface DeleteNoteShareData {
  deleteNoteShare: {
    success: boolean;
    error?: {
      code: string;
      message: string;
    };
  };
}

export default function RemoveNoteShareDialog({
  id,
  open,
  onClose,
  onRemove,
}: RemoveNoteShareDialogProps) {
  const { t } = useTranslation();
  const token = localStorage.getItem("idToken");

  const [handleDeleteNoteShare, { loading: isRemoving }] =
    useMutation<DeleteNoteShareData>(DELETE_NOTE_SHARE_MUTATION, {
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      variables: {
        input: {
          id,
        },
      },
      onCompleted: (data) => {
        if (data.deleteNoteShare.success) {
          toast.success(t("notes.removeShareDialog.success"));

          onClose();
          onRemove();
        } else {
          toast.error(
            data.deleteNoteShare.error?.message ||
              t("notes.removeShareDialog.error"),
          );

          onClose();
        }
      },
      onError: (error) => {
        console.error("Mutation error:", error);
        toast.error(t("notes.removeShareDialog.error"));
        onClose();
      },
    });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("notes.removeShareDialog.title")}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {t("notes.removeShareDialog.description")}
        </DialogDescription>
        <DialogFooter>
          <Button onClick={onClose} variant="outline" disabled={isRemoving}>
            {t("notes.removeShareDialog.cancel")}
          </Button>
          <Button
            onClick={() => handleDeleteNoteShare()}
            variant="destructive"
            disabled={isRemoving}
          >
            <Trash2 size={16} />
            {isRemoving
              ? t("notes.removeShareDialog.removing")
              : t("notes.removeShareDialog.remove")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
