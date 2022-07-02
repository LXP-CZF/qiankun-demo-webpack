const { defineConfig } = require("@vue/cli-service");
const { packageName } = require('./package');
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    // 可以在配置中 配置端口 VUE_APP_PORT = 8080
    port: 3003,
    headers: {
      'Access-Control-Allow-Origin': '*' // 重点1: 允许跨域访问子应用页面
    }
  },
  /**
   * 自定义webpack配置
   * 除了代码中暴露出相应的生命周期钩子之外，为了让主应用能正确识别微应用暴露出来的一些信息，微应用的打包工具需要增加如下配置
   **/
  configureWebpack: {
    output: {
      library: `${packageName}-name`,
      libraryTarget: 'umd', // 把子应用打包成 umd 库格式
      // 报错原因：**在2020-10-10发布的webpack 5中已将 output.jsonpFunction 更名为 output.chunkLoadingGlobal
      chunkLoadingGlobal: `webpackJsonp_${packageName}`
    }
  },
})
