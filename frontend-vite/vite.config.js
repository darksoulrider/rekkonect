import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // host: [""],
    host: ["localhost", "192.168.0.104"],
  },
  resolve: {
    alias: {
      "/assets": "/src/assets",
    },
  },
});
