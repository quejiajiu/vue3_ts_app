const path = require("path");
const isProduction = process.env.NODE_ENV === "production";
const baseUrl = isProduction ? "/vue3_ts_app/" : "/";

function resolve(dir) {
  return path.join(__dirname, "./", dir);
}

module.exports = {
  transpileDependencies: true,
  assetsDir: "assets",
  outputDir: "dist",
  publicPath: baseUrl,
  lintOnSave: false, // 是否开启编译时是否不符合eslint提示
  productionSourceMap: false,
  devServer: {
    hot: true, //热加载
    host: "localhost", // 解决在局域网下无法访问0,0,0,0
    port: 2022,
    open: true, //自动打开浏览器
    // proxy: {
    //   "/api": {
    //     target:
    //       "https://itunes.apple.com",
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       //重写匹配路径，因为有时候我们的实际接口中并没有上面匹配的字符，所以我们可以将上面的字符替换掉
    //       // '^/api': '/api'
    //       // '^/api': '123'
    //     },
    //   },
    // },
  },

  // 压缩代码
  configureWebpack: {
    // plugins: [compress],
  },
  // 配置
  chainWebpack: (config) => {
    // 配置别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("router", resolve("src/router"))
      .set("utils", resolve("src/utils"))
      // .set("store", resolve("src/store"))
      .set("views", resolve("src/views"));
    // 压缩代码
    config.optimization.minimize(true);
  },
  // 引入全局变量
  css: {
    // 是否使用css分离插件 ExtractTextPlugin 生产环境下是true,开发环境下是false,因为它和 CSS 热重载不兼容。
    extract: isProduction ? true : false,
    // 开启 CSS source maps?
    sourceMap: false,
    // 启用 CSS modules for all css / pre-processor files.
    // requireModuleExtension: true,
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            require('postcss-plugin-px2rem')({
              rootValue: 75,      // 新版本的是这个值
              mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
              minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
            }),
          ]
        },
      },
    },
  },
};
