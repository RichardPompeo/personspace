import { createContext, useState } from "react";

interface LayoutProps {
  menu: Boolean;
  handleMenuVisibility: () => void;
}

export const LayoutContext = createContext<LayoutProps>({
  menu: false,
  handleMenuVisibility: () => false,
});

export const LayoutProvider = ({ children }) => {
  const [menu, setMenu] = useState<Boolean>(false);

  const handleMenuVisibility = () => {
    return menu ? setMenu(false) : setMenu(true);
  };

  return (
    <LayoutContext.Provider value={{ menu, handleMenuVisibility }}>
      {children}
    </LayoutContext.Provider>
  );
};
