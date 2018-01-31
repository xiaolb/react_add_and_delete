

let gulp=require('gulp'),
	webpack=require('webpack'),
	open=require('open'),
	webpackConfig=require('./webpack.config.js'),
	webpackDevServer=require('webpack-dev-server');

let host={
	src:'./src',
	port:8090,//幸运号
	html:'reactlist.html',
}

gulp.task('openServer',function(){
	let compiler=webpack(webpackConfig);
	new webpackDevServer(compiler,{

	}).listen(host.port,'localhost',function(){
		open('http://localhost:'+host.port);
	})
});

gulp.task('default',['openServer']);