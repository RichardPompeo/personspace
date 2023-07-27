"use client";

import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

import { useQuery } from "@apollo/client";

import { Col, Row } from "antd";

import Layout from "../../layout";

import { Container, Title, Content } from "./NotesStyle";

import Note from "../../components/notes/Note";
import CreateNote from "../../components/notes/CreateNote";

import { AuthContext } from "../../contexts/AuthProvider";

import GET_NOTES_QUERY from "../../graphql/getNotesQuery";
import { sendNotification } from "../../utils/notifications";

export default function Annotations() {
  const [notes, setNotes] = useState<any>([]);

  const router = useRouter();
  const {
    isLogged,
    loading: authLoading,
    token,
    user,
  } = useContext(AuthContext);

  const { data, loading, error } = useQuery(GET_NOTES_QUERY, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const { t } = useTranslation();

  const handleOnCreate = (note) => {
    console.log(note);
    setNotes((prev) => [...prev, note]);
  };

  const handleOnDelete = (deletedNote) => {
    const newNotes = notes.filter((note) => {
      return note.id !== deletedNote.id;
    });

    setNotes(newNotes);
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
        <Title>
          {t("annotations.title")} {notes && `(${notes.length})`}
        </Title>
        <Content>
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
        </Content>
      </Container>
    </Layout>
  );
}
