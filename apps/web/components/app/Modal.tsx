import { IoIosCloseCircle } from "react-icons/io";
import { CloseButton, Container, ContentModal } from "./ModalStyles";

interface ModalProps {
  children: any;
  open: boolean;
  onClose: () => void;
}

export default function Modal({ children, open, onClose }: ModalProps) {
  return (
    <Container open={open}>
      <ContentModal>
        <CloseButton onClick={onClose}>
          <IoIosCloseCircle fontSize={25} />
        </CloseButton>
        {children}
      </ContentModal>
    </Container>
  );
}
