'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var historyApiFallback = require('connect-history-api-fallback');
var webserver = require("gulp-webserver");
var plugins = require('gulp-load-plugins')();
var connect = require('gulp-connect');
var environments = require('gulp-environments');

gulp.paths = {
    dist: 'dist/',
    src: 'src/',
    vendors: 'dist/vendors/'
};

var paths = gulp.paths;

require('require-dir')('./gulp-tasks');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'webserver'], function () {

    // browserSync.init({
    //     server: ['./', './src'],
    // });

    gulp.watch(paths.src + 'scss/**/*.scss', ['sass']);
    gulp.watch(paths.src + '**/*.html');
    gulp.watch(paths.src + 'js/**/*.js');
    // gulp.watch(paths.src + '**/*.html').on('change', browserSync.reload);
    // gulp.watch(paths.src + 'js/**/*.js').on('change', browserSync.reload);


});

// Static Server without watching scss files
gulp.task('serve:lite', function () {

    // browserSync.init({
    //     server: ['./', './src']
    // });

    gulp.watch(paths.src + '**/*.css').on('change', browserSync.reload);
    gulp.watch(paths.src + '**/*.html').on('change', browserSync.reload);
    gulp.watch(paths.src + 'js/**/*.js').on('change', browserSync.reload);

});

gulp.task('serve:dist', function () {
    browserSync.init({
        server: ['./dist']
    });
});

gulp.task('sass', ['compile-vendors'], function () {
    return gulp.src(paths.src + '/scss/style.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.src + 'css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.src + 'css'))
        .pipe(browserSync.stream());
});

gulp.task('sass:watch', function () {
    gulp.watch(paths.src + 'scss/**/*.scss', ['sass']);
});

gulp.task('default', ['serve']);

gulp.task('webserver', function() {
    gulp.src(['./', './src'])
        .pipe(webserver({
            port: 3000,
            proxies: [
                {
                    source: '/blud-auth-server', target: 'http://localhost:8080/blud-auth-server'
                },
                {
                    source: '/blud-resource-server', target: 'http://localhost:9090/blud-resource-server'
                },
                {
                    source: '/blud-report-server', target: 'http://localhost:7070/blud-report-server'
                }
            ]
        }));
});
