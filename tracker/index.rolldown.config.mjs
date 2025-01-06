import { defineConfig } from "rolldown"
import { minify } from "rollup-plugin-esbuild"

export default defineConfig({
  input: "modules/index.ts",
  output: { file: "build/junction.js" },
  plugins: [minify()],
})
