import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import crypto from "crypto";

import { registerRoutes } from "./routes";
import { serveStatic } from "./static";

const app = express();
const httpServer = createServer(app);

function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

// Quick sanity route to verify the correct backend is running
app.get("/__health", (_req, res) => {
  const payload: Record<string, unknown> = { ok: true };
  if (process.env.NODE_ENV !== "production") {
    payload.service = "Image-Creator/server/index.ts";
  }
  res.json(payload);
});

declare module "http" {
  interface IncomingMessage {
    rawBody?: Buffer;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

// Request tracing (helps diagnose reload loops)
app.use((req, res, next) => {
  const traceId = crypto.randomUUID();
  res.setHeader("X-Trace-Id", traceId);

  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`, "trace");
  });

  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const reqPath = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (reqPath.startsWith("/api")) {
      let logLine = `${req.method} ${reqPath} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      log(logLine);
    }
  });

  next();
});

// CSP must be registered BEFORE routes/static so it applies to every response.
// Google Fonts are explicitly allowed because the design uses Outfit and
// Plus Jakarta Sans. The noise texture is served locally from /noise.svg.
app.use((_req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";
  const scriptSrc = isProd
    ? "'self'"
    : "'self' 'unsafe-inline' 'unsafe-eval'";
  const connectSrc = isProd
    ? "'self'"
    : "'self' ws: wss:";

  res.setHeader(
    "Content-Security-Policy",
    [
      `default-src 'self'`,
      `script-src ${scriptSrc}`,
      `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
      `font-src 'self' https://fonts.gstatic.com data:`,
      `img-src 'self' data: blob:`,
      `connect-src ${connectSrc}`,
      `frame-ancestors 'none'`,
      `base-uri 'self'`,
    ].join('; '),
  );
  next();
});

(async () => {
  log(`NODE_ENV=${process.env.NODE_ENV ?? "development"}`);

  // API routes must be registered BEFORE Vite/static so /api/* is not swallowed
  await registerRoutes(httpServer, app);

  if (process.env.NODE_ENV === "production") {
    log("Serving production static assets", "static");
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
    log("Vite middleware attached", "vite");
  }

  // Error middleware (must be registered last, after all routes/middleware)
  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error("Internal Server Error:", err);

    if (res.headersSent) return next(err);

    return res.status(status).json({ message });
  });

  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "127.0.0.1",
    },
    () => {
      log(`Server running on http://127.0.0.1:${port}`);
    },
  );
})().catch((err) => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});