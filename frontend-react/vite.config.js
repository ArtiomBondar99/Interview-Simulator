import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Port 5174, not Vite's default 5173 -- frontend/serve.js (the old vanilla app's dev proxy)
// already uses 5173, and both can plausibly run at once during the migration.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
