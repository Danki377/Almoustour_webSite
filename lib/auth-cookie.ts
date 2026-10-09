// Shared by the middleware (edge) and the server auth module.

/** Better Auth cookies are named `am.session_token` (`__Secure-am.session_token` over HTTPS). */
export const AUTH_COOKIE_PREFIX = "am";

/** Anonymous visitor id + last-touch attribution (UTM / referrer), set by the middleware. */
export const VISITOR_COOKIE = "am_vid";
export const ATTRIBUTION_COOKIE = "am_src";
