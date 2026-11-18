import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import tailwind from "eslint-plugin-tailwindcss";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  tailwind.configs.recommended,
  {
    settings: {
      tailwindcss: { cssConfigPath: "./src/app/globals.css" },
    },
  },
  prettier,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
