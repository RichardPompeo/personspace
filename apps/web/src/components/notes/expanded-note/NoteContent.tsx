interface NoteContentProps {
  description: string;
  isEditing: boolean;
  editDescription: string;
  updateLoading: boolean;
  onEditDescriptionChange: (value: string) => void;
}

export default function NoteContent({
  description,
  isEditing,
  editDescription,
  updateLoading,
  onEditDescriptionChange,
}: NoteContentProps) {
  return (
    <div>
      {isEditing ? (
        <textarea
          value={editDescription}
          onChange={(e) => onEditDescriptionChange(e.target.value)}
          className="min-h-[120px] w-full resize-none border-none bg-transparent text-text outline-none"
          disabled={updateLoading}
        />
      ) : (
        <p className="whitespace-pre-wrap text-text">{description}</p>
      )}
    </div>
  );
}
