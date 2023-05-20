import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import { SignUpWithEmailAndPasswordInput } from "../dtos/inputs/SignUpWithEmailAndPasswordInput";
import { SignUpResponseModel } from "../dtos/models/SignUpModel";

@Resolver()
export class UserResolver {
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
