# Deployment Fix TODO

## Plan Steps (Approved)
1. [x] Create .nvmrc and .node-version with Node 20
2. [x] Update package.json (scripts, engines, esbuild optionalDeps) - copy package-new.json -> package.json
3. [x] Update vite.config.ts (outDir to dist, remove Replit plugins) - copy vite.config-new.ts -> vite.config.ts
4. [x] Replace vercel.json for static SPA - copy vercel-new.json -> vercel.json
5. [x] npm install && npm run build && verify dist/
6. [x] Test local preview
7. [ ] Git commit/push
8. [ ] Vercel settings update + redeploy without cache
9. [ ] Verify deployment (no download, SPA works)

**Progress**: Steps 1-4 done. Next: npm install && build.
