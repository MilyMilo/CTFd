import { resolve } from "node:path";

import { defineConfig } from "vite";
import copy from "rollup-plugin-copy";

const entry = (name: string) => resolve(__dirname, name);

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
    rollupOptions: {
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
      input: {
        index: entry("assets/js/index.ts"),
        page: entry("assets/js/page.ts"),
        setup: entry("assets/js/setup.ts"),
        settings: entry("assets/js/settings.ts"),
        challenges: entry("assets/js/challenges.ts"),
        scoreboard: entry("assets/js/scoreboard.ts"),
        notifications: entry("assets/js/notifications.ts"),
        teams_public: entry("assets/js/teams/public.ts"),
        teams_private: entry("assets/js/teams/private.ts"),
        teams_list: entry("assets/js/teams/list.ts"),
        users_public: entry("assets/js/users/public.ts"),
        users_private: entry("assets/js/users/private.ts"),
        users_list: entry("assets/js/users/list.ts"),
        main: entry("assets/scss/main.scss"),
        colorModeSwitcher: entry("assets/js/colorModeSwitcher.ts"),
      },
    },
  },
});
