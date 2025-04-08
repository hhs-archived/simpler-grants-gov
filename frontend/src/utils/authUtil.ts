"server-only";

import { getClientSession } from "src/services/auth/session";

// import { decrypt } from "src/services/auth/sessionUtils";
// import { SimplerJwtPayload } from "src/types/authTypes";

export const isSessionExpired = async (): Promise<boolean> => {
  const userSession = await getClientSession();
  if (!userSession?.expiresAt) {
    return false;
  }
  return userSession.expiresAt > new Date(Date.now());
};

// export const decryptClientToken = async (
//   jwt: string,
// ): Promise<SimplerJwtPayload | null> => {
//   const payload = await decrypt<Uint8Array>(
//     jwt,
//     clientJwtKey,
//     CLIENT_JWT_ENCRYPTION_ALGORITHM,
//   );
//   if (!payload || !payload.token) return null;
//   return payload as SimplerJwtPayload;
// };
