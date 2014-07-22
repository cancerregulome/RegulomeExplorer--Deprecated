/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   If the watch task is running, this uses watchify instead
   of browserify for faster bundling using caching.
*/

var browserify   = require('browserify');
var watchify     = require('watchify');
var bundleLogger = require('../util/bundleLogger');
var gulp         = require('gulp');
var handleErrors = require('../util/handleErrors');
var source       = require('vinyl-source-stream');

var es6ify = require('es6ify');
var reactify = require('reactify');

es6ify.traceurOverrides = {
        experimental: true
    };

var dist = "./build";

var vendorFiles = [
    'bower_components/react/react.js',
    'bower_components/react/addons.js',
    'node_modules/es6ify/node_modules/traceur/bin/traceur-runtime.js'
];
var vendorBuild = dist + '/vendor';
var requireFiles = 'react';

gulp.task('browserify', function() {

    var bundleMethod = global.isWatching ? watchify : browserify;

    gulp.src(vendorFiles)
        .pipe(gulp.dest(vendorBuild));

    var bundler = bundleMethod({
        // Specify the entry point of your app
        entries: ['./app/scripts/app.js'],
        // Add file extentions to make optional in your requires
        extensions: ['.js']
    });

    bundler.require(requireFiles);
    bundler.transform(reactify);

    // Use a match pattern that only matches the .js files under the viewerapp directory.
    // If .js gets matched under node_modules/react/lib, the es6ify transform fails.
    bundler.transform(es6ify.configure(/^(?!.*node_modules).+\.js$/));

    var bundle = function() {
        // Log when bundling starts
        bundleLogger.start();

        return bundler
            // Enable source maps!
            .bundle({debug: true})
            // Report compile errors
            .on('error', handleErrors)
            // Use vinyl-source-stream to make the
            // stream gulp compatible. Specifiy the
            // desired output filename here.
            .pipe(source('app.js'))
            // Specify the output destination
            .pipe(gulp.dest(dist+ '/bundle'))
            // Log when bundling completes!
            .on('end', bundleLogger.end);
    };

    if(global.isWatching) {
        // Rebundle with watchify on changes.
        bundler.on('update', bundle);
    }

    return bundle();
});