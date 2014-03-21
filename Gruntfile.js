// Generated on 2013-11-20 using generator-webapp 0.4.4
'use strict';
var SERVER_PORT = 9000;
// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);
    var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;


    grunt.initConfig({
        
        // Project settings
        config: {
            // Configurable paths
            app: 'app',
            dist: 'dist'
        },

        watch: {
            styles: {
                files: ['<%= config.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= config.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
                ]
            },
            handlebars: {
                files: [
                    '<%= config.app %>/scripts/views/templates/{,*/}*.hbs'
                ],
                tasks: ['handlebars']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            jstest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['test:watch']
            },
            js: {
                files: ['<%= config.app %>/scripts/{,*/}*.js'],
//                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
        },
        connect: {
            options: {
                port: SERVER_PORT,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: '0.0.0.0'
            },
            proxies: [
                {
                    context : '/svc',  //identify request to proxy via URL
                    host : 'kraken',  //config this or proxy won't work
                    port : 8000, //config this or proxy won't work
                    // https : false,
                    changeOrigin : false,
                    // rewrite: {
                    //     '^/mongo' : ''  //remove /mongo from proxied request
                    // }
                }
            ],
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= config.app %>'
                    ],
                    middleware: function(connect, options) {
                        // Same as in grunt-contrib-connect
                        var middlewares = [];
                        var directory = options.directory ||
                            options.base[options.base.length - 1];
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        // Add Proxy middleware
                        middlewares.push(proxySnippet);

                        // Same as in grunt-contrib-connect
                        options.base.forEach(function(base) {
                            middlewares.push(connect.static(base));
                        });

                        middlewares.push(connect.directory(directory));
                        return middlewares;
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= config.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= config.dist %>',
                    livereload: false
                }
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    
                    baseUrl: '<%= config.app %>/scripts/',
                    mainConfigFile : '<%= config.app %>/scripts/main.js',
                    name: 'main',
                    out            : '.tmp/concat/scripts/main.js',

                    optimize: 'none',
                    paths: {
                        'templates': '../../.tmp/scripts/templates'
                    },
                    // TODO: Figure out how to make sourcemaps work with grunt-usemin
                    // https://github.com/yeoman/grunt-usemin/issues/30
                    // generateSourceMaps: true,
                    // required to support SourceMaps
                    // http://requirejs.org/docs/errors.html#sourcemapcomments
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true,
                    // prevent build from packing plugins.  
                    // Built application cannot dynamically load files.
                    stubModules: ['json', 'text']
                    //uglify2: {} // https://github.com/mishoo/UglifyJS2
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/scripts/{,*/}*.js',
                '!<%= config.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
            dist: {}
        },*/
        // not enabled since usemin task does concat and uglify
        // check index.html to edit your build targets
        // enable this task if you prefer defining your build targets here
        /*uglify: {
            dist: {}
        },*/
      // Automatically inject Bower components into the HTML file
        bowerInstall: {
            app: {
                src: ['<%= config.app %>/index.html'],
                ignorePath: '<%= config.app %>/'
            }
        },

        rev: {
            dist: {
                files: {
                    src: [
                        '<%= config.dist %>/scripts/{,*/}*.js',
                        '<%= config.dist %>/styles/{,*/}*.css',
                        // '<%= config.dist %>/images/{,*/}*.{gif,jpeg,jpg,png,webp}',
                        '<%= config.dist %>/styles/fonts/{,*/}*.*',
                        '<%= config.dist %>/*.{ico,png}'
                    ]
                }
            }
        },
        handlebars: {
            compile: {
                options: {
                    namespace: 'JST',
                    amd: true
                },
                files: {
                    '.tmp/scripts/templates.js': ['<%= config.app %>/scripts/views/templates/{,*/}*.hbs']
                }
            }
        },
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>',
                flow: {
                    pack: {
                        steps: {
                            'js': ['concat'],
                            'css': ['concat', 'cssmin']
                        },
                        post: {}
                    },
                    html: {
                        steps: {
                            'js': ['concat','uglifyjs'],
                            'css': ['concat', 'cssmin']
                        },
                        post: {}
                    }
                }
            },
            html: '<%= config.app %>/index.html',
            pack: '<%= config.app %>/index.html'
        },
        usemin: {
            options: {
                assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/styles/{,*/}*.css']
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },
        // cssmin: {
            // This task is pre-configured if you do not wish to use Usemin
            // blocks for your CSS. By default, the Usemin block from your
            // `index.html` will take care of minification, e.g.
            //
            //     <!-- build:css({.tmp,app}) styles/main.css -->
            //
            // dist: {
            //     files: {
            //         '<%= config.dist %>/styles/main.css': [
            //             '.tmp/styles/{,*/}*.css',
            //             '<%= config.app %>/styles/{,*/}*.css'
            //         ]
            //     }
            // }
        // },
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif,png,jpg,bmp}',
                        '{,*/}*.html',
                        'fonts/{,*/}*.*'
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },
            pack: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        'bower_components/requirejs/require.js'
                    ]
                }]
            }
        },
        modernizr: {
            devFile: '<%= config.app %>/bower_components/modernizr/modernizr.js',
            outputFile: '<%= config.dist %>/bower_components/modernizr/modernizr.js',
            files: [
                '<%= config.dist %>/scripts/{,*/}*.js',
                '<%= config.dist %>/styles/{,*/}*.css',
                '!<%= config.dist %>/scripts/vendor/*'
            ],
            uglify: true
        },
        concurrent: {
            server: [
                'copy:styles',
                'handlebars'
            ],
            test: [
                'copy:styles',
                'handlebars'
            ],
            dist: [
                'copy:styles',
                'handlebars',
                'svgmin',
                'htmlmin'
            ]
        }
    });

    grunt.registerTask('createDefaultTemplate', function() {
        grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
    });


    grunt.registerTask('serve', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
	        'configureProxies',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function() {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('test', function (target) {
         if (target !== 'watch') {
            grunt.task.run([
                'clean:server',
                'createDefaultTemplate',
                'concurrent:test',
                'autoprefixer'
            ]);
        }

        grunt.task.run([
            'connect:test',
            'mocha'
        ]);
    });

    grunt.registerTask('pack', [
        'clean:dist',
        'createDefaultTemplate',
        'handlebars',
        'useminPrepare:pack',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'requirejs:dist',
        'cssmin',
        // 'modernizr',
        'copy:dist',
        'copy:pack',
        
        'rev',
        'usemin',
        'htmlmin'
    ]);


    grunt.registerTask('build', [
        'clean:dist',
        'createDefaultTemplate',
        'handlebars',
        'useminPrepare:html',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'requirejs:dist',
        'cssmin',
        'uglify',
        // 'modernizr',
        'copy:dist',
        
        'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
//        'newer:jshint',
        'test',
        'build'
    ]);
};
