import { build as esbuild } from "esbuild";
import path from "path";
import { fileURLToPath } from "url";
import { readFile } from "fs/promises";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function buildVercelApi() {
  const pkg = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
  const dependencies = Object.keys(pkg.dependencies ?? {});
  const devDependencies = Object.keys(pkg.devDependencies ?? {});
  const externals = [...dependencies, ...devDependencies].filter(
    (dependency) => !["cors", "dotenv", "express", "nodemailer", "zod"].includes(dependency),
  );

  await esbuild({
    entryPoints: [path.join(root, "server/vercel-app.ts")],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: path.join(root, "api/index.js"),
    minify: true,
    external: externals,
    alias: {
      "@shared": path.join(root, "shared"),
    },
    footer: {
      js: "module.exports = module.exports.default ?? module.exports;",
    },
    logLevel: "info",
  });
}

buildVercelApi().catch((error) => {
  console.error("API build failed:", error);
  process.exit(1);
});
