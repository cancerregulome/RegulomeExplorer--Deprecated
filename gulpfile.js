'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');

var livereload = require('gulp-livereload');
var connect = require('connect');

var rename = require('gulp-rename');
var browserify = require('browserify');
var watchify = require('watchify');
var es6ify = require('es6ify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var open = require('gulp-open');


/** Config variables */
var serverPort = 9010;
var lrPort = 35729;


/** File paths */
var dist = 'dist';

var htmlFiles = 'app/**/*.html';

var devWatchList = [
    htmlFiles,
    'app/scripts/**/*.js'
];

var htmlBuild = dist;

var vendorFiles = [
    'bower_components/react/react-with-addons.js',
    'node_modules/es6ify/node_modules/traceur/bin/traceur-runtime.js'
];
var vendorBuild = dist + '/vendor';
var requireFiles = 'react';


gulp.task('vendor', function() {
    return gulp.src(vendorFiles).
    pipe(gulp.dest(vendorBuild));
});


gulp.task('html', function() {
    return gulp.src(htmlFiles).
    pipe(gulp.dest(htmlBuild));
});


function compileScripts(watch) {
    gutil.log('Starting browserify');

    var entryFile = './app/scripts/app.js';
    es6ify.traceurOverrides = {
        experimental: true
    };

    var bundler;
    if (watch) {
        bundler = watchify(entryFile);
    } else {
        bundler = browserify(entryFile);
    }

    bundler.require(requireFiles);
    bundler.transform(reactify);

    // Use a match pattern that only matches the .js files under the viewerapp directory.
    // If .js gets matched under node_modules/react/lib, the es6ify transform fails.
    bundler.transform(es6ify.configure(/^(?!.*node_modules).+\.js$/));

    var rebundle = function() {
        var stream = bundler.bundle({
            debug: true
        });

        stream.on('error', function(err) {
                console.error(err);
            });
        
        stream = stream.pipe(source(entryFile));

        stream.pipe(rename('app.js'));

        stream.pipe(gulp.dest('dist/bundle'));
    };

    bundler.on('update', rebundle);

    return rebundle();
}


gulp.task('server', function(next) {
    var server = connect();
    server.use(connect.static(dist)).listen(serverPort, next);

    var options = {
        url: 'http://localhost:' + serverPort,
        app: 'google-chrome'
    };

    gulp.src('./index.html')
        .pipe(open('', options));
});


function initWatch(files, task) {
    if (typeof task === 'string') {
        gulp.start(task);
        gulp.watch(files, [task]);
    } else {
        task.map(function(t) {
            gulp.start(t);
        });
        gulp.watch(files, task);
    }
}


/**
 * Run default task
 */
gulp.task('default', ['html', 'vendor', 'server'], function() {
    var lrServer = livereload(lrPort);
    var reloadPage = function(evt) {
        lrServer.changed(evt.path);
    };

    compileScripts(true);
    initWatch(devWatchList, 'html');

    gulp.watch([dist + '/**/*'], reloadPage);
});

/**
 * Run default task
 */
gulp.task('build', ['html', 'vendor'], function() {
    compileScripts(false);
});