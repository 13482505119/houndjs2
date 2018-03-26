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
        concat: {
            dist: {
                src: [
                    'node_modules/swiper/dist/js/swiper.min.js',
                    'node_modules/sweetalert/dist/sweetalert.min.js',
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/jquery-form/dist/jquery.form.min.js',
                    'node_modules/jquery-validation/dist/jquery.validate.min.js',
                    'node_modules/jquery.cookie/jquery.cookie.js',
                    'node_modules/requirejs/require.js',
                    'src/js/hound.js'
                ],
                dest: 'dist/js/hound.js'
            }
        },
        uglify: {
            dist: {
                files: [
                    {
                        'dist/js/hound.min.js': [
                            'dist/js/hound.js'
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
                        'node_modules/normalize.css/normalize.css',
                        'node_modules/swiper/dist/css/swiper.min.css',
                        'dist/css/hound.css'
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
                        cwd: 'src',
                        dest: 'dist',
                        src: [
                            '**/*.{html,js,css}',
                            '**/*.{png,jpg,gif}'
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
        //'sass:dist',
        //'jshint',
        //'copy:dist',
        //'useminPrepare',
        //'usemin',
        //'includereplace:dist',
        //'autoprefixer:dist',
        'cssmin:dist',
        'concat:dist',
        'uglify'
    ]);

    // Default task(s).
    grunt.registerTask('default');

};