import { defineConfig } from "vite";
import { resolve } from "path";
import { execSync } from "child_process";

let gitHash;
try {
  gitHash = execSync("git rev-parse --short HEAD").toString().trim();
} catch {
  gitHash = "unknown";
}

export default defineConfig({
  define: {
    __GIT_HASH__: JSON.stringify(gitHash),
  },
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        admin: resolve(__dirname, "admin/selector.html"),
        upload: resolve(__dirname, "admin/upload.html"),
        editor: resolve(__dirname, "admin/editor.html"),
      },
    },
  },
});
