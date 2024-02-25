import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import json5Plugin from "vite-plugin-json5";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), json5Plugin()],
});
