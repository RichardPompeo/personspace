"use client";

import { useState } from "react";

import { Col, Row } from "antd";

import { MdLibraryAdd } from "react-icons/md";

import Layout from "../../layout";
import CardNotes from "../../components/CardNotes";

import { PrimaryButton } from "ui";
import {
  Container,
  ContentNotes,
  HeaderNotes,
  TitleNotes,
  Image,
} from "../../styles/pages/AnnotationsStyles";

export default function Annotations() {
  const [cardNotes, setCardNotes] = useState<any>([]);
  const colors = ["#80ed99", "#ffafcc", "#90e0ef", "#aa7bc3", "#98c1d9", "#ffd670"]

  const addCardNotes = () => {
    const color = colors[cardNotes.length % colors.length];
    const isCardNotes = <CardNotes color={color}/>;

    setCardNotes([...cardNotes, isCardNotes]);
  };

  return (
    <Layout>
      <Container>
        <PrimaryButton
          size="small"
          onClick={addCardNotes}
          color="#80ed99"
          icon={<MdLibraryAdd fontSize={18} fill="#000000" />}
        >
          New note
        </PrimaryButton>
        <ContentNotes>
          <HeaderNotes>
            <TitleNotes>
              Created annotations <span>6</span>
            </TitleNotes>
            <TitleNotes>
              Done <span>0</span>
            </TitleNotes>
          </HeaderNotes>
          <Row gutter={[105, 60]} justify="start" style={{ paddingBottom: "10em"}}>
            {cardNotes.map((item, key) => (
              <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8} key={key}>
                {item}
              </Col>
            ))}
          </Row>
        </ContentNotes>
      </Container>
    </Layout>
  );
}
