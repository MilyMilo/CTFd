const { resolve } = require("path");
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import copy from "rollup-plugin-copy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "~": resolve(__dirname, "./node_modules/"),
    },
  },
  build: {
    manifest: true,
    outDir: "static",
    rollupOptions: {
      plugins: [
        copy({
          targets: [
            // https://github.com/vitejs/vite/issues/1618#issuecomment-764579557
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
            {
              src: "./assets/img/**",
              dest: "static/img",
            },
            {
              src: "./assets/sounds/**",
              dest: "static/sounds",
            },
          ],
          hook: "writeBundle",
        }),
      ],
      output: {
        manualChunks: {
          echarts: ["echarts", "zrender"],
        },
      },
      input: {
        index: resolve(__dirname, "assets/js/index.js"),
        page: resolve(__dirname, "assets/js/page.ts"),
        setup: resolve(__dirname, "assets/js/setup.ts"),
        settings: resolve(__dirname, "assets/js/settings.ts"),
        challenges: resolve(__dirname, "assets/js/challenges.ts"),
        scoreboard: resolve(__dirname, "assets/js/scoreboard.ts"),
        notifications: resolve(__dirname, "assets/js/notifications.ts"),
        teams_public: resolve(__dirname, "assets/js/teams/public.ts"),
        teams_private: resolve(__dirname, "assets/js/teams/private.ts"),
        teams_list: resolve(__dirname, "assets/js/teams/list.ts"),
        users_public: resolve(__dirname, "assets/js/users/public.ts"),
        users_private: resolve(__dirname, "assets/js/users/private.ts"),
        users_list: resolve(__dirname, "assets/js/users/list.ts"),
        main: resolve(__dirname, "assets/scss/main.scss"),
        color_mode_switcher: resolve(__dirname, "assets/js/color_mode_switcher.js"),
      },
    },
  },
});
