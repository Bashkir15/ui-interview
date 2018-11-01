const path = require('path')
const webpack = require('webpack')
const env = require('std-env')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const paths = {
	build: path.resolve(__dirname, 'build'),
	src: path.resolve(__dirname, '../src')
}

module.exports = {
	target: 'web',
	output: {
		filename: '[name].js',
		path: paths.build,
		publicPath: '/'
	},
	mode: env.dev ? 'development' : 'production',
	module: {
		strictExportPresence: true,
		noParse: /es6-promise\.js$/,
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules\/(?!toolkit-*)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', {
								modules: false
							}],
							['@babel/preset-react']
						],
						plugins: [
							['inline-react-svg', {
								svgo: false
							}],
							['@babel/plugin-proposal-object-rest-spread'],
							['@babel/plugin-proposal-class-properties'],
						]
					}
				}					
			},
			{
				test: /\.scss$/,
				use: [
					env.dev ? 'style-loader' : ExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.css$/,
				use: [
					env.dev ? 'style-loader' : ExtractPlugin.loader,
					'css-loader'
				]
			},
		]
	},
	devServer: {
		contentBase: paths.src,
		hot: true,
		host: '0.0.0.0',
		inline: true,
		port: 8030,
		disableHostCheck: true,
		historyApiFallback: true,
		proxy: {
			'/dealreg': 'http://localhost:8082'
		}
	},
	resolve: {
		alias: {
			'api': path.join(paths.src, 'api/us'),
			'lib': path.join(paths.src, 'lib'),
			'state': path.join(paths.src, 'state'),
			'pages': path.join(paths.src, 'pages'),
			'components': path.join(paths.src, 'components')
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(paths.src, 'index.html'),
			filename: 'index.html'
		}),
		!env.dev && new ExtractPlugin({
			allChunks: true,
			filename: '[name].css'
		})
	].filter(Boolean)
}
