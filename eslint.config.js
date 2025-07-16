// ESLint v9 Configuration for Lokstra Dev Website
export default [
  // Global ignores (applied to all files)
  {
    ignores: [
      "*.html",
      "*.css",
      "node_modules/**",
      "*.min.js",
      "vendor/**",
      "dist/**",
      "build/**",
    ],
  },
  // JavaScript files in assets directory
  {
    files: ["assets/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script",
      globals: {
        // Browser globals
        window: "readonly",
        document: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        fetch: "readonly",
        localStorage: "readonly",
        // Custom globals from our application
        loadHTML: "readonly",
        loadMetaTags: "readonly",
      },
    },
    rules: {
      // Disable unused vars because functions are called from HTML
      "no-unused-vars": "off",
      "no-console": "off",
      "prefer-const": "warn",
      "no-var": "error",
      "no-undef": "warn",
      "no-extra-semi": "error",
      "no-unreachable": "error",
    },
  },
];
