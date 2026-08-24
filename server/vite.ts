import { type Express } from "express";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";

const viteLogger = createLogger();

export async function setupVite(server: Server, app: Express) {
  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: {
      middlewareMode: true,
      hmr: {
        // Use the same http server for HMR so React Fast Refresh works
        server,
        path: "/vite-hmr",
      },
      allowedHosts: true as const,
    },
    // Critical: SPA mode so Vite injects correct React preamble + handles fallbacks safely
    appType: "spa",
  });

  app.use(vite.middlewares);
}


