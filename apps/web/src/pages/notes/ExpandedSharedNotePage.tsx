import { useRef, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery, useMutation } from "@apollo/client/react";
import { ArrowLeft, Forward, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import LoadingSpinner from "@/components/LoadingSpinner";
import DateDisplay from "@/components/DateDisplay";
import ErrorComponent from "@/components/ErrorComponent";
import NoteComment from "@/components/notes/NoteComment";
import GET_NOTE_COMMENTS_QUERY from "@/graphql/notes/getNoteCommentsQuery";
import CREATE_NOTE_COMMENT_MUTATION from "@/graphql/notes/createNoteCommentMutation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  InputGroupInput,
  InputGroupAddon,
  ScrollArea,
  InputGroup,
  Kbd,
  Avatar,
  AvatarFallback,
} from "ui";
import { NoteCommentType } from "@/types/notes/NoteCommentType";
import GET_SHARED_NOTE_BY_ID_QUERY from "@/graphql/notes/getSharedNoteByIdQuery";
import { NoteShareType } from "@/types/notes/NoteShareType";

interface GetSharedNoteData {
  getSharedNoteById: NoteShareType;
}

interface GetNoteCommentsData {
  getNoteComments: NoteCommentType[];
}

interface CreateNoteCommentData {
  createNoteComment: NoteCommentType;
}

export default function ExpandedSharedNotePage() {
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  const token = localStorage.getItem("idToken");

  const { data, loading, error } = useQuery<GetSharedNoteData>(
    GET_SHARED_NOTE_BY_ID_QUERY,
    {
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      variables: {
        id: params.id,
      },
      skip: !token || !params.id,
      fetchPolicy: "cache-and-network",
    },
  );

  const { data: commentsData, refetch: refetchComments } =
    useQuery<GetNoteCommentsData>(GET_NOTE_COMMENTS_QUERY, {
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      variables: {
        noteId: params.id,
      },
      skip: !token || !params.id,
      pollInterval: 30000,
    });

  const [createComment, { loading: createCommentLoading }] =
    useMutation<CreateNoteCommentData>(CREATE_NOTE_COMMENT_MUTATION, {
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      onCompleted: () => {
        inputRef.current?.focus();
        refetchComments();
      },
    });

  const handleSendComment = useCallback(async () => {
    if (!inputRef.current?.value) return;

    const commentText = inputRef.current.value.trim();

    if (!commentText) return;

    inputRef.current.value = "";

    try {
      await createComment({
        variables: {
          input: {
            noteId: params.id,
            message: commentText,
          },
        },
      });

      inputRef.current?.focus();
    } catch (err) {
      inputRef.current.value = commentText;
      console.error("Error sending comment:", err);
    }
  }, [createComment, params.id]);

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (event.key === "/") {
        event.preventDefault();
        inputRef.current?.focus();
      }

      if (
        event.key === "Enter" &&
        document.activeElement === inputRef.current
      ) {
        event.preventDefault();
        await handleSendComment();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSendComment]);

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [commentsData]);

  if (loading) {
    return (
      <div className="col-span-full flex items-center justify-center p-16 h-full">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <ErrorComponent errorMessage={error.message} />;
  }

  if (!data) {
    return navigate(-1);
  }

  const note = data.getSharedNoteById.note;

  return (
    <>
      <div className="flex h-full w-full flex-col gap-6 overflow-y-auto p-8 md:p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 rounded-lg border-none bg-primary text-black px-4 py-2 text-sm transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <ArrowLeft size={16} />
              {t("general.back")}
            </button>
            <h1 className="text-3xl font-bold text-foreground md:text-2xl">
              {t("notes.title", "Notes")}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Share2 size={16} />
              <DateDisplay date={data.getSharedNoteById.sharedAt} />
            </p>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row items-top gap-3">
          <Card
            className="border-l-4 w-full xl:w-4/6 min-h-96 flex flex-col"
            style={{ borderLeftColor: note.color }}
          >
            <CardHeader className="pb-3 flex justify-between items-center flex-row">
              <CardTitle className="line-clamp-2 text-lg">
                {note.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">{note.description}</CardContent>
            <CardFooter className="mt-auto flex gap-1">
              <span className="flex items-center gap-1.5">
                <Avatar className="w-6 h-6">
                  <AvatarFallback>
                    <p className="text-xs">{note.author.displayName[0]}</p>
                  </AvatarFallback>
                </Avatar>
                <p className="text-foreground">{note.author.displayName}</p>
              </span>
            </CardFooter>
          </Card>

          <Card className="w-full xl:w-2/6 h-96 flex flex-col">
            <CardHeader className="pb-3 flex justify-between items-left flex-col">
              <CardTitle className="line-clamp-2 text-lg">
                {t("notes.expandedNote.comments")} (
                {commentsData?.getNoteComments?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!commentsData?.getNoteComments ||
              commentsData.getNoteComments.length === 0 ? (
                <p className="text-muted-foreground">
                  {t("notes.expandedNote.noComments")}
                </p>
              ) : (
                <ScrollArea className="h-60" data-auto-scroll="comments">
                  <div className="flex flex-col gap-3">
                    {commentsData?.getNoteComments?.map((comment) => (
                      <NoteComment key={comment.id} comment={comment} />
                    ))}
                    <div ref={scrollAnchorRef} />
                  </div>
                </ScrollArea>
              )}
            </CardContent>
            <CardFooter className="flex gap-3 items-top mt-auto">
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <Kbd>/</Kbd>
                </InputGroupAddon>
                <InputGroupInput
                  disabled={createCommentLoading}
                  ref={inputRef}
                  placeholder={t("notes.expandedNote.commentPlaceholder")}
                />
                <InputGroupAddon align="inline-end">
                  <Kbd>
                    <Forward className="h-4 w-4" />
                    Enter
                  </Kbd>
                </InputGroupAddon>
              </InputGroup>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
