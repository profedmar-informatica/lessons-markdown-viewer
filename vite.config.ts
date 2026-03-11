import { defineConfig, Plugin } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

// Custom Vite plugin for Markdown sanitization
function markdownSanitizerPlugin(): Plugin {
  return {
    name: "markdown-sanitizer",
    transform(code, id) {
      if (id.endsWith(".md")) {
        // 1. Split the content into parts: code blocks and non-code blocks
        // This regex captures code blocks (```...```) including the fences.
        const codeBlockRegex = /(```[\s\S]*?```)/g;
        const parts = code.split(codeBlockRegex);

        let sanitizedCode = "";
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          if (i % 2 === 0) { // Non-code block part
            let cleanedPart = part;

            // Remove residual code delimiters (`, ´, ˆ)
            cleanedPart = cleanedPart.replace(/[`´ˆ]/g, '');

            // Normalize multiple newlines to at most two, especially after headings
            // This ensures no more than two newlines appear consecutively.
            cleanedPart = cleanedPart.replace(/\n{3,}/g, '\n\n');
            
            // Trim leading/trailing whitespace for this specific non-code part
            cleanedPart = cleanedPart.trim();

            sanitizedCode += cleanedPart;
          } else { // Code block part - keep as is
            sanitizedCode += part;
          }
        }

        // Ensure overall file is trimmed after reassembly
        sanitizedCode = sanitizedCode.trim();

        // For UTF-8 normalization, JavaScript strings are inherently UTF-8.
        // If there are specific Unicode composition issues (e.g., combining characters),
        // String.prototype.normalize('NFC') could be used, but it's generally not needed
        // for standard text and might have unintended side effects if not carefully applied.
        // Assuming the main concern is visual artifacts from delimiters and spacing.

        return {
          code: sanitizedCode,
          map: null, // No source map for transformations like this
        };
      }
      return null; // Not a markdown file, do nothing
    },
  };
}

export default defineConfig(() => ({
  base: "/lessons-markdown-viewer/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [dyadComponentTagger(), react(), markdownSanitizerPlugin()], // Add the new plugin
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Adicionar alias para 'buffer'
      'buffer': 'buffer/',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  assetsInclude: ['**/*.md'],
}));