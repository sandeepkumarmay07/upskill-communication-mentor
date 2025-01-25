export const config = {
  runtime: "edge",
};

export default async function middleware(req) {
  const referer = req.headers.get("referer") || req.headers.get("origin");

  // More robust referer validation
  if (!referer || !new URL(referer).hostname.includes("upskillclasses.com")) {
    // Consider redirecting instead of returning a 403
    return Response.redirect(new URL("www.upskillclasses.com", req.url));
  }

  // Pass through the request if referer is valid
  return null;
}