var gulp = require('gulp');

gulp.task('styles', function() {
    return gulp.src('app/styles/*.css')
        .pipe(gulp.dest('build/styles'));
});