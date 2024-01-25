//vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig ({
    build: {
        lib: {
            entry: resolve(__dirname, "src/UI.jsx"),
            name: "my-library",

            fileName: "index",
        },
        rollupOptions: {
            external: ["react", "react-dom", "react-router-dom"],
            output: {
                manualChunks: undefined,
            },
        },
    },
    plugins: [cssInjectedByJsPlugin()]
});