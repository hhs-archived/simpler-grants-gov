import { getSession } from "src/services/auth/session";

import { NextResponse } from "next/server";

export async function getUserSession(): Promise<NextResponse> {
  const currentSession = await getSession();
  if (currentSession) {
    return NextResponse.json(currentSession);
  } else {
    return NextResponse.json({ token: "" });
  }
}
