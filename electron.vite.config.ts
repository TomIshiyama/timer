import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      outDir: "dist/main"
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      outDir: "dist/preload"
    }
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src")
      }
    },
    build: {
      outDir: "dist/renderer"
    },
    plugins: [solid()],
    esbuild: {
      drop: ["console", "debugger"]
    }
  }
});
