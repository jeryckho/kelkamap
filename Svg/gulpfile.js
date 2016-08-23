var gulp = require('gulp');
$ = require('gulp-load-plugins')();

gulp.task('prod', ['font'], function () {
	return gulp.src('./src/**/*.html')
		.pipe($.usemin({
			html: [function () { return $.minifyHtml({ empty: true }); }],
			jsm: [$.uglify],
			jsi: [$.uglify],
			css: [$.minifyCss]
		}))
		.pipe(gulp.dest('bin/public/'));
});

gulp.task('font', ['dev'], function () {
	gulp.src('node_modules/bootstrap/dist/fonts/**')
		.pipe($.rename({ dirname: '' }))
		.pipe(gulp.dest('bin/public/fonts'));
	gulp.src('node_modules/font-awesome/fonts/***')
		.pipe($.rename({ dirname: '' }))
		.pipe(gulp.dest('bin/public/fonts'));
});

gulp.task('purge', function () {
	return gulp.src('./bin/public/')
		.pipe($.rimraf({ force: true }));
});

gulp.task('dev', ['purge'], function () {
	return gulp.src('./src/**')
		.pipe(gulp.dest('bin/public/'));
});

gulp.task('default', ['dev']);
