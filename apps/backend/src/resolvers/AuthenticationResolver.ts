import { Arg, Mutation, Query, Resolver } from "type-graphql";

import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { UserResolver } from "./UserResolver";

import { SignUpWithEmailAndPasswordInput } from "../dtos/inputs/SignUpWithEmailAndPasswordInput";
import { SignInWithEmailAndPasswordInput } from "../dtos/inputs/SignInWithEmailAndPassword";

import { AuthenticationResponseModel } from "../dtos/models/AuthenticationResponseModel";

@Resolver()
export class AuthenticationResolver {
  auth: Auth;

  constructor() {
    this.auth = getAuth();
  }

  @Query(() => String)
  async helloWorld() {
    return "Hello World!";
  }

  @Mutation(() => AuthenticationResponseModel)
  signUpWithEmailAndPassword(
    @Arg("input") input: SignUpWithEmailAndPasswordInput
  ) {
    const response = new Promise((resolve) => {
      createUserWithEmailAndPassword(this.auth, input.email, input.password)
        .then(async (userCredential) => {
          const user = userCredential.user;

          await UserResolver.createUser({
            displayName: input.displayName,
            firebaseId: user.uid,
          });

          resolve({
            success: true,
            user: {
              uid: user.uid,
              email: user.email,
              idToken: user.getIdToken(),
            },
          });
        })
        .catch((error) => {
          const code = error.code;
          const message = error.message;

          resolve({
            success: false,
            error: { code, message },
          });
        });
    });

    return response;
  }

  @Mutation(() => AuthenticationResponseModel)
  signInWithEmailAndPassword(
    @Arg("input") input: SignInWithEmailAndPasswordInput
  ) {
    const response = new Promise((resolve) => {
      signInWithEmailAndPassword(this.auth, input.email, input.password)
        .then((userCredential) => {
          const user = userCredential.user;

          resolve({
            success: true,
            user: {
              uid: user.uid,
              email: user.email,
              idToken: user.getIdToken(),
            },
          });
        })
        .catch((error) => {
          const code = error.code;
          const message = error.message;

          resolve({
            success: false,
            error: { code, message },
          });
        });
    });

    return response;
  }
}
