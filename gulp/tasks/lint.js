var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('lint', function() {
    gulp.src('./app/scripts/**/*.js')
        .pipe(jshint('./.jshintrc'))
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});