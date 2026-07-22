import { readdirSync } from "node:fs";
import { resolve } from "node:path";

import { defineConfig } from "vite";
import copy from "rollup-plugin-copy";

/**
 * Page entrypoints are the .ts files directly under assets/js and under its
 * per-section folders. Everything else (components, api, utils) is imported by
 * them rather than being an entry of its own.
 */
function entrypoints(): Record<string, string> {
  const dirs = ["assets/js", "assets/js/teams", "assets/js/users"];
  const inputs: Record<string, string> = {};

  for (const dir of dirs) {
    const section = dir.replace("assets/js", "").replace("/", "");

    for (const file of readdirSync(resolve(__dirname, dir))) {
      // lib.ts is the package entry and pages.ts is a shared module; neither is
      // a page the server serves.
      if (!file.endsWith(".ts") || file.endsWith(".test.ts")) continue;
      if (file === "lib.ts" || file === "pages.ts") continue;

      const base = file.replace(/\.ts$/, "");
      // The key names the emitted chunk, so it stays flat: a key containing
      // slashes nests the output, and CSS emitted under assets/scss/ would no
      // longer resolve its url(../webfonts/...) references.
      const name = section ? `${section}_${base}` : base;
      inputs[name] = resolve(__dirname, `${dir}/${file}`);
    }
  }

  inputs.main = resolve(__dirname, "assets/scss/main.scss");
  return inputs;
}

export default defineConfig({
  resolve: {
    alias: {
      "~": resolve(__dirname, "./node_modules/"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Bootstrap 5 still uses @import internally; these warnings are not ours.
        silenceDeprecations: ["import", "global-builtin", "color-functions", "if-function"],
      },
    },
  },
  build: {
    // Vite 5+ writes .vite/manifest.json by default; CTFd's Assets helper reads
    // static/manifest.json, so the name is pinned here.
    manifest: "manifest.json",
    outDir: "static",
    emptyOutDir: true,
    rolldownOptions: {
      plugins: [
        copy({
          targets: [
            {
              src: "./node_modules/@fortawesome/fontawesome-free/webfonts/**/*",
              dest: "static/webfonts",
            },
            {
              src: "./node_modules/@fontsource/lato/files/**/*400*-normal*",
              dest: "static/webfonts",
            },
            {
              src: "./node_modules/@fontsource/lato/files/**/*700*-normal*",
              dest: "static/webfonts",
            },
            {
              src: "./node_modules/@fontsource/raleway/files/**/*400*-normal*",
              dest: "static/webfonts",
            },
            { src: "./assets/img/**", dest: "static/img" },
            { src: "./assets/sounds/**", dest: "static/sounds" },
          ],
          hook: "writeBundle",
        }),
      ],
      output: {
        // rolldown requires a function here; an object map is no longer accepted.
        manualChunks(id: string) {
          if (id.includes("node_modules/echarts") || id.includes("node_modules/zrender")) {
            return "echarts";
          }
        },
      },
      input: entrypoints(),
    },
  },
});
