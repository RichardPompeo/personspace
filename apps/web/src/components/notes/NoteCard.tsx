import { useState } from "react";
import {
  Calendar,
  MessageCircle,
  PencilLine,
  Share2,
  Trash,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "ui";
import { NoteType } from "../../types/NoteType";
import DateDisplay from "../DateDisplay";
import EditNoteDialog from "./EditNoteDialog";
import ShareNoteDialog from "./ShareNoteDialog";
import DeleteNoteDialog from "./DeleteNoteDialog";

interface NoteCardProps {
  note: NoteType;
  onClick: () => void;
  onRefetch: () => void;
}

export default function NoteCard({ note, onClick, onRefetch }: NoteCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const { t } = useTranslation();

  return (
    <>
      <Card
        onClick={onClick}
        className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] border-l-4"
        style={{ borderLeftColor: note.color }}
      >
        <ContextMenu>
          <ContextMenuTrigger className="flex flex-col h-full justify-between">
            <div>
              <CardHeader className="pb-3">
                <CardTitle className="line-clamp-2 text-lg">
                  {note.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="line-clamp-3">
                  {note.description}
                </CardDescription>
              </CardContent>
            </div>
            <CardFooter>
              <div className="flex items-center gap-4 justify-between text-xs text-muted-foreground pt-2">
                <span className="flex items-center gap-1.5">
                  {Math.abs(
                    new Date(note.createdAt).getTime() -
                      new Date(note.updatedAt).getTime(),
                  ) > 1000 ? (
                    <>
                      <PencilLine className="h-3 w-3" />
                      <DateDisplay date={note.updatedAt} />
                    </>
                  ) : (
                    <>
                      <Calendar className="h-3 w-3" />
                      <DateDisplay date={note.createdAt} />
                    </>
                  )}
                </span>
                {note.comments && note.comments.length > 0 && (
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="h-3 w-3" />
                    {note.comments.length}
                  </span>
                )}

                {note.shares && note.shares.length > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3 w-3" />
                    {note.shares.length}
                  </span>
                )}
              </div>
            </CardFooter>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setIsEditDialogOpen(true);
              }}
            >
              <PencilLine size={16} />
              {t("notes.expandedNote.edit")}
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setIsShareDialogOpen(true);
              }}
            >
              <Share2 size={16} />
              {t("notes.expandedNote.share")}
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem
              className="text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                setIsDeleteDialogOpen(true);
              }}
            >
              <Trash className="text-destructive" size={16} />
              {t("notes.expandedNote.delete")}
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </Card>
      <DeleteNoteDialog
        id={note.id}
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={() => onRefetch()}
      />

      <ShareNoteDialog
        id={note.id}
        shares={note.shares}
        open={isShareDialogOpen}
        onClose={() => setIsShareDialogOpen(false)}
        onShare={() => onRefetch()}
      />

      <EditNoteDialog
        note={note}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onUpdate={() => onRefetch()}
      />
    </>
  );
}
