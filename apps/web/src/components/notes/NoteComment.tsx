import { Calendar } from "lucide-react";

import { NoteCommentType } from "@/types/notes/NoteCommentType";
import DateDisplay from "@/components/DateDisplay";
import { Avatar, AvatarFallback, AvatarImage } from "ui";

interface NoteCommentProps {
  comment: NoteCommentType;
}

export default function NoteComment({ comment }: NoteCommentProps) {
  return (
    <div className="flex gap-3">
      <Avatar>
        <AvatarImage
          src={comment.author.avatarUrl || undefined}
          alt={comment.author.displayName}
        />
        <AvatarFallback>{comment.author.displayName[0]}</AvatarFallback>
      </Avatar>
      <div className="w-full">
        <div className="flex items-top justify-between">
          <p>{comment.author.displayName}</p>
          <p className="text-muted-foreground flex flex-row gap-1.5 items-center">
            <Calendar className="h-4 w-4" />
            <DateDisplay date={comment.createdAt} />
          </p>
        </div>
        <div className="text-muted-foreground">{comment.message}</div>
      </div>
    </div>
  );
}
