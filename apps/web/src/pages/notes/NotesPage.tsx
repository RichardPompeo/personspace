import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FileText, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router";
import { useQuery } from "@apollo/client/react";

import { NoteType } from "../../types/notes/NoteType";
import LoadingSpinner from "../../components/LoadingSpinner";
import CreateNoteCard from "../../components/notes/CreateNoteCard";
import NoteCard from "../../components/notes/NoteCard";

import GET_NOTES_QUERY from "../../graphql/notes/getNotesQuery";

interface GetNotesData {
  getNotes: NoteType[];
}

export default function NotesPage() {
  const [notes, setNotes] = useState<NoteType[]>([]);
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

  useEffect(() => {
    if (data?.getNotes) {
      setNotes(data.getNotes);
    }
  }, [data]);

  const handleRefresh = async () => {
    setIsRefreshing(true);

    try {
      await refetch();
    } catch (err) {
      console.error("Error refreshing notes:", err);
    } finally {
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

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
      </div>

      {/* Content */}
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
        <CreateNoteCard onNoteCreated={handleRefresh} />

        {loading ? (
          <div className="col-span-full flex items-center justify-center p-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : notes.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center gap-4 p-16">
            <FileText className="h-16 w-16 text-muted-foreground" />
            <p className="text-xl text-muted-foreground">
              {t("notes.noNotes", "No notes yet. Create your first note!")}
            </p>
          </div>
        ) : (
          <>
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onClick={() => navigate(`/notes/${note.id}`)}
                onRefetch={() => refetch()}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
