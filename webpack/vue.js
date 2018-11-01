const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')
const base = require('./base')


module.exports = {
	...base,
	entry: {
		main: path.resolve(__dirname, '../src/vueEntry.js')
	},
	module: {
		rules: [
			...base.module.rules,
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.scss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				]
			}
		]
	},
	plugins: [
		...base.plugins,
		new VueLoaderPlugin()
	]
}
