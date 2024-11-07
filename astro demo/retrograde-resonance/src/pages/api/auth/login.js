export async function POST(ctx) {
  // const request2 = await ctx.request.clone();
  const payload = await ctx.request.json(); //isi ctx yg di request dlm bentuk JSON
  // const payload2 = await request2.json();

  console.log(payload);

  const req = await fetch("http://192.168.18.67:8055/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
      mode: "session",
    }),
  });

  // const res = await req.json();

  console.log("response headers", req.headers);

  // // * tutup siklus dengan memberikan jawaban
  // return new Response(
  //   "Siklus sudah utuh",{
  //     status: 200,
  //     // headers:{
  //     //   "Content-Type":"application/json"
  //     // }
  //   }
  // )

  const cookies = req.headers.getSetCookie(); // getSetCookies berisi array
  const headers = new Headers();

  cookies.map((item) => {
    headers.append("Set-Cookie", item);
  });

  return new Response(req.statusText, {
    status: req.status,
    headers: headers,
    // headers:{
    //   "Content-Type":"application/json"
    // }
  });
}
