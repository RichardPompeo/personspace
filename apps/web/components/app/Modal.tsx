import { IoIosCloseCircle } from "react-icons/io";
import { CloseButton, Container, ContentModal } from "./ModalStyles";

interface ModalProps {
  children: any;
  fullScreen?: boolean;
  open: boolean;
  onClose: () => void;
}

export default function Modal({
  children,
  fullScreen,
  open,
  onClose,
}: ModalProps) {
  return (
    <Container open={open}>
      <ContentModal fullScreen={fullScreen}>
        <CloseButton onClick={onClose}>
          <IoIosCloseCircle fontSize={25} />
        </CloseButton>
        {children}
      </ContentModal>
    </Container>
  );
}
