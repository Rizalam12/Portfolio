import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // vite.config.ts builds to: ../dist/public (relative to Image-Creator)
  const distPath = path.resolve(__dirname, "..", "dist", "public");
  const indexPath = path.resolve(distPath, "index.html");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}. Run: npm run build (client)`,
    );
  }

  app.use(express.static(distPath, { index: false }));

  // SPA fallback. Must be AFTER /api routes (registered earlier).
  // Must NOT interfere with existing server files.
  app.get("/", (_req, res) => {
    res.sendFile(indexPath);
  });

  app.get("/index.html", (_req, res) => {
    res.sendFile(indexPath);
  });

  app.use("/{*path}", (req, res, next) => {
    // Let unknown API paths 404 (so they don't get replaced by SPA HTML)
    if (req.path.startsWith("/api")) return next();

    // Only handle browser navigation (HTML document requests)
    res.sendFile(indexPath);
  });
}

