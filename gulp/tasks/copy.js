var gulp = require('gulp');

gulp.task('copy', function() {
    return gulp.src('app/**/*.html')
        .pipe(gulp.dest('build'));
});