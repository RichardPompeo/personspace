import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  Badge,
} from "ui";
import { Calendar, Clock } from "lucide-react";

import { NoteType } from "../../types/NoteType";
import DELETE_NOTE_MUTATION from "../../graphql/notes/deleteNoteMutation";
import UPDATE_NOTE_MUTATION from "../../graphql/notes/updateNoteMutation";
import NoteModalHeader from "./expanded-note/NoteModalHeader";
import NoteContent from "./expanded-note/NoteContent";
import NoteComments from "./expanded-note/NoteComments";

interface ExpandedNoteModalProps {
  note: NoteType;
  open: boolean;
  onClose: () => void;
  onNoteUpdated: () => void;
  isOwner: boolean;
}

interface DeleteNoteData {
  deleteNote: {
    success: boolean;
  };
}

interface DeleteNoteVariables {
  input: {
    id: string;
  };
}

interface UpdateNoteData {
  updateNote: NoteType;
}

interface UpdateNoteVariables {
  input: {
    id: string;
    title: string;
    description: string;
  };
}

export default function ExpandedNoteModal({
  note,
  open,
  onClose,
  onNoteUpdated,
  isOwner,
}: ExpandedNoteModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editDescription, setEditDescription] = useState(note.description);

  const { t } = useTranslation();
  const token = localStorage.getItem("idToken");

  const [deleteNote, { loading: deleteLoading }] = useMutation<
    DeleteNoteData,
    DeleteNoteVariables
  >(DELETE_NOTE_MUTATION, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    onCompleted: () => {
      onNoteUpdated();
      onClose();
    },
    onError: (error) => {
      console.error("Error deleting note:", error);
      alert(t("notes.notifications.error"));
    },
  });

  const [updateNote, { loading: updateLoading }] = useMutation<
    UpdateNoteData,
    UpdateNoteVariables
  >(UPDATE_NOTE_MUTATION, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    onCompleted: () => {
      setIsEditing(false);
      onNoteUpdated();
    },
    onError: (error) => {
      console.error("Error updating note:", error);
      alert(t("notes.notifications.error"));
    },
  });

  const handleDelete = () => {
    if (
      window.confirm(
        t(
          "notes.expandedNote.deleteConfirm",
          "Are you sure you want to delete this note?",
        ),
      )
    ) {
      deleteNote({
        variables: {
          input: { id: note.id },
        },
      });
    }
  };

  const handleUpdate = () => {
    if (!editTitle.trim() || !editDescription.trim()) {
      return;
    }

    updateNote({
      variables: {
        input: {
          id: note.id,
          title: editTitle.trim(),
          description: editDescription.trim(),
        },
      },
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(note.title);
    setEditDescription(note.description);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>{note.title}</DialogTitle>
          <DialogDescription>{note.description}</DialogDescription>
        </DialogHeader>

        {/* Color accent bar */}
        <div className="h-2 w-full" style={{ backgroundColor: note.color }} />

        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <NoteModalHeader
            title={note.title}
            isOwner={isOwner}
            isEditing={isEditing}
            editTitle={editTitle}
            updateLoading={updateLoading}
            deleteLoading={deleteLoading}
            onEditTitleChange={setEditTitle}
            onEditClick={() => setIsEditing(true)}
            onSaveClick={handleUpdate}
            onCancelClick={handleCancelEdit}
            onDeleteClick={handleDelete}
            onClose={onClose}
          />

          {/* Metadata */}
          <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatDate(note.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{formatTime(note.createdAt)}</span>
            </div>
            {note.comments && note.comments.length > 0 && (
              <Badge variant="secondary" className="ml-auto">
                {note.comments.length}{" "}
                {note.comments.length === 1
                  ? t("notes.expandedNote.comment", "comment")
                  : t("notes.expandedNote.comments", "comments")}
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="border-t border-border pt-6">
            <NoteContent
              description={note.description}
              isEditing={isEditing}
              editDescription={editDescription}
              updateLoading={updateLoading}
              onEditDescriptionChange={setEditDescription}
            />
          </div>

          {/* Comments Section */}
          <div className="mt-8 border-t border-border pt-6">
            <NoteComments
              noteId={note.id}
              comments={note.comments}
              onCommentAdded={onNoteUpdated}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
