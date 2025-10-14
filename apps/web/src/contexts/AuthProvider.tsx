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

  const [getUser, { loading: getUserLoading }] =
    useLazyQuery<GetUserData>(GET_USER_QUERY);

  const [createUserMutation] = useMutation<CreateUserData, CreateUserVariables>(
    CREATE_USER_MUTATION,
  );

  const signIn = useCallback(async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, displayName: string) => {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // Create user profile in backend database
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
        console.log("User profile created successfully in database");
      } catch (error) {
        console.error("Failed to create user profile in backend:", error);
        // Note: Firebase user was already created, but backend profile creation failed
        // The user can still sign in, but may need to complete profile setup later
      }

      return userCredential;
    },
    [createUserMutation],
  );

  const logout = useCallback(async () => {
    await signOut(auth);
    setIsLogged(false);
    setUser(null);
    setFirebaseUser(null);
    localStorage.removeItem("idToken");
  }, []);

  const fetchUserProfile = useCallback(
    async (firebaseUser: User) => {
      try {
        const idToken = await firebaseUser.getIdToken();
        localStorage.setItem("idToken", idToken);

        const { data, error } = await getUser({
          context: {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          },
        });

        if (error || !data?.getUser) {
          console.warn("Failed to fetch user profile:", error);
          setUser(null);
          return;
        }

        setUser(data.getUser);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setUser(null);
      }
    },
    [getUser],
  );

  const refresh = useCallback(async () => {
    if (firebaseUser) {
      await fetchUserProfile(firebaseUser);
    }
  }, [firebaseUser, fetchUserProfile]);

  // Firebase auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      setLoading(true);

      if (user) {
        setIsLogged(true);
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
