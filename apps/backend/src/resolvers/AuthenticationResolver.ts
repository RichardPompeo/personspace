import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { Auth, createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import { UserResolver } from "./UserResolver";

import { SignUpWithEmailAndPasswordInput } from "../dtos/inputs/SignUpWithEmailAndPasswordInput";

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
    @Arg("input") input: SignUpWithEmailAndPasswordInput,
  ) {
    const response = new Promise((resolve) => {
      createUserWithEmailAndPassword(this.auth, input.email, input.password)
        .then(async (userCredential) => {
          const user = userCredential.user;

          // Create user resolver instance and call createUser
          const userResolver = new UserResolver();
          await userResolver.createUser({
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
}
