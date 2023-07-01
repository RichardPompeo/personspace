"use client";

import { Col, Row } from "antd";

import { MdLibraryAdd, MdEditSquare } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoIosMore } from "react-icons/io";

import { PrimaryButton } from "ui";

import Layout from "../../layout";
import {
  Container,
  ContentNotes,
  HeaderNotes,
  TitleNotes,
  CardNotes,
  Title,
  Text,
  NotesTools,
} from "../../styles/pages/AnnotationsStyles";

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

          <Row wrap justify="space-between">
            <Col>
              <CardNotes>
                <NotesTools color="#80ed99">
                  <IoIosMore fill="#161a1d" fontSize={19} />
                </NotesTools>
                <Title>Sobre meu curso</Title>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                  asperiores commodi fuga molestias architecto aspernatur beatae
                  necessitatibus libero, vel molestiae!
                </Text>
              </CardNotes>
              <CardNotes>
                <NotesTools color="#ffafcc">
                  <IoIosMore fill="#161a1d" fontSize={19} />
                </NotesTools>
                <Title>Roteiro</Title>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Text>
              </CardNotes>
            </Col>
            <Col>
              <CardNotes>
                <NotesTools color="#90e0ef">
                  <IoIosMore fill="#161a1d" fontSize={19} />
                </NotesTools>
                <Title>Filmes para assistir</Title>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                  asperiores commodi fuga molestias architecto aspernatur beatae
                  necessitatibus libero, vel molestiae!
                </Text>
              </CardNotes>
              <CardNotes>
                <NotesTools color="#aa7bc3">
                  <IoIosMore fill="#161a1d" fontSize={19} />
                </NotesTools>
                <Title>Terminar livro</Title>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                  asperiores commodi fuga molestias architecto aspernatur beatae
                  necessitatibus libero, vel molestiae!
                </Text>
              </CardNotes>
            </Col>
            <Col>
              <CardNotes>
                <NotesTools color="#98c1d9">
                  <IoIosMore fill="#161a1d" fontSize={19} />
                </NotesTools>
                <Title>Tarefas do dia a dia</Title>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                  asperiores commodi fuga molestias architecto aspernatur beatae
                  necessitatibus libero, vel molestiae!
                </Text>
              </CardNotes>
              <CardNotes>
                <NotesTools color="#ffd670">
                  <IoIosMore fill="#161a1d" fontSize={19} />
                </NotesTools>
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
}
