import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import inject from "rollup-plugin-inject";
import css from "rollup-plugin-css-only";
import dev from "rollup-plugin-dev";
import dfxJson from "../../dfx.json";
import replace from "@rollup/plugin-replace";

const path = require("path");

function initCanisterIds() {
  let localCanisters, localIiCanister, prodCanisters, canisters;
  try {
    localCanisters = require(path.resolve(
        "..",
        "..",
        ".dfx",
        "local",
        "canister_ids.json"
    ));
  } catch (error) {
    console.log("No local canister_ids.json found. Continuing production", error);
  }
  try {
    localIiCanister = require(path.resolve(
        "..",
        "..",
        "internet-identity",
        ".dfx",
        "local",
        "canister_ids.json"
    ));
  } catch (error) {
    console.log(
        "No local internet-identity canister_ids.json found. Continuing production"
    );
  }
  try {
    prodCanisters = require(path.resolve("..", "..", "canister_ids.json"));
  } catch (error) {
    console.log("No production canister_ids.json found. Continuing with local");
  }

  const network =
      process.env.DFX_NETWORK ||
      (process.env.NODE_ENV === "production" ? "ic" : "local");

  console.log(network);

  const canisterIds =
      network === "local"
          ? { ...(localCanisters || {}), ...(localIiCanister || {}) }
          : prodCanisters;

  return { canisterIds, network };
}
const { canisterIds, network } = initCanisterIds();

const production = !process.env.ROLLUP_WATCH;

function serve() {
  return dev({
    dirs: ["./public"],
    proxy: [
      {
        from: "/api/*",
        to: `http://${dfxJson.networks.local.bind}`,
      },
    ],
    spa: "./public/index.html",
    port: 4000,
  });
}

export default {
  input: "src/main.ts",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },
  plugins: [
    svelte({
      preprocess: sveltePreprocess({ sourceMap: !production }),
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: "bundle.css" }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      preferBuiltins: false,
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),
    typescript({
      sourceMap: !production,
      inlineSources: !production,
    }),
    inject({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    }),
    replace(
      Object.assign(
        {
          "process.env.DFX_NETWORK": JSON.stringify(network),
          "process.env.NODE_ENV": JSON.stringify(
            production ? "production" : "development"
          ),
        },
        ...Object.keys(canisterIds)
          .filter((canisterName) => canisterName !== "__Candid_UI")
          .map((canisterName) => ({
            ["process.env." + canisterName.toUpperCase() + "_CANISTER_ID"]:
              JSON.stringify(canisterIds[canisterName][network]),
          }))
      )
    ),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
