import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@shared": fileURLToPath(new URL("./src/shared", import.meta.url)),
		},
	},
build: {
		sourcemap: false,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("/node_modules/")) {
						if (["react/", "react-dom/", "react-router-dom/"].some((p) => id.includes(p)))
							return "vendor";
						if (["@tanstack/react-query/", "@tanstack/react-query-persist-client/"].some((p) => id.includes(p)))
							return "query";
						if (["gsap/", "@gsap/react/"].some((p) => id.includes(p)))
							return "gsap";
					}
				},
			},
		},
	},
});
