import { useTranslation } from "react-i18next";
import { X, Trash2, Edit } from "lucide-react";

interface NoteModalHeaderProps {
  title: string;
  isOwner: boolean;
  isEditing: boolean;
  editTitle: string;
  updateLoading: boolean;
  deleteLoading: boolean;
  onEditTitleChange: (value: string) => void;
  onEditClick: () => void;
  onSaveClick: () => void;
  onCancelClick: () => void;
  onDeleteClick: () => void;
  onClose: () => void;
}

export default function NoteModalHeader({
  title,
  isOwner,
  isEditing,
  editTitle,
  updateLoading,
  deleteLoading,
  onEditTitleChange,
  onEditClick,
  onSaveClick,
  onCancelClick,
  onDeleteClick,
  onClose,
}: NoteModalHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-start justify-between border-b border-border p-6">
      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => onEditTitleChange(e.target.value)}
            className="w-full border-none bg-transparent text-2xl font-bold text-text outline-none"
            disabled={updateLoading}
          />
        ) : (
          <h2 className="text-2xl font-bold text-text">{title}</h2>
        )}
      </div>

      <div className="flex items-center gap-3">
        {isOwner && (
          <>
            {isEditing ? (
              <>
                <button
                  onClick={onSaveClick}
                  disabled={updateLoading}
                  className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-black transition-all hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {updateLoading
                    ? t("notes.expandedNote.saving", "Saving...")
                    : t("notes.expandedNote.save", "Save")}
                </button>
                <button
                  onClick={onCancelClick}
                  disabled={updateLoading}
                  className="rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-text transition-all hover:bg-background-secondary disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {t("notes.expandedNote.cancel", "Cancel")}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onEditClick}
                  className="flex items-center gap-2 rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-text transition-all hover:bg-background-secondary"
                >
                  <Edit size={20} />
                  {t("notes.expandedNote.edit", "Edit")}
                </button>
              </>
            )}

            {!isEditing && (
              <button
                onClick={onDeleteClick}
                disabled={deleteLoading}
                className="flex items-center gap-2 rounded-lg border-none bg-red-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Trash2 size={20} />
                {deleteLoading
                  ? t("notes.expandedNote.deleting", "Deleting...")
                  : t("notes.expandedNote.delete", "Delete")}
              </button>
            )}
          </>
        )}
        <button
          onClick={onClose}
          className="ml-4 rounded-lg p-2 text-text-dim transition-colors hover:bg-background-secondary hover:text-text"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
}
