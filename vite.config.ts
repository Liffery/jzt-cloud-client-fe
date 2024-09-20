import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";
import svgLoader from "vite-svg-loader";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: env.VITE_APP_BASE,
    plugins: [
      vue(),
      vueJsx(),
      svgLoader(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: "less",
          }),
        ],
      }),
    ],
    resolve: {
      alias: [
        {
          find: /\/@\//,
          replacement: pathResolve("src") + "/",
        },
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            "primary-color": "#1890FF",
            "link-color": "#1890FF",
          },
          additionalData: "@root-entry-name: default;",
          javascriptEnabled: true,
        },
      },
    },
    server: {
      // 端口号
      port: 6061,
      // 监听所有地址
      host: "0.0.0.0",
      // 服务启动时是否自动打开浏览器
      open: true,
      // 允许跨域
      cors: true,
      proxy: {
        "/api/v1/mock": {
          target: "http://192.168.16.38:40001",
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(/^\/api\/v1\/mock/, "/mock/378/api/v1"),
          ws: true,
        },
        "/api/v1": {
          target: "http://192.168.14.94:30011/",
          changeOrigin: true,
          ws: true,
        },
      },
    },
  };
});

function pathResolve(dir: string) {
  return path.resolve(process.cwd(), ".", dir);
}
