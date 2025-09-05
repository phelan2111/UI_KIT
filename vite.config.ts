import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      ui: path.resolve(__dirname, "./src/components/ui"),
      crypto: "crypto-browserify",
    },
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        assetFileNames: (assetInfo: any) => {
          let extType = assetInfo.name.split(".").at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "img";
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        manualChunks: {
          react: ["react", "react-dom"],
          utils: ["dayjs"],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "crypto-browserify"],
  },
  server: {
    port: 5173,
    open: true,
  },
});
