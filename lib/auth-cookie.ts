// Shared by the middleware (edge) and the server auth module.

/** Better Auth cookies are named `am.session_token` (`__Secure-am.session_token` over HTTPS). */
export const AUTH_COOKIE_PREFIX = "am";

/** Anonymous visitor id + last-touch attribution (UTM / referrer), set by the middleware. */
export const VISITOR_COOKIE = "am_vid";
export const ATTRIBUTION_COOKIE = "am_src";
/** Present while a visit is in progress (30 min sliding window), set by /api/track. */
export const VISIT_COOKIE = "am_visit";
/** Back-office sidebar collapsed ("1"), read by the panel layout so it renders without a flash. */
export const SIDEBAR_COOKIE = "am_sidebar";
