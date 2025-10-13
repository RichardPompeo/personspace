import { Avatar, AvatarFallback } from "ui";
import { NoteCommentType } from "../../../types/NoteCommentType";

interface NoteCommentsListProps {
  comments: NoteCommentType[];
  formatDate: (dateString: string) => string;
}

export default function NoteCommentsList({
  comments,
  formatDate,
}: NoteCommentsListProps) {
  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="rounded-lg border border-border bg-background-secondary p-4"
        >
          <div className="mb-2 flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gradient-to-br from-accent/20 to-accent/10 text-accent text-xs">
                {getInitials(comment.author.displayName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-1 items-center justify-between">
              <span className="font-medium text-text">
                {comment.author.displayName}
              </span>
              <span className="text-xs text-text-dim">
                {formatDate(comment.createdAt)}
              </span>
            </div>
          </div>
          <p className="text-sm text-text">{comment.message}</p>
        </div>
      ))}
    </div>
  );
}
