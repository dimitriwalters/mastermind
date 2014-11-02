var gulp = require('gulp');
var inject = require('gulp-inject');
var bowerFiles = require('main-bower-files');

gulp.task('index', function () {
  gulp.src('./index.html')
    .pipe(inject(gulp.src(bowerFiles(), {read: false}), {
      name: 'bower', addRootSlash: false
    }))
    .pipe(gulp.dest('./'));
});