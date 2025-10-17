/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  createUserWithEmailAndPassword,
  type UserCredential,
} from "firebase/auth";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { auth } from "@/config/firebase";
import GET_USER_QUERY from "@/graphql/users/getUserQuery";
import CREATE_USER_MUTATION from "@/graphql/users/createUser";
import type {
  GetUserData,
  CreateUserData,
  CreateUserVariables,
} from "@/graphql/users/types";

export interface AuthContextValue {
  isLogged: boolean;
  user: GetUserData["getUser"] | null;
  firebaseUser: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (
    email: string,
    password: string,
    displayName: string,
  ) => Promise<UserCredential>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue>({
  isLogged: false,
  user: null,
  firebaseUser: null,
  loading: true,
  signIn: async () => {
    throw new Error("AuthContext not initialized");
  },
  signUp: async () => {
    throw new Error("AuthContext not initialized");
  },
  logout: async () => {
    throw new Error("AuthContext not initialized");
  },
  refresh: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<GetUserData["getUser"] | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [getUser, { loading: getUserLoading }] = useLazyQuery<GetUserData>(
    GET_USER_QUERY,
    { fetchPolicy: "network-only" },
  );

  const [createUserMutation] = useMutation<CreateUserData, CreateUserVariables>(
    CREATE_USER_MUTATION,
  );

  const fetchUserProfile = useCallback(
    async (firebaseUser: User) => {
      try {
        const idToken = await firebaseUser.getIdToken(true);
        localStorage.setItem("idToken", idToken);
        const { data, error } = await getUser({
          context: {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          },
        });
        if (error || !data?.getUser) {
          setUser(null);
          return;
        }
        setUser(data.getUser);
        setIsLogged(true);
      } catch {
        setUser(null);
        setIsLogged(false);
      }
    },
    [getUser],
  );

  const refresh = useCallback(async () => {
    if (firebaseUser) await fetchUserProfile(firebaseUser);
    else setUser(null);
  }, [firebaseUser, fetchUserProfile]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setFirebaseUser(userCredential.user);
      await fetchUserProfile(userCredential.user);
      setLoading(false);
      return userCredential;
    },
    [fetchUserProfile],
  );

  const signUp = useCallback(
    async (email: string, password: string, displayName: string) => {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setFirebaseUser(userCredential.user);
      try {
        await createUserMutation({
          variables: {
            input: {
              firebaseId: userCredential.user.uid,
              displayName,
              email,
            },
          },
        });
        await fetchUserProfile(userCredential.user);
      } catch {
        await fetchUserProfile(userCredential.user);
      }
      setLoading(false);
      return userCredential;
    },
    [createUserMutation, fetchUserProfile],
  );

  const logout = useCallback(async () => {
    setLoading(true);
    await signOut(auth);
    setIsLogged(false);
    setUser(null);
    setFirebaseUser(null);
    localStorage.removeItem("idToken");
    setLoading(false);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        await fetchUserProfile(user);
      } else {
        setIsLogged(false);
        setUser(null);
        localStorage.removeItem("idToken");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [fetchUserProfile]);

  const value = useMemo(
    () => ({
      isLogged,
      user,
      firebaseUser,
      loading: loading || getUserLoading,
      signIn,
      signUp,
      logout,
      refresh,
    }),
    [
      isLogged,
      user,
      firebaseUser,
      loading,
      getUserLoading,
      signIn,
      signUp,
      logout,
      refresh,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
