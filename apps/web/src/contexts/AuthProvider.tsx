/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { useLazyQuery } from "@apollo/client/react";

import GET_USER_QUERY from "@/graphql/getUserQuery";
import type { GetUserData } from "@/graphql/types";

export interface AuthContextValue {
  isLogged: boolean;
  user: GetUserData["getUser"] | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
  isLogged: false,
  user: null,
  loading: true,
  refresh: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<GetUserData["getUser"] | null>(null);

  const [getUser, { loading }] = useLazyQuery<GetUserData>(GET_USER_QUERY);

  const logout = useCallback(() => {
    localStorage.removeItem("idToken");
    setIsLogged(false);
    setUser(null);
  }, []);

  const refresh = useCallback(async () => {
    try {
      const { data, error } = await getUser({
        context: {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("idToken")}`,
          },
        },
      });

      if (error || !data?.getUser) {
        setIsLogged(false);
        setUser(null);
        localStorage.removeItem("idToken");
        return;
      }

      setIsLogged(true);
      setUser(data.getUser);
    } catch (caughtError) {
      console.error("Failed to refresh auth state", caughtError);
      setIsLogged(false);
      setUser(null);
      localStorage.removeItem("idToken");
    }
  }, [getUser]);

  useEffect(() => {
    if (localStorage.getItem("idToken")) {
      void refresh();
    } else {
      setIsLogged(false);
      setUser(null);
    }
  }, [refresh]);

  const value = useMemo(
    () => ({
      isLogged,
      user,
      refresh,
      logout,
      loading,
    }),
    [isLogged, logout, refresh, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
