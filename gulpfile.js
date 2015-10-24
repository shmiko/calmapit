'use strict';

var gulp = require('gulp');
var forever = require('forever-monitor');
var gulpForever = require("gulp-forever");
gulp.paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e'
};

require('require-dir')('./gulp');

gulp.task('build', ['clean'], function () {
    gulp.start('buildapp');
});

//
//gulp.task('default', gulpForever(__filename, ['all']));
//gulp.task('all', function() {
//    gulp.watch('./test.js', function() {
//        console.log('test changed and I\'m working now');
//    });
//});
//gulp.task('server', function () {
//    new forever.Monitor('path/to/server-script.js').start();
//});
