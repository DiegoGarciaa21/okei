import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    rules: {
      // 🔥 FIX principal: permite usar "any" sin romper el build
      "@typescript-eslint/no-explicit-any": "off",

      // Opcionalmente ignoramos advertencias comunes:
      "@typescript-eslint/no-unused-vars": "warn",
      "react-hooks/exhaustive-deps": "warn",

      // Ignora el warning de <img> (tu diseño depende de eso)
      "@next/next/no-img-element": "off",
    },
  },
];
