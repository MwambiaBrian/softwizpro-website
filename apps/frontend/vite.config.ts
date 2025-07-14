import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  logLevel: "info", // change to 'debug' if needed
  server: {
    host: true, // for dev use
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
    allowedHosts: ["softwizpro-website.onrender.com"],
  },
});
