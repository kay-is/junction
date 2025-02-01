import { defineConfig } from "rolldown"
import { minify } from "rollup-plugin-esbuild"

export default defineConfig({
  input: "modules/index.ts",
  output: { file: "../frontend/static/libs/junction.js" },
  plugins: [minify()],
})
