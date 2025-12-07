import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // 把小于 150KB 的资源内联成 base64，这样 146 张寿司图片
    // 都会被打包进 JS，变成 1 个请求而不是 146 个请求
    assetsInlineLimit: 150 * 1024, // 150KB
    chunkSizeWarningLimit: 3000, // 提高警告阈值，因为我们故意内联图片
  },
}));
