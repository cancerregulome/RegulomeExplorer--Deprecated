var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    url = require('url'),
    proxy = require('proxy-middleware');

var routes = [
    ['/addama', 'http://explorer.cancerregulome.org/addama'],
    ['/solr', 'http://explorer.cancerregulome.org/solr']
];

var proxies = routes.map(function(proxyMap) {
    var route = url.parse(proxyMap[1]);
    route.route = proxyMap[0];
    return proxy(route);
});

gulp.task('browserSync', ['build'], function() {
    browserSync.init(['build/**'], {
        server: {
            baseDir: 'build',
            middleware: proxies
        },
    });
});