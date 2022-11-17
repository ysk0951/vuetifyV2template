const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    resolve: {
      alias: {
        asset: path.resolve(__dirname, "asset"),
        api: path.resolve(__dirname, "api/"),
        utils_c: path.resolve(__dirname, "src/assets/utils"),
      },
      extensions: [".js", ".vue", ".json"],
    },
  },
});
