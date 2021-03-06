var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

var config = {
  webRoot: 'public',
  devRoot: 'app'
}

function handlerErr(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('server', ['build', 'sass'], function() {
  browserSync.init({
    server: {
      baseDir: config.webRoot
    }
  })
})

gulp.task('build', function() {
  gulp.src('app/**/*.html')
      .pipe(gulp.dest('public'));
})

gulp.task('rebuild', ['build', 'cpJs'], function() {
  browserSync.reload();
})

gulp.task('sass', function() {
  gulp.src('app/**/*.scss')
      .pipe(sass()).on('error', handlerErr)
      .pipe(gulp.dest('public'))
      .pipe(browserSync.reload({stream: true}));
})

gulp.task('cp', function() {
  gulp.src('app/**/*.png')
      .pipe(gulp.dest('public'));
})

gulp.task('cpJs', function() {
  gulp.src('app/**/*.js')
      .pipe(gulp.dest('public'))
      .pipe(browserSync.reload({stream: true}));
})

gulp.task('watch', function() {
  gulp.watch(['app/**/*.html'], ['rebuild']);
  gulp.watch(['app/**/*.scss'], ['sass']);
  gulp.watch(['app/**/*.png'], ['cp']);
  gulp.watch(['app/**/*.js'], ['cpJs']);
})

gulp.task('default', ['server', 'watch', 'cp', 'cpJs'])

