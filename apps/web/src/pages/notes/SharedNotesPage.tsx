import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FileText, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router";
import { useQuery } from "@apollo/client/react";

import { NoteShareType } from "../../types/notes/NoteShareType";
import LoadingSpinner from "../../components/LoadingSpinner";
import NoteShareCard from "@/components/notes/NoteShareCard";

import GET_SHARED_NOTES_QUERY from "../../graphql/notes/getSharedNotesQuery";

interface GetSharedNotesData {
  getSharedNotes: NoteShareType[];
}

export default function SharedNotesPage() {
  const [sharedNotes, setSharedNotes] = useState<NoteShareType[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const token = localStorage.getItem("idToken");

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
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (sharedNotesData?.getSharedNotes) {
      setSharedNotes(sharedNotesData.getSharedNotes);
    }
  }, [sharedNotesData]);

  const handleRefresh = async () => {
    setIsRefreshing(true);

    try {
      await sharedNotesRefetch();
    } catch (err) {
      console.error("Error refreshing shared notes:", err);
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
            {t("notes.sharedNotes", "Shared Notes")}
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
        {sharedNotesLoading ? (
          <div className="col-span-full flex items-center justify-center p-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : sharedNotes.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center gap-4 p-16">
            <FileText className="h-16 w-16 text-muted-foreground" />
            <p className="text-xl text-muted-foreground">
              {t("notes.noSharedNotes", "No shared notes yet.")}
            </p>
          </div>
        ) : (
          <>
            {sharedNotes.map((sharedNote) => (
              <NoteShareCard
                onRefetch={() => sharedNotesRefetch()}
                key={sharedNote.id}
                sharedNote={sharedNote}
                onClick={() => navigate(`/shared-notes/${sharedNote.note.id}`)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
