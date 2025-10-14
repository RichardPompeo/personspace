import { Trash } from "lucide-react";
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
import DELETE_NOTE_MUTATION from "@/graphql/notes/deleteNoteMutation";

interface DeleteNoteDialogProps {
  id: string;
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

interface DeleteNoteData {
  deleteNote: {
    id: string;
  };
}

export default function DeleteNoteDialog({
  id,
  open,
  onClose,
  onDelete,
}: DeleteNoteDialogProps) {
  const { t } = useTranslation();
  const token = localStorage.getItem("idToken");

  const [handleDeleteNote, { loading: isDeleting }] =
    useMutation<DeleteNoteData>(DELETE_NOTE_MUTATION, {
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
      onCompleted: () => {
        onDelete();
        toast.success(t("notes.deleteDialog.success"));
      },
      onError: () => {
        toast.error(t("notes.deleteDialog.error"));
      },
    });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("notes.deleteDialog.title")}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {t("notes.deleteDialog.description")}
        </DialogDescription>
        <DialogFooter>
          <Button onClick={onClose} variant="outline" disabled={isDeleting}>
            {t("notes.deleteDialog.cancel")}
          </Button>
          <Button
            onClick={() => handleDeleteNote()}
            variant="destructive"
            disabled={isDeleting}
          >
            <Trash size={16} />
            {isDeleting
              ? t("notes.deleteDialog.deleting")
              : t("notes.deleteDialog.delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
