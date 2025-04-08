import "server-only";

import { environment } from "src/constants/environments";
import {
  CLIENT_JWT_ENCRYPTION_ALGORITHM,
  decrypt,
  encrypt,
  newExpirationDate,
} from "src/services/auth/sessionUtils";
import { SimplerJwtPayload } from "src/types/authTypes";
import { encodeText } from "src/utils/generalUtils";

import { cookies } from "next/headers";

let clientJwtKey: Uint8Array;

const initializeClientSessionSecret = () => {
  if (!environment.SESSION_SECRET) {
    // eslint-disable-next-line
    console.debug("Client session key not present");
    return;
  }
  // eslint-disable-next-line
  console.debug("Initializing Client Session Secret");
  clientJwtKey = encodeText(environment.SESSION_SECRET);
};

const decryptClientToken = async (
  jwt: string,
): Promise<SimplerJwtPayload | null> => {
  const payload = await decrypt<Uint8Array>(
    jwt,
    clientJwtKey,
    CLIENT_JWT_ENCRYPTION_ALGORITHM,
  );
  if (!payload || !payload.token) return null;
  return payload as SimplerJwtPayload;
};

export const getClientSession = async (): Promise<SimplerJwtPayload | null> => {
  if (!clientJwtKey) {
    initializeClientSessionSecret();
  }
  const cookie = await cookies();
  const sessionToken = cookie.get("session")?.value;
  if (!sessionToken) return null;
  return decryptClientToken(sessionToken);
};

// sets client token on cookie
export const createSession = async (token: string) => {
  if (!clientJwtKey) {
    initializeClientSessionSecret();
  }
  const expiresAt = newExpirationDate();
  const session = await encrypt(token, expiresAt, clientJwtKey);
  const cookie = await cookies();
  cookie.set("session", session, {
    httpOnly: true,
    secure: environment.ENVIRONMENT === "prod",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
};
