"use client";

import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

import { Col, Row } from "antd";

import Layout from "../../layout";

import { Container, Title, Content } from "./AnnotationsStyles";

import Note from "../../components/annotations/Note";
import CreateNote from "../../components/annotations/CreateNote";

import { AuthContext } from "../../contexts/AuthProvider";

export default function Annotations() {
  const router = useRouter();
  const { isLogged, loading } = useContext(AuthContext);

  const { t } = useTranslation();

  const [cardNotes, setCardNotes] = useState<any>([]);

  const addCardNotes = () => {
    const isCardNotes = (
      <Note
        title={t("annotations.notes.addTitle")}
        description={t("annotations.notes.addDescription")}
      />
    );

    setCardNotes([...cardNotes, isCardNotes]);
  };

  useEffect(() => {
    if (!isLogged && !loading) {
      router.push("/");
    }
  }, [isLogged, loading, router]);

  return (
    <Layout>
      <Container>
        <Title>
          {t("annotations.title")} ({cardNotes.length || "0"})
        </Title>
        <Content>
          <Row gutter={[16, 16]}>
            {cardNotes.map((item, index) => {
              return (
                <Col xl={8} lg={8} md={12} sm={24} xs={24} key={index}>
                  {item}
                </Col>
              );
            })}
            <Col xl={8} lg={8} md={12} sm={24} xs={24}>
              <CreateNote onClick={addCardNotes} />
            </Col>
          </Row>
        </Content>
      </Container>
    </Layout>
  );
}
