import path from "path";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  build: {
    outDir: path.resolve(__dirname, "./examples/web/js"),
    lib: {
      entry: path.resolve(__dirname, "./yajsapi/index_browser.ts"),
      name: "yajsapi",
      fileName: (format) => `yajsapi.${format}.js`,
    },
  },
  plugins: [nodeResolve(), commonjs()],
};
