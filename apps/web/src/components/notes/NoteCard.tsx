import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "ui";
import { MessageCircle } from "lucide-react";
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
    <Card
      onClick={onClick}
      className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] border-l-4 flex flex-col justify-between"
      style={{ borderLeftColor: note.color }}
    >
      <div>
        <CardHeader className="pb-3">
          <CardTitle className="line-clamp-2 text-lg">{note.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="line-clamp-3">
            {note.description}
          </CardDescription>
        </CardContent>
      </div>
      <CardFooter>
        <div className="flex items-center gap-3 justify-between text-xs text-muted-foreground pt-2">
          <span>{formatDate(note.createdAt)}</span>
          {note.comments && note.comments.length > 0 && (
            <span className="flex items-center gap-1.5">
              <MessageCircle className="h-3 w-3" />
              {note.comments.length}
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
