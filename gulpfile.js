"use strict";

//require modules
var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del'),
imagemin = require('gulp-imagemin'),
webserver = require('gulp-connect'),
runSequence = require('run-sequence'),
cssmin = require('gulp-clean-css'),
ngAnnotate = require('gulp-ng-annotate');

var jsFiles= 'public/js/*.js',
    jsDest = 'public/dist/scripts',
    cssFiles = 'public/css/*.css',
    cssDest = 'public/dist/styles';

//concat the scripts
gulp.task("concatScripts", function() {
    return gulp.src(jsFiles)
    .pipe(concat('global.js'))
    .pipe(gulp.dest(jsDest));
});

//minify the scripts
gulp.task("scripts", ["concatScripts"], function() {
  return gulp.src("public/dist/scripts/global.js")
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest(jsDest));
});

//concat css
gulp.task("concatCss", function(){
  return gulp.src(cssFiles)
    .pipe(concat('main.css'))
    .pipe(gulp.dest(cssDest));
});

//compile sass
gulp.task('compileSass', function() {
  return gulp.src("sass/global.scss")
    .pipe(sass())
    .pipe(gulp.dest('css'));


});

//minify the css
gulp.task('styles', ['concatCss'], function(){
    return gulp.src('public/dist/styles/main.css')
      .pipe(cssmin())
      .pipe(rename('all.min.css'))
      .pipe(gulp.dest(cssDest));
});

//clean task to clean up the folders before the build runs
gulp.task('clean', function() {
  return del(['public/dist/content/**', 'public/dist/scripts/**', 'public/dist/styles/**']);

});

//minifiy images, dest dist/content
gulp.task('images', function() {
  return gulp.src('images/*')
             .pipe(imagemin())
             .pipe(gulp.dest('dist/content'))
});

//watch function for any javascript file changes
gulp.task('watch', function() {
  gulp.watch(['public/js/*.js', 'public/css/*.css'], ['scripts', 'styles']);
});


//set up the build task to call the other tasks, with clean completing first.
gulp.task('build', function() {
  runSequence('clean', ['scripts', 'styles', 'images']);
});

//set up the default gulp task to have build as a dependency.
gulp.task('default', ['build']);

