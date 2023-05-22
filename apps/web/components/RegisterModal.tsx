import FormSignUp from "./FormSignUp";
import { Container, ContentModal, Title } from "../styles/components/RegisterModal"

export default function RegisterModal() {
  return (
    <Container>
      <ContentModal>
        <Title>Sign up</Title>
        
        <FormSignUp />
      </ContentModal>
    </Container>
  )
};