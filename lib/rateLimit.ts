import redis from "@/database/redis";
import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
// import { headers } from "next/headers";
// import {
//   type NextFetchEvent,
//   type NextRequest,
//   NextResponse,
// } from "next/server";

// Create a new ratelimiter, that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, "1m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

// *********** docs provide by upstash to rate limit all api made...
// export default async function middleware(request:NextRequest,context:NextFetchEvent):Promise<Response | undefined>{
//   const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
// const {success,pending ,limit,remaining}= await ratelimit.limit(ip)
// //we use context.waitUntil since analytic:true
// // see https"//upstash.com/docs/oss/sdks/ts/ratelimit/gettingstarted#serverless-environments
// context.waitUntil(pending)

// const res= success? NextResponse.next() :NextResponse.redirect(new URL("/too-fast",request.url))

// res.headers.set("X-RateLimit-Success",success.toString())
// res.headers.set("X-RateLimit-Limit",limit.toString())
// res.headers.set("X-RateLimit-Remaining",remaining.toString())

// return res;
// }
// export const config={
//   matcher:"/api"
// }

export default ratelimit;
