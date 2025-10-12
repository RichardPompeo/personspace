import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";

import { NoteType } from "../types/NoteType";
import { NoteCommentType } from "../types/NoteCommentType";
import DELETE_NOTE_MUTATION from "../graphql/notes/deleteNoteMutation";
import UPDATE_NOTE_MUTATION from "../graphql/notes/updateNoteMutation";
import CREATE_NOTE_COMMENT_MUTATION from "../graphql/notes/createNoteCommentMutation";

interface ExpandedNoteModalProps {
  note: NoteType;
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

interface CreateCommentData {
  createNoteComment: NoteCommentType;
}

interface CreateCommentVariables {
  input: {
    noteId: string;
    message: string;
  };
}

export default function ExpandedNoteModal({
  note,
  onClose,
  onNoteUpdated,
  isOwner,
}: ExpandedNoteModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editDescription, setEditDescription] = useState(note.description);
  const [commentMessage, setCommentMessage] = useState("");

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

  const [createComment, { loading: commentLoading }] = useMutation<
    CreateCommentData,
    CreateCommentVariables
  >(CREATE_NOTE_COMMENT_MUTATION, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    onCompleted: () => {
      setCommentMessage("");
      onNoteUpdated();
    },
    onError: (error) => {
      console.error("Error creating comment:", error);
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

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
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

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentMessage.trim()) {
      return;
    }

    createComment({
      variables: {
        input: {
          noteId: note.id,
          message: commentMessage.trim(),
        },
      },
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg bg-background shadow-2xl"
        style={{ borderTopColor: note.color, borderTopWidth: "6px" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border p-6">
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full border-none bg-transparent text-2xl font-bold text-text outline-none"
                disabled={updateLoading}
              />
            ) : (
              <h2 className="text-2xl font-bold text-text">{note.title}</h2>
            )}
            <p className="mt-1 text-sm text-text-dim">
              {t("notes.expandedNote.created", "Created")}{" "}
              {formatDate(note.createdAt)}
            </p>
          </div>

          <button
            onClick={onClose}
            className="ml-4 rounded-lg p-2 text-text-dim transition-colors hover:bg-background-secondary hover:text-text"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isEditing ? (
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="min-h-[120px] w-full resize-none border-none bg-transparent text-text outline-none"
              disabled={updateLoading}
            />
          ) : (
            <p className="whitespace-pre-wrap text-text">{note.description}</p>
          )}

          {/* Comments Section */}
          <div className="mt-8">
            <h3 className="mb-4 text-lg font-semibold text-text">
              {t("notes.expandedNote.comments", "Comments")} (
              {note.comments?.length || 0})
            </h3>

            {note.comments && note.comments.length > 0 ? (
              <div className="space-y-4">
                {note.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="rounded-lg border border-border bg-background-secondary p-4"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium text-text">
                        {comment.author.displayName}
                      </span>
                      <span className="text-xs text-text-dim">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-text">{comment.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-text-dim">
                {t("notes.expandedNote.noComments", "No comments yet")}
              </p>
            )}

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="mt-4">
              <textarea
                value={commentMessage}
                onChange={(e) => setCommentMessage(e.target.value)}
                placeholder={t(
                  "notes.expandedNote.commentPlaceholder",
                  "Write a comment...",
                )}
                className="w-full resize-none rounded-lg border border-border bg-background p-3 text-sm text-text outline-none focus:border-accent"
                rows={3}
                disabled={commentLoading}
              />
              <button
                type="submit"
                disabled={commentLoading || !commentMessage.trim()}
                className="mt-2 rounded-lg border-none bg-accent px-4 py-2 text-sm font-medium text-white transition-all hover:opacity-80 disabled:cursor-not-allowed disabled:bg-border disabled:opacity-60"
              >
                {commentLoading
                  ? t("notes.expandedNote.sending", "Sending...")
                  : t("notes.expandedNote.send", "Send")}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Actions */}
        {isOwner && (
          <div className="flex items-center justify-between border-t border-border p-4">
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleUpdate}
                    disabled={updateLoading}
                    className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-all hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {updateLoading
                      ? t("notes.expandedNote.saving", "Saving...")
                      : t("notes.expandedNote.save", "Save")}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditTitle(note.title);
                      setEditDescription(note.description);
                    }}
                    disabled={updateLoading}
                    className="rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-text transition-all hover:bg-background-secondary disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {t("notes.expandedNote.cancel", "Cancel")}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-text transition-all hover:bg-background-secondary"
                  >
                    <MdEdit size={16} />
                    {t("notes.expandedNote.edit", "Edit")}
                  </button>
                </>
              )}
            </div>

            {!isEditing && (
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="flex items-center gap-2 rounded-lg border-none bg-red-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <MdDelete size={16} />
                {deleteLoading
                  ? t("notes.expandedNote.deleting", "Deleting...")
                  : t("notes.expandedNote.delete", "Delete")}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
