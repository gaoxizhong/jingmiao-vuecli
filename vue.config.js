const Version = new Date().getTime();
const webpack = require("webpack");
module.exports = {
  lintOnSave: false,
  //配置 运行和打包时的文件路径
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/', 
  // publicPath:'/',
  outputDir:'dist',
  // 放置生成的静态资源 (js、css、img、fonts)的目录，资源放的目录 。 (相对于 outputDir)
  assetsDir: "static",
  // 指定生成的 index.html 的输出路径，也可以是一个绝对路径。index的路劲和名字 (相对于 outputDir 的)
  indexPath: './index.html',
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: {
      // 修改打包后css文件名
      filename: `static/css/[name].${Version}.css`,
      chunkFilename: `static/css/[name].${Version}.css`
    }
  },
  configureWebpack: {
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `static/js/[name].${Version}.js`,
      chunkFilename: `static/js/[name].${Version}.js`
    },
    plugins: [
      new webpack.ProvidePlugin({
          $:"jquery",
          jQuery:"jquery",
          "windows.jQuery":"jquery"
      })
    ]
  },
  chainWebpack(config) {
		// img的文件名修改
	    config.module
	      .rule('images')
	      .use('url-loader')
	      .tap(options => {
	        options.name = `static/img/[name].${Version}.[ext]`
	        options.fallback = {
	          loader: 'file-loader',
	          options: {
	            name: `static/img/[name].${Version}.[ext]`
	          }
	        }
	        return options
	      })
	},
  devServer: {
    proxy: {
        '/api': {
            // 此处的写法，目的是为了 将 /api 替换成 域名
            target: 'http://49.233.2.47:9000',
            // 允许跨域
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '^/api': ''
            }
        }
      //   '/pdf': {
      //     target: 'https://repair.qdy0707.top/file/',
      //     changOrigin: true,
      //     pathRewrite: {
      //         '^/pdf': ''
      //     }
      // }
    }
  }
}
