import { Trash } from "lucide-react";
import { useMutation } from "@apollo/client/react";
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
      },
    });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Note</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this note?
        </DialogDescription>
        <DialogFooter>
          <Button onClick={onClose} variant="outline" disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteNote()}
            variant="destructive"
            disabled={isDeleting}
          >
            <Trash size={16} />
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
