"use client";

import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ImFilesEmpty } from "react-icons/im";
import { AiOutlineSync } from "react-icons/ai";
import { useRouter } from "next/navigation";

import { useQuery } from "@apollo/client";

import { Col, Row } from "antd";

import Layout from "../../layout";

import {
  Container,
  Title,
  Content,
  Header,
  Switch,
  SwitchText,
  SharedNoteData,
  SharedNoteTitle,
  Button,
  LeftSide,
} from "./NotesStyle";

import { AuthContext } from "../../contexts/AuthProvider";
import { sendNotification } from "../../utils/notifications";
import { NoteType } from "../../types/NoteType";

import Note from "../../components/notes/Note";
import CreateNote from "../../components/notes/CreateNote";
import ExpandedNoteModal from "../../components/notes/ExpandedNoteModal";

import GET_NOTES_QUERY from "../../graphql/getNotesQuery";

export default function Annotations() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [sharedNotes, setSharedNotes] = useState<NoteType[]>([]);
  const [type, setType] = useState("your");
  const [expandedNote, setExpandedNote] = useState<NoteType>();
  const [expandedModalOpen, setExpandedModalOpen] = useState(false);

  const router = useRouter();
  const {
    isLogged,
    loading: authLoading,
    token,
    user,
  } = useContext(AuthContext);

  const { data, loading, error, refetch } = useQuery(GET_NOTES_QUERY, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const { t } = useTranslation();

  const handleOnUpdate = () => {
    refetch();
  };

  const handleOnDelete = () => {
    refetch();
    setExpandedModalOpen(false);
  };

  const handleOnExpand = (note: NoteType) => {
    setExpandedNote(note);
    setExpandedModalOpen(true);
  };

  useEffect(() => {
    if (!isLogged && !authLoading) {
      router.push("/");
    }
  }, [isLogged, authLoading, router]);

  useEffect(() => {
    if (!loading && error) {
      sendNotification("error", "Error", "Error loading the notes.");
    } else if (!loading && data) {
      setNotes(data.getNotes);
    }
  }, [data, error, loading]);

  return (
    <Layout>
      <Container>
        <Header>
          <LeftSide>
            <Button>
              <AiOutlineSync onClick={() => refetch()} size={24} />
            </Button>
            <Title>
              {t("annotations.title")} (
              {type === "your" ? notes.length : sharedNotes.length})
            </Title>
          </LeftSide>
          <Switch>
            <SwitchText
              onClick={() => setType("your")}
              active={type === "your"}
            >
              {t("annotations.switch.your")}
            </SwitchText>
            <SwitchText
              onClick={() => setType("shared")}
              active={type === "shared"}
            >
              {t("annotations.switch.shared")}
            </SwitchText>
          </Switch>
        </Header>
        <Content>
          {type === "your" && (
            <Row gutter={[16, 16]}>
              {notes && (
                <>
                  {notes.map((note: NoteType) => {
                    return (
                      <Col xl={8} lg={8} md={12} sm={24} xs={24} key={note.id}>
                        <Note
                          onExpand={handleOnExpand}
                          onUpdate={handleOnUpdate}
                          note={note}
                        />
                      </Col>
                    );
                  })}
                </>
              )}
              <Col xl={8} lg={8} md={12} sm={24} xs={24}>
                <CreateNote
                  authorId={user && user.id}
                  token={token}
                  onCreate={handleOnUpdate}
                />
              </Col>
            </Row>
          )}
          {type === "shared" && (
            <Row gutter={[16, 16]}>
              {sharedNotes.length >= 1 ? (
                <>
                  {sharedNotes.map((note: NoteType, index: number) => {
                    return (
                      <Col xl={8} lg={8} md={12} sm={24} xs={24} key={index}>
                        <Note
                          onExpand={handleOnExpand}
                          onUpdate={handleOnUpdate}
                          note={note}
                        />
                      </Col>
                    );
                  })}
                </>
              ) : (
                <Col xl={8} lg={8} md={12} sm={24} xs={24}>
                  <SharedNoteData>
                    <ImFilesEmpty size={56} fill="#2d2e2e" />
                    <SharedNoteTitle>
                      {t("annotations.sharedNotes.noData")}
                    </SharedNoteTitle>
                  </SharedNoteData>
                </Col>
              )}
            </Row>
          )}
        </Content>
      </Container>
      {expandedNote && (
        <ExpandedNoteModal
          authorId={user && user.id}
          note={expandedNote}
          open={expandedModalOpen}
          onClose={() => setExpandedModalOpen(false)}
          onUpdate={handleOnUpdate}
          onDelete={handleOnDelete}
        />
      )}
    </Layout>
  );
}
