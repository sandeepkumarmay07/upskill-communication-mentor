export default function middleware(req) {
  const referer = req.headers.get("referer") || req.headers.get("origin");

  if (!referer || !referer.includes("https://www.upskillclasses.com/testforcom")) {
      return new Response("Access Denied", { status: 403 });
  }

  return new Response(null, { status: 200 }); 
}
