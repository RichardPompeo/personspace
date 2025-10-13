import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useTranslation } from "react-i18next";

import { NoteCommentType } from "../../../types/NoteCommentType";
import CREATE_NOTE_COMMENT_MUTATION from "../../../graphql/notes/createNoteCommentMutation";

interface NoteCommentFormProps {
  noteId: string;
  onCommentAdded: () => void;
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

export default function NoteCommentForm({
  noteId,
  onCommentAdded,
}: NoteCommentFormProps) {
  const [commentMessage, setCommentMessage] = useState("");
  const { t } = useTranslation();
  const token = localStorage.getItem("idToken");

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
      onCommentAdded();
    },
    onError: (error) => {
      console.error("Error creating comment:", error);
      alert(t("notes.notifications.error"));
    },
  });

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentMessage.trim()) {
      return;
    }

    createComment({
      variables: {
        input: {
          noteId,
          message: commentMessage.trim(),
        },
      },
    });
  };

  return (
    <form onSubmit={handleAddComment} className="mt-4 flex gap-3">
      <input
        value={commentMessage}
        onChange={(e) => setCommentMessage(e.target.value)}
        placeholder={t(
          "notes.expandedNote.commentPlaceholder",
          "Write a comment...",
        )}
        className="w-full resize-none rounded-lg border border-border bg-background p-2 text-sm text-text outline-none focus:border-accent"
        disabled={commentLoading}
      />
      <button
        type="submit"
        disabled={commentLoading || !commentMessage.trim()}
        className="rounded-lg border-none bg-accent px-4 py-2 text-sm font-medium text-black transition-all hover:opacity-80 disabled:cursor-not-allowed disabled:bg-border disabled:opacity-60"
      >
        {commentLoading
          ? t("notes.expandedNote.sending", "Sending...")
          : t("notes.expandedNote.send", "Send")}
      </button>
    </form>
  );
}
