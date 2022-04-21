const Version = new Date().getTime();
const webpack = require("webpack");
module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // publicPath:'/',
  outputDir:'dist',
  assetsDir:'aa',
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: {
      // 修改打包后css文件名
      filename: `aa/css/[name].${Version}.css`,
      chunkFilename: `aa/css/[name].${Version}.css`
    }
  },
  configureWebpack: {
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `aa/js/[name].${Version}.js`,
      chunkFilename: `aa/js/[name].${Version}.js`
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
	        options.name = `aa/img/[name].${Version}.[ext]`
	        options.fallback = {
	          loader: 'file-loader',
	          options: {
	            name: `aa/img/[name].${Version}.[ext]`
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
