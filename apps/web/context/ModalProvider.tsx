import { createContext, useState } from "react";

interface ModalProps {
  modal: Boolean;
  handleModalVisibility: () => void;
}

export const ModalContext = createContext<ModalProps>({modal: false, handleModalVisibility: () => true });

export const ModalProvider = ({ children }) => {
  const [modal, setModalVisibility] = useState<Boolean>(false);

  const handleModalVisibility = () => {
    return !modal ? setModalVisibility(true) : setModalVisibility(false);
  };

  return (
    <ModalContext.Provider value={{ modal, handleModalVisibility }}>
      {children}
    </ModalContext.Provider>
  );
};