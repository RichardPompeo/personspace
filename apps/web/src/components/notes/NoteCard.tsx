import { NoteType } from "../../types/NoteType";

interface NoteCardProps {
  note: NoteType;
  onClick: () => void;
}

export default function NoteCard({ note, onClick }: NoteCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <button
      onClick={onClick}
      className="flex w-full cursor-pointer flex-col gap-3 rounded-lg border border-border bg-background-secondary p-4 text-left transition-all hover:shadow-lg hover:scale-[1.02]"
      style={{ borderLeftColor: note.color, borderLeftWidth: "4px" }}
    >
      <h3 className="text-lg font-semibold text-text line-clamp-2">
        {note.title}
      </h3>

      <p className="text-sm text-text-dim line-clamp-3">
        {note.description}
      </p>

      <div className="mt-2 flex items-center justify-between text-xs text-text-dim">
        <span>{formatDate(note.createdAt)}</span>
        {note.comments && note.comments.length > 0 && (
          <span className="flex items-center gap-1">
            💬 {note.comments.length}
          </span>
        )}
      </div>
    </button>
  );
}
