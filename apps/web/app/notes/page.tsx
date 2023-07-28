"use client";

import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ImFilesEmpty } from "react-icons/im";
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

import Note from "../../components/notes/Note";
import CreateNote from "../../components/notes/CreateNote";

import { AuthContext } from "../../contexts/AuthProvider";
import { sendNotification } from "../../utils/notifications";

import GET_NOTES_QUERY from "../../graphql/getNotesQuery";
import { AiOutlineSync } from "react-icons/ai";

export default function Annotations() {
  const [notes, setNotes] = useState<any>([]);
  const [sharedNotes, setSharedNotes] = useState<any>([]);
  const [type, setType] = useState("your");

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

  const handleOnCreate = (note) => {
    setNotes((prev) => [...prev, note]);
  };

  const handleOnDelete = (deletedNote) => {
    const newNotes = notes.filter((note) => {
      return note.id !== deletedNote.id;
    });

    setNotes(newNotes);
  };

  /* const handleOnRefetch = async () => {
    const { data } = await refetch({
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    if (error) {
      return sendNotification("error", "Error", "Error loading the notes.");
    }

    setNotes(data.getNotes);
    sendNotification("success", "Success", "Successfully loaded notes.");
  }; */

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
                  {notes.map((note, index) => {
                    return (
                      <Col xl={8} lg={8} md={12} sm={24} xs={24} key={index}>
                        <Note onDelete={handleOnDelete} note={note} />
                      </Col>
                    );
                  })}
                </>
              )}
              <Col xl={8} lg={8} md={12} sm={24} xs={24}>
                <CreateNote
                  authorId={user && user.id}
                  token={token}
                  onCreate={handleOnCreate}
                />
              </Col>
            </Row>
          )}
          {type === "shared" && (
            <Row gutter={[16, 16]}>
              {sharedNotes.length >= 1 ? (
                <>
                  {sharedNotes.map((note, index) => {
                    return (
                      <Col xl={8} lg={8} md={12} sm={24} xs={24} key={index}>
                        <Note onDelete={handleOnDelete} note={note} />
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
    </Layout>
  );
}
