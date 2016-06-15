var gulp = require('gulp');
var stylus = require('gulp-stylus');
var connect = require('gulp-connect');
// parte para React
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('stylus',function(){
	gulp.src('app/css/*.styl')	
	.pipe(stylus({compress:false}))
	.pipe(gulp.dest('public/css'))
	.pipe(connect.reload());
});

gulp.task('html',function(){
	gulp.src('*.html')
	.pipe(connect.reload());
});

gulp.task('build',function() {
	return browserify({
		entries: 'app/js/index.js',
		extensions: ['.js'],
		debug: true	
	})
	.transform('babelify')
	.bundle()
	.pipe(source('index.js'))
	.pipe(gulp.dest('./public/js'))
	.pipe(connect.reload());
});

gulp.task('watch',function(){
	gulp.watch(['app/css/*styl'],['stylus']);
	gulp.watch(['*.html'],['html']);
	gulp.watch(['app/js/index.js'], ['build']);	
});

gulp.task('default',['watch','build','stylus','html']);
