const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin =
	require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const process = require('process');
function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = defineConfig({
	publicPath: '/',
	outputDir: 'dist',
	assetsDir: 'static',
	transpileDependencies: true,
	lintOnSave: false,
	devServer: {
		port: '9600',
		open: false,
		// overlay: {
		// 	warnings: false,
		// 	errors: true
		// },
		// before: require('./mock/mock-server.js'),
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:3000',
				ws: true,
				changeOrigin: true,
			},
		},
	},
	configureWebpack: {
		resolve: {
			// alias: {
			// 	process: 'process/browser'
			// },
			fallback: {
				path: require.resolve('path-browserify'),
				// path: false,
			},
		},
		plugins: [
			new webpack.ProvidePlugin({
				process: 'process/browser',
			}),
		],
	},
	chainWebpack: (config) => {
		config.plugins.delete('prefetch');
		// set svg-sprite-loader
		config.module.rule('svg').exclude.add(resolve('src/icons')).end();
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(resolve('src/icons'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]',
			})
			.end();
		// config.module
		// 	.rule('cssloader')
		// 	.test(/\.scss$/)
		// 	.use('style-loader')
		// 	.end()
		// 	.use('css-loader')
		// 	.options({
		// 		modules: {
		// 			mode: 'icss',
		// 		},
		// 		// mode: 'icss',
		// 	})
		// 	.end()
		// 	.use('sass-loader')
		// 	.end();
		if (process.env.report_html == 'yes') {
			config
				.plugin('analyzer')
				.use(BundleAnalyzerPlugin, [
					{
						analyzerMode: 'static',
						openAnalyzer: false,
					},
				])
				.tap((options) => {
					return options;
				});
		}
	},
	css: {
		loaderOptions: {
			css: {
				// options here will be passed to css-loader
				modules: {
					mode: 'icss',
				},
			},
		},
	},
});
