var gulp = require('gulp');

gulp.task('watch', ['setWatch', 'browserSync'], function() {
    gulp.watch('./images/**', ['images']);
    gulp.watch('./app/**/*.html', ['copy']);
    gulp.watch('./app/styles/**/*.css', ['styles.js']);
    // Note: The browserify task handles js recompiling with watchify
});