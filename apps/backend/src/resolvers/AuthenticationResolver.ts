import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import { UserResolver } from "./UserResolver";

import { SignUpWithEmailAndPasswordInput } from "../dtos/inputs/SignUpWithEmailAndPasswordInput";
import { SignUpResponseModel } from "../dtos/models/SignUpModel";

@Resolver()
export class AuthenticationResolver {
  @Query(() => String)
  async helloWorld() {
    return "Hello World!";
  }

  @Mutation(() => SignUpResponseModel)
  signUpWithEmailAndPassword(
    @Arg("input") input: SignUpWithEmailAndPasswordInput
  ) {
    const auth = getAuth();

    const response = new Promise((resolve) => {
      createUserWithEmailAndPassword(auth, input.email, input.password)
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
}
