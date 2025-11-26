import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    historyApiFallback: true,
    hmr: {
      overlay: true, // Show error overlay in browser
    },
    watch: {
      usePolling: false, // Use native file watching for better performance
      interval: 100, // Faster change detection
      include: ['src/**', 'public/**', 'index.html'],
      exclude: ['node_modules/**', 'dist/**', '.git/**'],
    },
    fs: {
      // Allow serving files from packages for better HMR
      allow: ['.'],
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
  },
}));
