import { createContext, useCallback, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import GET_USER_QUERY from "../graphql/getUserQuery";

const AuthContext = createContext<{
  isLogged: boolean;
  user: any;
  loading: boolean;
  refresh: any;
  logout: any;
}>({
  isLogged: false,
  user: null,
  loading: true,
  refresh: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: any) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);

  const [getUser, { loading }] = useLazyQuery(GET_USER_QUERY);

  const logout = useCallback(() => {
    localStorage.removeItem("idToken");

    setIsLogged(false);
    setUser(null);
  }, []);

  const refresh = useCallback(() => {
    getUser({
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
      },
    })
      .then((data) => {
        if (data.error) {
          setIsLogged(false);
          setUser(null);

          localStorage.removeItem("idToken");
        } else {
          setIsLogged(true);
          setUser(data.data.getUser);
        }
      })
      .catch(() => {
        setIsLogged(false);
        setUser(null);

        localStorage.removeItem("idToken");
      });
  }, [getUser]);

  useEffect(() => {
    if (localStorage.getItem("idToken")) {
      refresh();
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
