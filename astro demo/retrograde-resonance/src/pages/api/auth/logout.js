export async function POST(ctx) {
  const cookie = ctx.cookies.get("directus_session_token")?.value;

  const req = await fetch("http://192.168.18.67:8055/auth/logout", {
    method: "POST",
    body: JSON.stringify({
      // email:payload.email,
      // password : payload.password,
      mode: "session",
    }),
    headers: {
      "Content-Type": "application/json",
      Cookie: `directus_session_token=${cookie}`,
    },
  });

  const cookies = req.headers.getSetCookie(); // getSetCookies berisi array
  const headers = new Headers();

  cookies.map((item) => {
    headers.append('Set-Cookie', item);
  });

  // const respText = req.statusText == "" ? null : req.statusText;
  const respText = req.status=="204"?null:req.statusText;
  return new Response(respText, {
    status: req.status,
    headers: headers,
  });
}
