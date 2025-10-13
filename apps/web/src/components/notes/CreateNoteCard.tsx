import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useTranslation } from "react-i18next";
import { AiOutlinePlus } from "react-icons/ai";

import CREATE_NOTE_MUTATION from "../../graphql/notes/createNoteMutation";
import { NoteType } from "../../types/NoteType";

interface CreateNoteCardProps {
  onNoteCreated?: () => void;
}

interface CreateNoteData {
  createNote: NoteType;
}

interface CreateNoteVariables {
  input: {
    title: string;
    description: string;
    color: string;
  };
}

const PRESET_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
  "#85C1E2",
];

export default function CreateNoteCard({ onNoteCreated }: CreateNoteCardProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);
  const [isExpanded, setIsExpanded] = useState(false);

  const { t } = useTranslation();
  const token = localStorage.getItem("idToken");

  const [createNote, { loading }] = useMutation<
    CreateNoteData,
    CreateNoteVariables
  >(CREATE_NOTE_MUTATION, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    onCompleted: () => {
      setTitle("");
      setDescription("");
      setSelectedColor(PRESET_COLORS[0]);
      setIsExpanded(false);
      if (onNoteCreated) {
        onNoteCreated();
      }
    },
    onError: (error) => {
      console.error("Error creating note:", error);
      alert(
        t("notes.notifications.error", "An error occurred. Please try again."),
      );
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      return;
    }

    await createNote({
      variables: {
        input: {
          title: title.trim(),
          description: description.trim(),
          color: selectedColor,
        },
      },
    });
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="flex min-h-[200px] w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border bg-background-secondary transition-all hover:border-accent hover:bg-background"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-black">
          <AiOutlinePlus size={24} />
        </div>
        <span className="text-sm font-medium text-text">
          {t("notes.createNote.title", "Create Note")}
        </span>
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-h-[200px] w-full flex-col gap-4 rounded-lg border border-border bg-background-secondary p-4"
      style={{ borderLeftColor: selectedColor, borderLeftWidth: "4px" }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={t("notes.createNote.titlePlaceholder", "Note title")}
        className="w-full border-none bg-transparent text-lg font-semibold text-text outline-none placeholder:text-text-dim"
        disabled={loading}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={t(
          "notes.createNote.descriptionPlaceholder",
          "Note description",
        )}
        className="min-h-[40px] w-full resize-none border-none bg-transparent text-sm text-text outline-none placeholder:text-text-dim"
        disabled={loading}
      />

      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-text-dim">
          {t("notes.createNote.color", "Color")}
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              className="h-6 w-6 rounded-full border-2 transition-all hover:scale-110"
              style={{
                backgroundColor: color,
                borderColor: selectedColor === color ? "#000" : "transparent",
              }}
              disabled={loading}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-2 flex-col">
        <button
          type="submit"
          disabled={loading || !title.trim() || !description.trim()}
          className="flex-1 rounded-lg border-none bg-accent px-4 py-2 text-sm font-medium text-black transition-all hover:opacity-80 disabled:cursor-not-allowed disabled:bg-border disabled:opacity-60"
        >
          {loading
            ? t("notes.createNote.creating", "Creating...")
            : t("notes.createNote.create", "Create")}
        </button>
        <button
          type="button"
          onClick={() => {
            setTitle("");
            setDescription("");
            setSelectedColor(PRESET_COLORS[0]);
            setIsExpanded(false);
          }}
          disabled={loading}
          className="rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-text transition-all hover:bg-background disabled:cursor-not-allowed disabled:opacity-60"
        >
          {t("notes.expandedNote.cancel", "Cancel")}
        </button>
      </div>
    </form>
  );
}
