import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context,next)=>{
  if(context.request.url.includes("/about/5")){
        return context.redirect("/appointment");
  };

  return next();
});