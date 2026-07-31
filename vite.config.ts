import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/rtos-edge-ai-balancing-robot-site/",
  plugins: [react()],
});
