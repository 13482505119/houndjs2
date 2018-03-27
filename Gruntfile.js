/**
 * Created by Administrator on 2018/3/26.
 */

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        'dist/*'
                    ]
                }]
            }
        },
        jshint: {
            dist: [
                'src/js/*.js',
                '!src/js/json2.js',
            ]
        },
        concat: {
            dist: {
                files: {
                    'dist/js/hound.js': [
                        'node_modules/jquery/dist/jquery.min.js',
                        'node_modules/jquery-form/dist/jquery.form.min.js',
                        'node_modules/jquery-validation/dist/jquery.validate.min.js',
                        'node_modules/jquery.cookie/jquery.cookie.js',
                        'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
                        'node_modules/sweetalert/dist/sweetalert.min.js',
                        'src/js/json2.js',
                        'node_modules/requirejs/require.js',
                        'src/js/hound.js'
                    ],
                    'dist/js/hound.mobile.js': [
                        'node_modules/jquery/dist/jquery.min.js',
                        'node_modules/jquery-form/dist/jquery.form.min.js',
                        'node_modules/jquery-validation/dist/jquery.validate.min.js',
                        'node_modules/jquery.cookie/jquery.cookie.js',
                        'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
                        'node_modules/sweetalert/dist/sweetalert.min.js',
                        'src/js/json2.js',
                        'node_modules/swiper/dist/js/swiper.min.js',
                        'node_modules/iscroll/build/iscroll-probe.js',
                        'node_modules/requirejs/require.js',
                        'src/js/pullLoad.js',
                        'src/js/hound.js'
                    ],
                    'dist/css/hound.css': [
                        'node_modules/vali-admin/docs/css/main.css',
                        'node_modules/font-awesome/css/font-awesome.css',
                        'src/css/hound.css'
                    ],
                    'dist/css/hound.mobile.css': [
                        'node_modules/vali-admin/docs/css/main.css',
                        'node_modules/font-awesome/css/font-awesome.css',
                        'node_modules/swiper/dist/css/swiper.min.css',
                        'src/css/hound.css'
                    ]
                }
            }
        },
        uglify: {
            dist: {
                files: [
                    {
                        'dist/js/hound.min.js': [
                            'dist/js/hound.js'
                        ],
                        'dist/js/hound.mobile.min.js': [
                            'dist/js/hound.mobile.js'
                        ]
                    }
                ]
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: false
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src/scss/',
                        src: ['*.scss'],
                        dest: 'src/css/',
                        ext: '.css'
                    }
                ]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: 'css/*.css',
                        dest: 'src/'
                    }
                ]
            }
        },
        cssmin: {
            dist: {
                files: {
                    'dist/css/hound.min.css': [
                        'dist/css/hound.css'
                    ],
                    'dist/css/hound.mobile.min.css': [
                        'dist/css/hound.mobile.css'
                    ]
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: 'node_modules/font-awesome/fonts',
                        dest: 'dist/fonts',
                        src: [
                            '*'
                        ]
                    }
                ]
            }
        },
        watch: {
            scripts: {
                files: ['src/js/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            sass: {
                files: ['src/scss/*.scss'],
                tasks: ['sass', 'autoprefixer']
            },
            styles: {
                files: ['src/css/*.css'],
                tasks: ['autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'src/*.html'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                open: false,
                livereload: 35729,
                hostname: '*'
            },
            livereload: {
                options: {
                    base: 'demo'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //server
    grunt.registerTask('server', [
        'sass:dist',
        'autoprefixer:dist',
        'connect:livereload',
        'watch'
    ]);

    //build
    grunt.registerTask('build', [
        'clean:dist',
        'sass:dist',
        'jshint',
        'copy:dist',
        'autoprefixer:dist',
        'concat:dist',
        'cssmin:dist',
        'uglify'
    ]);

    // Default task(s).
    grunt.registerTask('default');

};