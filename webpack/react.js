const ExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const env = require('std-env')
const base = require('./base')

module.exports = {
	...base,
	entry: {
		main: path.resolve(__dirname, '../src/reactEntry.js')
	},
	module: {
		rules: [
			...base.module.rules,
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
			}
		]
	},
	plugins: [
		...base.plugins,
		!env.dev && new ExtractPlugin({
			allChunks: true,
			filename: '[name].css'
		})
	].filter(Boolean)
}
