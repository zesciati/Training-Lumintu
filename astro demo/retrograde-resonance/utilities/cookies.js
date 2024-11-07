export function getCookieHeader(cookie) {
  return {
    "Cookie": `directus_session_token=${cookie}`
  };
}