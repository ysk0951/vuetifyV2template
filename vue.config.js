const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    resolve: {
      alias: {
        api: path.resolve(__dirname, "api/"),
        store: path.resolve(__dirname, "src/store/moduleExec"),
      },
      extensions: [".js", ".vue", ".json"],
    },
  },
});
