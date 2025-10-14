import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  base: "/Weather-App/",
  root: resolve(__dirname),
  plugins: [tailwindcss()],
});
