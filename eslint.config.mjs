import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  {
    settings: {
      react: {
        version: "19.2.7",
      },
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "public/api/**",
    "import_articles/**",
    "next-env.d.ts",
  ]),
]);
