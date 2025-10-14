import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  Button,
  Input,
  Textarea,
  Label,
} from "ui";
import { NoteType } from "@/types/NoteType";
import UPDATE_NOTE_MUTATION from "@/graphql/notes/updateNoteMutation";

interface EditNoteDialogProps {
  note: NoteType;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const PRESET_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#98D8C8",
  "#F7DC6F",
  "#8eb5f0",
  "#85C1E2",
];

export default function EditNoteDialog({
  note,
  isOpen,
  onClose,
  onUpdate,
}: EditNoteDialogProps) {
  const { t } = useTranslation();
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const [color, setColor] = useState(note.color);

  const token = localStorage.getItem("idToken");

  const [updateNote, { loading }] = useMutation(UPDATE_NOTE_MUTATION, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    onCompleted: () => {
      onUpdate();
      toast.success(t("editNoteDialog.updateSuccess"));
    },
  });

  const handleSubmit = async () => {
    try {
      await updateNote({
        variables: {
          input: {
            id: note.id,
            title,
            description,
            color,
          },
        },
      });

      onClose();
    } catch (error) {
      console.error(error);
      toast.error(t("editNoteDialog.updateError"));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>{t("editNoteDialog.title")}</DialogTitle>
        <Label htmlFor="title">{t("editNoteDialog.titleLabel")}</Label>
        <Input
          placeholder={t("editNoteDialog.titlePlaceholder")}
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Label htmlFor="description">
          {t("editNoteDialog.descriptionLabel")}
        </Label>
        <Textarea
          id="description"
          placeholder={t("editNoteDialog.descriptionPlaceholder")}
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Label htmlFor="color">{t("editNoteDialog.colorLabel")}</Label>
        <div id="color" className="flex flex-wrap gap-2">
          {PRESET_COLORS.map((presetColor) => (
            <button
              key={presetColor}
              type="button"
              onClick={() => setColor(presetColor)}
              className="h-8 w-8 rounded-full border-2 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              style={{
                backgroundColor: presetColor,
                borderColor:
                  color === presetColor
                    ? "hsl(var(--foreground))"
                    : "transparent",
              }}
              disabled={loading}
              aria-label={t("editNoteDialog.selectColor", {
                color: presetColor,
              })}
            />
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" disabled={loading} onClick={onClose}>
            {t("editNoteDialog.cancel")}
          </Button>
          <Button
            className="text-black"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? t("editNoteDialog.saving") : t("editNoteDialog.save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
