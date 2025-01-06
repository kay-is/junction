import { defineConfig } from "rolldown"
import { minify } from "rollup-plugin-esbuild"

export default defineConfig({
  input: "modules/browser.ts",
  output: { file: "build/junction.browser.js" },
  plugins: [minify()],
})
