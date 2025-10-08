import { createContext, useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useLazyQuery } from "@apollo/client/react";

import GET_USER_QUERY from "../graphql/getUserQuery";
import type { GetUserData } from "../graphql/types";

interface AuthContextValue {
  isLogged: boolean;
  user: GetUserData["getUser"] | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  isLogged: false,
  user: null,
  loading: true,
  refresh: async () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
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

  return (
    <AuthContext.Provider value={{ isLogged, user, refresh, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
