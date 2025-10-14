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
    if (typeof window === "undefined") {
      return true;
    }

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    // No mobile, sempre começa fechado
    if (!isDesktop) {
      return false;
    }

    // No desktop, recupera do localStorage ou usa true como padrão
    const savedState = localStorage.getItem("sidebar-open");
    if (savedState !== null) {
      return savedState === "true";
    }

    return true;
  });

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((previous) => {
      const newState = !previous;

      // Salva o estado apenas no desktop
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(min-width: 768px)").matches
      ) {
        localStorage.setItem("sidebar-open", String(newState));
      }

      return newState;
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const syncMenuState = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) {
        // Desktop: recupera do localStorage ou usa true
        const savedState = localStorage.getItem("sidebar-open");
        setIsMenuOpen(savedState !== null ? savedState === "true" : true);
      } else {
        // Mobile: sempre fecha
        setIsMenuOpen(false);
      }
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
    [isMenuOpen, toggleMenu],
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};
