/**
 * @file Middleware allows you to run code before a request is completed. Then, based on
 * the incoming request, you can modify the response by rewriting, redirecting,
 * modifying the request or response headers, or responding directly.
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 */
import { defaultLocale, locales } from "src/i18n/config";
import { featureFlagsManager } from "src/services/featureFlags/FeatureFlagManager";

import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { isSessionExpired } from "./utils/authUtil";

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|sitemap|public|img|uswds|images|robots.txt|site.webmanifest).*)",
    /**
     * Fix issue where the pattern above was causing middleware
     * to not run on the homepage:
     */
    "/",
  ],
};

/*

  Well it turns out the the browser basically does all of this under the hood
  It does not send up expired cookies in the request

  * check for frontend auth token
  * if token does not exist, return existing response
  * if token exists and is not expired, return existing response
  * if token exists but is expired
    * delete the token
    * that may be enough for now, frontend can watch the cookie and respond based on that
*/
// const authenticationMiddleware = async (
//   request: NextRequest,
//   response: NextResponse,
// ) => {
//   if (!request.cookies.get("session")) {
//     return response;
//   }
//   const isExpired = await isSessionExpired();
//   if (!isExpired) {
//     return response;
//   }
//   request.cookies.delete("session");
//   response.cookies.delete("session");
//   return response;
// };

/**
 * Detect the user's preferred language and redirect to a localized route
 * if the preferred language isn't the current locale.
 */
const i18nMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  // Don't prefix the URL with the locale when the locale is the default locale (i.e. "en-US")
  localePrefix: "as-needed",
});

export default async function middleware(
  request: NextRequest,
): Promise<NextResponse> {
  // if (request.url.match(/\/api\//)) {

  // }
  // const responseWithI18n = i18nMiddleware(request);
  const baseResponse = request.url.match(/\/api\//)
    ? NextResponse.next()
    : featureFlagsManager.middleware(request, i18nMiddleware(request));
  // const responseWithAuthGate = await authenticationMiddleware(
  //   request,
  //   baseResponse,
  // );

  // in Next 15 there is an experimental `unauthorized` function that will send a 401
  // code to the client and display an unauthorized page
  // see https://nextjs.org/docs/app/api-reference/functions/unauthorized
  // For now we can set status codes on auth redirect errors here
  if (request.url.includes("/error")) {
    return new NextResponse(baseResponse.body, {
      status: 500,
      headers: baseResponse.headers,
    });
  }
  if (request.url.includes("/unauthorized")) {
    return new NextResponse(baseResponse.body, {
      status: 401,
      headers: baseResponse.headers,
    });
  }
  return baseResponse;
}
