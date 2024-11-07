import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(async (context, next) => {
    const cookie = context.cookies.get(`directus_session_token`)?.value;

    if(context.request.url.includes("/feature")){
        const req = await fetch("http://192.168.18.67:8055/auth/refresh",{
            method: "POST",
            body: JSON.stringify({
                "mode":"session"
            }),
            headers:{
                "Content-Type":"application/json",
                "Cookie": `directus_session_token=${cookie}`
            }
        });
        if(req.status == 200){
            req.headers.getSetCookie().map((item) => {
                if(item.split("=")[0]==`directus_session_token`){
                    context.locals.new_cookie=item;
                }
                });
            // context.locals.new_cookies
            return next();
        }else{
            return context.rewrite("/login")
                // req.statusText,{
                //     status: req.status
                // }
            
        }
    }
    return next();

});