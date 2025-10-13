import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import { Card, CardContent, Input, Textarea, Button, Label } from "ui";

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
      <Card
        onClick={() => setIsExpanded(true)}
        className="flex min-h-[200px] w-full cursor-pointer flex-col items-center justify-center border-2 border-dashed transition-all hover:border-primary bg-accent/5"
      >
        <CardContent className="flex flex-col items-center justify-center gap-3 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Plus className="h-6 w-6" />
          </div>
          <span className="text-sm font-medium">
            {t("notes.createNote.title", "Create Note")}
          </span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="min-h-[200px] border-l-4"
      style={{ borderLeftColor: selectedColor }}
    >
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("notes.createNote.titlePlaceholder", "Note title")}
              className="text-lg font-semibold"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t(
                "notes.createNote.descriptionPlaceholder",
                "Note description",
              )}
              className="min-h-[80px] resize-none"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground">
              {t("notes.createNote.color", "Color")}
            </Label>
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className="h-8 w-8 rounded-full border-2 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  style={{
                    backgroundColor: color,
                    borderColor:
                      selectedColor === color
                        ? "hsl(var(--foreground))"
                        : "transparent",
                  }}
                  disabled={loading}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Button
              type="submit"
              disabled={loading || !title.trim() || !description.trim()}
              className="w-full"
            >
              {loading
                ? t("notes.createNote.creating", "Creating...")
                : t("notes.createNote.create", "Create")}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setTitle("");
                setDescription("");
                setSelectedColor(PRESET_COLORS[0]);
                setIsExpanded(false);
              }}
              disabled={loading}
              className="w-full"
            >
              {t("notes.expandedNote.cancel", "Cancel")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
