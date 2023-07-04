"use client";

import { Col, Row } from "antd";

import { MdLibraryAdd } from "react-icons/md";

import Layout from "../../layout";

import { PrimaryButton } from "ui";
import {
  Container,
  ContentNotes,
  HeaderNotes,
  TitleNotes,
  Title,
  Text,
} from "../../styles/pages/AnnotationsStyles";

import CardNotes from "../../components/CardNotes";

export default function Annotations() {
  return (
    <Layout>
      <Container>
        <PrimaryButton
          size="small"
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

          <Row gutter={[105, 60]} justify="center">
            <Col span={8} xs={{ span: 12 }} xxl={{ span: 8 }}>
              <CardNotes color="#80ed99">
                <Title>Sobre meu curso</Title>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                  asperiores commodi fuga molestias architecto aspernatur beatae
                  necessitatibus libero, vel molestiae!
                </Text>
              </CardNotes>
            </Col>
            <Col
              span={8}
              xs={{ span: 12 }}
              sm={{ span: 9 }}
              lg={{ span: 9 }}
              xl={{ span: 9 }}
              xxl={{ span: 8 }}
            >
              <CardNotes color="#ffafcc">
                <Title>Roteiro</Title>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Text>
              </CardNotes>
            </Col>
            <Col span={8} xs={{ span: 12 }} xxl={{ span: 8 }}>
              <CardNotes color="#90e0ef">
                <Title>Filmes para assistir</Title>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                  asperiores commodi fuga molestias architecto aspernatur beatae
                  necessitatibus libero, vel molestiae!
                </Text>
              </CardNotes>
            </Col>
            <Col
              span={8}
              xs={{ span: 12 }}
              sm={{ span: 9 }}
              lg={{ span: 9 }}
              xl={{ span: 9 }}
              xxl={{ span: 8 }}
            >
              <CardNotes color="#aa7bc3">
                <Title>Terminar livro</Title>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                  asperiores commodi fuga molestias architecto aspernatur beatae
                  necessitatibus libero, vel molestiae!
                </Text>
              </CardNotes>
            </Col>
            <Col
              span={8}
              xs={{ span: 12 }}
              sm={{ span: 9 }}
              lg={{ span: 9 }}
              xl={{ span: 9 }}
              xxl={{ span: 8 }}
            >
              <CardNotes color="#98c1d9">
                <Title>Tarefas do dia a dia</Title>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                  asperiores commodi fuga molestias architecto aspernatur beatae
                  necessitatibus libero, vel molestiae!
                </Text>
              </CardNotes>
            </Col>
            <Col
              span={8}
              xs={{ span: 12 }}
              sm={{ span: 9 }}
              lg={{ span: 9 }}
              xl={{ span: 9 }}
              xxl={{ span: 8 }}
            >
              <CardNotes color="#ffd670">
                <Title>Conclusões curso</Title>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                  asperiores commodi fuga molestias architecto aspernatur beatae
                  necessitatibus libero, vel molestiae!
                </Text>
              </CardNotes>
            </Col>
          </Row>
        </ContentNotes>
      </Container>
    </Layout>
  );
};
