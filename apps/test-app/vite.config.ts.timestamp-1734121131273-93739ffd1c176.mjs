// vite.config.ts
import fs from "fs";
import { createLogger, defineConfig, loadEnv } from "file:///E:/Repos/appui/a/appui/common/temp/node_modules/.pnpm/vite@5.4.7_@types+node@20.17.8_sass@1.80.5/node_modules/vite/dist/node/index.js";
import react from "file:///E:/Repos/appui/a/appui/common/temp/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.0_@swc+helpers@0.5.15_vite@5.4.7_@types+node@20.17.8_sass@1.80.5_/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { viteStaticCopy } from "file:///E:/Repos/appui/a/appui/common/temp/node_modules/.pnpm/vite-plugin-static-copy@1.0.6_vite@5.4.7_@types+node@20.17.8_sass@1.80.5_/node_modules/vite-plugin-static-copy/dist/index.js";
import { TanStackRouterVite } from "file:///E:/Repos/appui/a/appui/common/temp/node_modules/.pnpm/@tanstack+router-plugin@1.87.7_vite@5.4.7_@types+node@20.17.8_sass@1.80.5_/node_modules/@tanstack/router-plugin/dist/esm/vite.js";
var customLogger = createLogger();
var warn = customLogger.warn;
customLogger.warn = (msg, options) => {
  if (msg.includes(`Module "fs" has been externalized`) && msg.includes("node_modules/electron/index.js"))
    return;
  if (msg.includes(`Module "path" has been externalized`) && msg.includes("node_modules/electron/index.js"))
    return;
  warn(msg, options);
};
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const bimDir = env.IMJS_BIM_DIR;
  const files = bimDir ? fs.readdirSync(bimDir) : [];
  const bimFiles = files.filter(
    (file) => file.endsWith(".bim") || file.endsWith(".ibim")
  );
  return {
    build: {
      chunkSizeWarningLimit: 7e3
    },
    customLogger,
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler"
        }
      }
    },
    plugins: [
      TanStackRouterVite(),
      react(),
      viteStaticCopy({
        targets: [
          {
            // copy assets from `@itwin` dependencies
            src: "./node_modules/@itwin/*/lib/public/*",
            dest: "."
          },
          {
            // copy localization files
            src: "./lib/locales",
            dest: "."
          },
          {
            src: "./lib/locales/en/**",
            dest: "./locales/en-US"
          }
        ]
      }),
      {
        name: "markdown-loader",
        transform(code, id) {
          if (!id.endsWith(".md")) return;
          return `export default ${JSON.stringify(code)};`;
        }
      }
    ],
    resolve: {
      alias: [
        {
          find: "~@itwin/appui-react",
          replacement: "@itwin/appui-react"
        },
        {
          find: "~@itwin/core-react",
          replacement: "@itwin/core-react"
        }
      ]
    },
    envPrefix: "IMJS_",
    server: {
      port: 3e3,
      strictPort: true
    },
    define: {
      __BIM_FILES__: JSON.stringify(bimFiles)
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxSZXBvc1xcXFxhcHB1aVxcXFxhXFxcXGFwcHVpXFxcXGFwcHNcXFxcdGVzdC1hcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFJlcG9zXFxcXGFwcHVpXFxcXGFcXFxcYXBwdWlcXFxcYXBwc1xcXFx0ZXN0LWFwcFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovUmVwb3MvYXBwdWkvYS9hcHB1aS9hcHBzL3Rlc3QtYXBwL3ZpdGUuY29uZmlnLnRzXCI7LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvcHlyaWdodCAoYykgQmVudGxleSBTeXN0ZW1zLCBJbmNvcnBvcmF0ZWQuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBTZWUgTElDRU5TRS5tZCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIHRlcm1zIGFuZCBmdWxsIGNvcHlyaWdodCBub3RpY2UuXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciwgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgeyB2aXRlU3RhdGljQ29weSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zdGF0aWMtY29weVwiO1xuaW1wb3J0IHsgVGFuU3RhY2tSb3V0ZXJWaXRlIH0gZnJvbSBcIkB0YW5zdGFjay9yb3V0ZXItcGx1Z2luL3ZpdGVcIjtcblxuY29uc3QgY3VzdG9tTG9nZ2VyID0gY3JlYXRlTG9nZ2VyKCk7XG5jb25zdCB3YXJuID0gY3VzdG9tTG9nZ2VyLndhcm47XG5cbmN1c3RvbUxvZ2dlci53YXJuID0gKG1zZywgb3B0aW9ucykgPT4ge1xuICBpZiAoXG4gICAgbXNnLmluY2x1ZGVzKGBNb2R1bGUgXCJmc1wiIGhhcyBiZWVuIGV4dGVybmFsaXplZGApICYmXG4gICAgbXNnLmluY2x1ZGVzKFwibm9kZV9tb2R1bGVzL2VsZWN0cm9uL2luZGV4LmpzXCIpXG4gIClcbiAgICByZXR1cm47XG4gIGlmIChcbiAgICBtc2cuaW5jbHVkZXMoYE1vZHVsZSBcInBhdGhcIiBoYXMgYmVlbiBleHRlcm5hbGl6ZWRgKSAmJlxuICAgIG1zZy5pbmNsdWRlcyhcIm5vZGVfbW9kdWxlcy9lbGVjdHJvbi9pbmRleC5qc1wiKVxuICApXG4gICAgcmV0dXJuO1xuICB3YXJuKG1zZywgb3B0aW9ucyk7XG59O1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCksIFwiXCIpO1xuICBjb25zdCBiaW1EaXIgPSBlbnYuSU1KU19CSU1fRElSO1xuICBjb25zdCBmaWxlcyA9IGJpbURpciA/IGZzLnJlYWRkaXJTeW5jKGJpbURpcikgOiBbXTtcbiAgY29uc3QgYmltRmlsZXMgPSBmaWxlcy5maWx0ZXIoXG4gICAgKGZpbGUpID0+IGZpbGUuZW5kc1dpdGgoXCIuYmltXCIpIHx8IGZpbGUuZW5kc1dpdGgoXCIuaWJpbVwiKVxuICApO1xuICByZXR1cm4ge1xuICAgIGJ1aWxkOiB7XG4gICAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDcwMDAsXG4gICAgfSxcbiAgICBjdXN0b21Mb2dnZXIsXG4gICAgY3NzOiB7XG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICBhcGk6IFwibW9kZXJuLWNvbXBpbGVyXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgVGFuU3RhY2tSb3V0ZXJWaXRlKCksXG4gICAgICByZWFjdCgpLFxuICAgICAgdml0ZVN0YXRpY0NvcHkoe1xuICAgICAgICB0YXJnZXRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgLy8gY29weSBhc3NldHMgZnJvbSBgQGl0d2luYCBkZXBlbmRlbmNpZXNcbiAgICAgICAgICAgIHNyYzogXCIuL25vZGVfbW9kdWxlcy9AaXR3aW4vKi9saWIvcHVibGljLypcIixcbiAgICAgICAgICAgIGRlc3Q6IFwiLlwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgLy8gY29weSBsb2NhbGl6YXRpb24gZmlsZXNcbiAgICAgICAgICAgIHNyYzogXCIuL2xpYi9sb2NhbGVzXCIsXG4gICAgICAgICAgICBkZXN0OiBcIi5cIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogXCIuL2xpYi9sb2NhbGVzL2VuLyoqXCIsXG4gICAgICAgICAgICBkZXN0OiBcIi4vbG9jYWxlcy9lbi1VU1wiLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCJtYXJrZG93bi1sb2FkZXJcIixcbiAgICAgICAgdHJhbnNmb3JtKGNvZGUsIGlkKSB7XG4gICAgICAgICAgaWYgKCFpZC5lbmRzV2l0aChcIi5tZFwiKSkgcmV0dXJuO1xuXG4gICAgICAgICAgLy8gRm9yIC5tZCBmaWxlcywgZ2V0IHRoZSByYXcgY29udGVudFxuICAgICAgICAgIHJldHVybiBgZXhwb3J0IGRlZmF1bHQgJHtKU09OLnN0cmluZ2lmeShjb2RlKX07YDtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczogW1xuICAgICAgICB7XG4gICAgICAgICAgZmluZDogXCJ+QGl0d2luL2FwcHVpLXJlYWN0XCIsXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IFwiQGl0d2luL2FwcHVpLXJlYWN0XCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiBcIn5AaXR3aW4vY29yZS1yZWFjdFwiLFxuICAgICAgICAgIHJlcGxhY2VtZW50OiBcIkBpdHdpbi9jb3JlLXJlYWN0XCIsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAgZW52UHJlZml4OiBcIklNSlNfXCIsXG4gICAgc2VydmVyOiB7XG4gICAgICBwb3J0OiAzMDAwLFxuICAgICAgc3RyaWN0UG9ydDogdHJ1ZSxcbiAgICB9LFxuICAgIGRlZmluZToge1xuICAgICAgX19CSU1fRklMRVNfXzogSlNPTi5zdHJpbmdpZnkoYmltRmlsZXMpLFxuICAgIH0sXG4gIH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFJQSxPQUFPLFFBQVE7QUFDZixTQUFTLGNBQWMsY0FBYyxlQUFlO0FBQ3BELE9BQU8sV0FBVztBQUNsQixTQUFTLHNCQUFzQjtBQUMvQixTQUFTLDBCQUEwQjtBQUVuQyxJQUFNLGVBQWUsYUFBYTtBQUNsQyxJQUFNLE9BQU8sYUFBYTtBQUUxQixhQUFhLE9BQU8sQ0FBQyxLQUFLLFlBQVk7QUFDcEMsTUFDRSxJQUFJLFNBQVMsbUNBQW1DLEtBQ2hELElBQUksU0FBUyxnQ0FBZ0M7QUFFN0M7QUFDRixNQUNFLElBQUksU0FBUyxxQ0FBcUMsS0FDbEQsSUFBSSxTQUFTLGdDQUFnQztBQUU3QztBQUNGLE9BQUssS0FBSyxPQUFPO0FBQ25CO0FBR0EsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBQzNDLFFBQU0sU0FBUyxJQUFJO0FBQ25CLFFBQU0sUUFBUSxTQUFTLEdBQUcsWUFBWSxNQUFNLElBQUksQ0FBQztBQUNqRCxRQUFNLFdBQVcsTUFBTTtBQUFBLElBQ3JCLENBQUMsU0FBUyxLQUFLLFNBQVMsTUFBTSxLQUFLLEtBQUssU0FBUyxPQUFPO0FBQUEsRUFDMUQ7QUFDQSxTQUFPO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDTCx1QkFBdUI7QUFBQSxJQUN6QjtBQUFBLElBQ0E7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQSxVQUNKLEtBQUs7QUFBQSxRQUNQO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLG1CQUFtQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxNQUNOLGVBQWU7QUFBQSxRQUNiLFNBQVM7QUFBQSxVQUNQO0FBQUE7QUFBQSxZQUVFLEtBQUs7QUFBQSxZQUNMLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBO0FBQUEsWUFFRSxLQUFLO0FBQUEsWUFDTCxNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE1BQU07QUFBQSxVQUNSO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BQ0Q7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLFVBQVUsTUFBTSxJQUFJO0FBQ2xCLGNBQUksQ0FBQyxHQUFHLFNBQVMsS0FBSyxFQUFHO0FBR3pCLGlCQUFPLGtCQUFrQixLQUFLLFVBQVUsSUFBSSxDQUFDO0FBQUEsUUFDL0M7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0w7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLGFBQWE7QUFBQSxRQUNmO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYTtBQUFBLFFBQ2Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsV0FBVztBQUFBLElBQ1gsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sWUFBWTtBQUFBLElBQ2Q7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLGVBQWUsS0FBSyxVQUFVLFFBQVE7QUFBQSxJQUN4QztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
