import { createContext, useState } from "react";

interface ModalProps {
  signUpModal: Boolean;
  signInModal: Boolean;
  handleSignUpModalVisibility: () => void;
  handleSignInModalVisibility: () => void;
}

export const ModalContext = createContext<ModalProps>({signUpModal: false, signInModal: false, handleSignUpModalVisibility: () => true, handleSignInModalVisibility: () => true });

export const ModalProvider = ({ children }) => {
  const [signUpModal, setSignUpModalVisibility] = useState<Boolean>(false);
  const [signInModal, setSignInModalVisibility] = useState<Boolean>(false);

  const handleSignUpModalVisibility = () => {
    return !signUpModal ? setSignUpModalVisibility(true) : setSignUpModalVisibility(false);
  };

  const handleSignInModalVisibility = () => {
    return !signInModal ? setSignInModalVisibility(true) : setSignInModalVisibility(false);
  };

  return (
    <ModalContext.Provider value={{ signUpModal, signInModal, handleSignUpModalVisibility, handleSignInModalVisibility }}>
      {children}
    </ModalContext.Provider>
  );
};