import { serve } from "bun";
import index from "./index.html";

const API_TARGET = process.env.BUN_PUBLIC_API_URL || "http://localhost:3001";

const server = serve({
  routes: {
    "/*": index,
  },

  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname.startsWith("/api/")) {
      const target = `${API_TARGET}${url.pathname}${url.search}`;
      const upstream = await fetch(target, {
        method: req.method,
        headers: req.headers,
        body: req.body,
      });

      return new Response(upstream.body, {
        status: upstream.status,
        headers: upstream.headers,
      });
    }

    return new Response("Not Found", { status: 404 });
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
console.log(`📡 Proxying /api/* → ${API_TARGET}`);
