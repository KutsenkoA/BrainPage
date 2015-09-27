/**
 * Created by andr on 27.09.15.
 */
'use strict';

var
  gulp = require('gulp'),
  bower = require('gulp-bower'),
  googlecdn = require('gulp-google-cdn');

var
  src = {
    html: '*.html'
  },
  build = {
    html: 'build',
    lib: 'build/lib'
  };

gulp.task('html:build', function() {
  gulp.src(src.html)
    .pipe(googlecdn(require('./bower.json')))
    .pipe(gulp.dest(build.html));
});

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest(build.lib));
});