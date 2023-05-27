import { getAuth } from "firebase-admin/auth";

interface AuthorizationResponse {
  success: boolean;
  error?: { message?: string; code?: string };
  uid?: string;
  email?: string;
}

export class Authorization {
  static async verify(bearerToken): Promise<AuthorizationResponse> {
    return new Promise((resolve) => {
      if (
        (!bearerToken &&
          !bearerToken.split(" ") &&
          !bearerToken.split(" ")[1]) ||
        bearerToken.split(" ")[0] !== "Bearer"
      ) {
        return resolve({
          success: false,
          error: { message: "Token malformmated" },
        });
      }

      const token = bearerToken.split(" ")[1];

      getAuth()
        .verifyIdToken(token)
        .then((decodedToken) => {
          const uid = decodedToken.uid;
          const email = decodedToken.email;

          return resolve({ success: true, uid, email });
        })
        .catch((error) => {
          return resolve({
            success: false,
            error: { message: error.message, code: error.code },
          });
        });
    });
  }
}
