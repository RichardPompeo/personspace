import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FileText, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router";
import { useQuery } from "@apollo/client/react";

import { NoteType } from "../../types/NoteType";
import { NoteShareType } from "../../types/NoteShareType";
import LoadingSpinner from "../../components/LoadingSpinner";
import CreateNoteCard from "../../components/notes/CreateNoteCard";
import NoteCard from "../../components/notes/NoteCard";

import GET_NOTES_QUERY from "../../graphql/notes/getNotesQuery";
import GET_SHARED_NOTES_QUERY from "../../graphql/notes/getSharedNotes";

interface GetNotesData {
  getNotes: NoteType[];
}

interface GetSharedNotesData {
  getSharedNotes: NoteShareType[];
}

export default function NotesPage() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [sharedNotes, setSharedNotes] = useState<NoteShareType[]>([]);
  const [type, setType] = useState<"your" | "shared">("your");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const token = localStorage.getItem("idToken");

  const { data, loading, refetch } = useQuery<GetNotesData>(GET_NOTES_QUERY, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    skip: !token,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  const {
    data: sharedNotesData,
    loading: sharedNotesLoading,
    refetch: sharedNotesRefetch,
  } = useQuery<GetSharedNotesData>(GET_SHARED_NOTES_QUERY, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    skip: !token,
  });

  useEffect(() => {
    if (data?.getNotes) {
      setNotes(data.getNotes);
    }
  }, [data]);

  useEffect(() => {
    if (sharedNotesData?.getSharedNotes) {
      setSharedNotes(sharedNotesData.getSharedNotes);
    }
  }, [sharedNotesData]);

  const handleRefresh = async () => {
    setIsRefreshing(true);

    try {
      if (type === "your") {
        await refetch();
      } else {
        await sharedNotesRefetch();
      }
    } catch (err) {
      console.error("Error refreshing notes:", err);
    } finally {
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  const isLoading = loading || sharedNotesLoading;
  const displayNotes = type === "your" ? notes : sharedNotes;

  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-y-auto p-8 md:p-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-foreground md:text-2xl">
            {t("notes.title", "Notes")}
          </h1>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 rounded-lg border-none bg-primary text-black px-4 py-2 text-sm transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={"16px"}
              className={isRefreshing ? "animate-spin" : ""}
            />
            {isRefreshing
              ? t("notes.refreshing", "Refreshing...")
              : t("notes.refresh", "Refresh")}
          </button>
        </div>

        {/* Switch */}
        <div className="flex overflow-hidden rounded-lg border border-border bg-background">
          <button
            className={`cursor-pointer whitespace-nowrap border-none px-4 py-2 text-sm transition-all hover:opacity-80 ${
              type === "your"
                ? "bg-primary text-black"
                : "bg-transparent text-foreground"
            }`}
            onClick={() => setType("your")}
          >
            {t("notes.yourNotes", "Your Notes")}
          </button>
          <button
            className={`cursor-pointer whitespace-nowrap border-none px-4 py-2 text-sm transition-all hover:opacity-80 ${
              type === "shared"
                ? "bg-primary text-black"
                : "bg-transparent text-foreground"
            }`}
            onClick={() => setType("shared")}
          >
            {t("notes.sharedNotes", "Shared Notes")}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
        {type === "your" && <CreateNoteCard onNoteCreated={handleRefresh} />}

        {isLoading ? (
          <div className="col-span-full flex items-center justify-center p-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : displayNotes.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center gap-4 p-16">
            <FileText className="h-16 w-16 text-muted-foreground" />
            <p className="text-xl text-muted-foreground">
              {type === "your"
                ? t("notes.noNotes", "No notes yet. Create your first note!")
                : t("notes.noSharedNotes", "No shared notes yet.")}
            </p>
          </div>
        ) : (
          <>
            {type === "shared"
              ? sharedNotes.map((sharedNote) => (
                  <div key={sharedNote.id} className="flex flex-col gap-2">
                    <div className="rounded-lg border-l-4 border-primary bg-card px-3 py-2">
                      <p className="m-0 text-xs text-muted-foreground">
                        {t("notes.sharedBy", "Shared by")}{" "}
                        <strong className="text-foreground">
                          {sharedNote.note.author.displayName}
                        </strong>
                      </p>
                    </div>
                    <NoteCard
                      note={sharedNote.note}
                      onClick={() => navigate(`/notes/${sharedNote.note.id}`)}
                    />
                  </div>
                ))
              : notes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onClick={() => navigate(`/notes/${note.id}`)}
                  />
                ))}
          </>
        )}
      </div>
    </div>
  );
}
