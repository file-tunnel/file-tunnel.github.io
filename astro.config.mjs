import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://file-tunnel.github.io",
  output: "static",
  build: {
    format: "directory",
  },
});
