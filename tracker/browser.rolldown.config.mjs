import { defineConfig } from "rolldown"
import { minify } from "rollup-plugin-esbuild"

export default defineConfig({
  input: "modules/browser.ts",
  output: { file: "../frontend/static/libs/tracker.js" },
  plugins: [minify()],
})
