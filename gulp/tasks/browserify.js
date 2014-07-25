/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   If the watch task is running, this uses watchify instead
   of browserify for faster bundling using caching.
*/
var watchify = require('watchify');
var bundleLogger = require('../util/bundleLogger');
var gulp = require('gulp');
var handleErrors = require('../util/handleErrors');
var source = require('vinyl-source-stream');

var es6ify = require('es6ify');


es6ify.traceurOverrides = {
    experimental: true
};

var dist = './build';

var vendorPaths = ['node_modules/underscore/underscore.js', 'node_modules/react/react.js', 'node_modules/react/addons.js', 'node_modules/es6ify/node_modules/traceur/bin/traceur-runtime.js'];
var vendorBuild = dist + '/vendor';
var requireFiles = ['react', 'underscore'];

var bundlePaths = {
    src: 'app.js',
    dest: dist + '/bundle'
};

gulp.task('browserify', function() {

    gulp.src(vendorPaths).pipe(gulp.dest(vendorBuild));

    var bundler = watchify({
        // Specify the entry point of your app
        entries: ['./app/scripts/app.js'],
        // Add file extentions to make optional in your requires
        extensions: ['.js'],
        watch: global.isWatching
    });

    bundler.require(requireFiles);
    
    // Use a match pattern that only matches the .js files under the app directory.
    // If .js gets matched under node_modules/react/lib, the es6ify transform fails.
    bundler.transform(es6ify.configure(/^(?!.*node_modules).+\.js$/));

    function bundle() {
            // Log when bundling starts
            bundleLogger.start();

            return bundler
            // Enable source maps!
            .bundle({ debug: true })
            // Report compile errors
            .on('error', handleErrors)
            // Use vinyl-source-stream to make the
            // stream gulp compatible. Specify the
            // desired output filename here.
            .pipe(source(bundlePaths.src))
            // Specify the output destination
            .pipe(gulp.dest(bundlePaths.dest))
            // Log when bundling completes!
            .on('end', bundleLogger.end);
        }

    if (global.isWatching) {
        // Rebundle with watchify on changes.
        bundler.on('update', bundle);
    }

    return bundle();
});