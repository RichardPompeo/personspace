import { MessageCircle, Share2, Trash } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Avatar,
  AvatarFallback,
  AvatarImage,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "ui";

import DateDisplay from "../DateDisplay";
import { NoteShareType } from "@/types/notes/NoteShareType";
import RemoveNoteShareDialog from "./RemoveNoteShareDialog";

interface NoteShareCardProps {
  sharedNote: NoteShareType;
  onClick: () => void;
  onRefetch: () => void;
}

export default function NoteShareCard({
  sharedNote,
  onClick,
  onRefetch,
}: NoteShareCardProps) {
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

  const { t } = useTranslation();

  return (
    <>
      <Card
        onClick={onClick}
        className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] border-l-4"
        style={{ borderLeftColor: sharedNote.note.color }}
      >
        <ContextMenu>
          <ContextMenuTrigger className="flex flex-col h-full justify-between">
            <div>
              <CardHeader className="pb-3">
                <CardTitle className="line-clamp-2 text-lg">
                  {sharedNote.note.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="line-clamp-3">
                  {sharedNote.note.description}
                </CardDescription>
              </CardContent>
            </div>
            <CardFooter>
              <div className="flex items-center gap-4 justify-between text-xs text-muted-foreground pt-2">
                <span className="flex items-center gap-1.5">
                  <Avatar className="w-5 h-5">
                    <AvatarImage
                      src={sharedNote.note.author.avatarUrl || undefined}
                      alt={sharedNote.note.author.displayName}
                    />
                    <AvatarFallback>
                      <p className="text-xs">
                        {sharedNote.note.author.displayName[0]}
                      </p>
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-foreground">
                    {sharedNote.note.author.displayName}
                  </p>
                </span>
                <span className="flex items-center gap-1.5">
                  <Share2 className="h-3 w-3" />
                  <DateDisplay date={sharedNote.sharedAt} />
                </span>
                {sharedNote.note.comments &&
                  sharedNote.note.comments.length > 0 && (
                    <span className="flex items-center gap-1.5">
                      <MessageCircle className="h-3 w-3" />
                      {sharedNote.note.comments.length}
                    </span>
                  )}
              </div>
            </CardFooter>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem
              className="text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                setIsRemoveDialogOpen(true);
              }}
            >
              <Trash className="text-destructive" size={16} />
              {t("notes.sharedNote.removeAccess")}
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </Card>
      <RemoveNoteShareDialog
        id={sharedNote.id}
        open={isRemoveDialogOpen}
        onClose={() => setIsRemoveDialogOpen(false)}
        onRemove={() => onRefetch()}
      />
    </>
  );
}
