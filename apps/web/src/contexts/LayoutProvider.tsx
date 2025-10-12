/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

interface LayoutContextValue {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export const LayoutContext = createContext<LayoutContextValue>({
  isMenuOpen: false,
  toggleMenu: () => {},
});

export const LayoutProvider = ({ children }: PropsWithChildren) => {
  const [isMenuOpen, setIsMenuOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(min-width: 768px)").matches;
    }
    return true;
  });

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((previous) => !previous);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const syncMenuState = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMenuOpen(event.matches);
    };

    syncMenuState(mediaQuery);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncMenuState);
      return () => mediaQuery.removeEventListener("change", syncMenuState);
    }

    mediaQuery.addListener(syncMenuState);
    return () => mediaQuery.removeListener(syncMenuState);
  }, []);

  const value = useMemo(
    () => ({
      isMenuOpen,
      toggleMenu,
    }),
    [isMenuOpen, toggleMenu]
  );

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};
