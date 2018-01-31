
let webpack=require('webpack'),
	path=require('path'),
	HtmlWebpackPlugin=require('html-webpack-plugin'),
	autoPrefixer=require('autoprefixer'),
	extractTextWebpackPlugin=require('extract-text-webpack-plugin'),
	UglifyJsPlugin=webpack.optimize.UglifyJsPlugin;
	// defaultSettings=require('./src/js/default'),
	// filePath=defaultSettings.filePath;

let filePath={
	srcPath:path.join(__dirname,'./src'),
	tplPath:path.join(__dirname,'./src'),
	build:path.join(__dirname,'./src'),
	publicPath:'/'
}

module.exports={
	entry:[
		'webpack-dev-server/client?http://127.0.0.1:8098',  
		  'webpack/hot/only-dev-server',
		'./src/js/default1.jsx'],
	output:{
		path:filePath.build,//生成的文件目录
		filename:'[name].js',//根据入口文件输出的对应多个文件名
		publicPath:filePath.publicPath
	},

	resolve:{
		extensions:['','.js','.jsx'],
		alias:{
			'jquery':path.join(__dirname,'./src/js/jquery3.1.js'),
			'tpl':path.join(__dirname,'./src/tpl/'),
			'page':path.join(__dirname,'./src/page/')
		}
	},

	module:{
		loaders:[
			{
				// 对css,less样式进行编译
				test:/\.(css|less)$/,
				// 引用extractTextWebpackPlugin插件，对css和js进行分离
				loader:extractTextWebpackPlugin.extract("style","css!less!postcss")
			},
			{
				test:/\.js[x]$/,
				loaders: ['react-hot-loader','babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0&presets[]=stage-1'],
                exclude: /node_modules/
			},
			{
		        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
		        loader: 'url-loader?limit=1&name=statics/[name].[hash].[ext]'
		      },
		]
	},

	postcss:[autoPrefixer({browsers: []})],// 自动那个补全代码

	plugins:[
		new UglifyJsPlugin({
			compress:{
				warnings:false
			}
		}),

		new HtmlWebpackPlugin({
			title:"react demo",
			filename:'index.html',//默认为index.html
			template:'./src/tpl/reactlist.html',
			inject:true
		}),
		new webpack.HotModuleReplacementPlugin(),
		new extractTextWebpackPlugin('reactlist.css'),
		new webpack.ProvidePlugin({
			$:"jquery",
			jQuery:"jquery",
			"windom.jQuery":"jquery"
		})
	]
};
