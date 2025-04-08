// anything using the node crypto library goes in here in order to allow for other
// session functionality to be used in middleware

import "server-only";

import { createPublicKey, KeyObject } from "crypto";
import { environment } from "src/constants/environments";
import {
  API_JWT_ENCRYPTION_ALGORITHM,
  decrypt,
} from "src/services/auth/sessionUtils";
import { UserSession } from "src/types/authTypes";

import { getClientSession } from "./session";

export type EncryptionKeyTypes = KeyObject | Uint8Array;

let loginGovJwtKey: KeyObject;

const decryptLoginGovToken = async (
  jwt: string,
): Promise<UserSession | null> => {
  const payload = await decrypt<KeyObject>(
    jwt,
    loginGovJwtKey,
    API_JWT_ENCRYPTION_ALGORITHM,
  );
  return (payload as UserSession) ?? null;
};

// isolate encoding behavior from file execution
const initializeLoginGovSessionSecret = () => {
  if (!environment.API_JWT_PUBLIC_KEY) {
    // eslint-disable-next-line
    console.debug("Login.gov session key not present");
    return;
  }
  // eslint-disable-next-line
  console.debug("Initializing Login.gov Session Secret");
  loginGovJwtKey = createPublicKey(environment.API_JWT_PUBLIC_KEY);
};

// returns the necessary user info from decrypted login gov token
// plus client token and expiration
export const getSession = async (): Promise<UserSession | null> => {
  if (!loginGovJwtKey) {
    initializeLoginGovSessionSecret();
  }
  const clientJwtPayload = await getClientSession();
  if (!clientJwtPayload) {
    return null;
  }
  const { token, exp } = clientJwtPayload;
  const session = await decryptLoginGovToken(token);
  return session
    ? {
        ...session,
        token,
        exp,
      }
    : null;
};
