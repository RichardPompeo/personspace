export interface AuthUser {
  uid: string;
  email: string | null;
  idToken: string;
}

export interface AuthError {
  code?: string | null;
  message?: string | null;
}

export interface SignInWithEmailAndPasswordData {
  signInWithEmailAndPassword: {
    success: boolean;
    user?: AuthUser | null;
    error?: AuthError | null;
  };
}

export interface SignInWithEmailAndPasswordVariables {
  input: {
    email: string;
    password: string;
  };
}

export interface SignUpWithEmailAndPasswordData {
  signUpWithEmailAndPassword: {
    success: boolean;
    user?: AuthUser | null;
    error?: AuthError | null;
  };
}

export interface SignUpWithEmailAndPasswordVariables {
  input: {
    email: string;
    password: string;
    displayName: string;
  };
}

export interface GetUserData {
  getUser: {
    id: string;
    displayName: string;
    email: string;
  };
}

export interface CreateUserData {
  createUser: {
    id: string;
    displayName: string;
    email: string | null;
  };
}

export interface CreateUserVariables {
  input: {
    firebaseId: string;
    displayName: string;
  };
}
