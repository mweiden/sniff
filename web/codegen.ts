import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:5000/graphql",
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ["./src/rpc/operations/**/*.graphql"],
  generates: {
    "./src/rpc/types.ts": {
      plugins: ["typescript"],
    },
    "./src/rpc/operations": {
      preset: "near-operation-file",
      presetConfig: {
        baseTypesPath: "../types.ts",
      },
      plugins: ["typescript-operations", "typescript-react-apollo"],
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;
