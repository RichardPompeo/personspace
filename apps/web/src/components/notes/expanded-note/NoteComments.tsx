import { useTranslation } from "react-i18next";

import { NoteCommentType } from "../../../types/NoteCommentType";
import NoteCommentsList from "./NoteCommentsList";
import NoteCommentForm from "./NoteCommentForm";

interface NoteCommentsProps {
  noteId: string;
  comments?: NoteCommentType[];
  onCommentAdded: () => void;
}

export default function NoteComments({
  noteId,
  comments,
  onCommentAdded,
}: NoteCommentsProps) {
  const { t } = useTranslation();

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
    <div className="mt-8">
      <h3 className="mb-4 text-lg font-semibold text-text">
        {t("notes.expandedNote.comments", "Comments")} ({comments?.length || 0})
      </h3>

      {comments && comments.length > 0 ? (
        <NoteCommentsList comments={comments} formatDate={formatDate} />
      ) : (
        <p className="text-sm text-text-dim">
          {t("notes.expandedNote.noComments", "No comments yet")}
        </p>
      )}

      <NoteCommentForm noteId={noteId} onCommentAdded={onCommentAdded} />
    </div>
  );
}
