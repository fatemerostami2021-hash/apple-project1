import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    open: true,        // باز شدن خودکار در مرورگر
    port: 5173,        // پورت پیش‌فرض (اختیاری)
    host: true         // نمایش لینک Network (اختیاری)
  }
});