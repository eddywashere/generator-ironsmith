var fs = require('fs');
var del = require('del');
var gulp = require('gulp');
var connect = require('gulp-connect');
var ironsmith = require('./ironsmith');
var ghPages = require('gulp-gh-pages');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

var images = function() {
  return gulp.src([
    'images/**/*'
  ])
  .pipe(gulp.dest('build/images'));
};

gulp.task('images', ['clean'], images);
gulp.task('images-watch', images);

gulp.task('clean', function (cb) {
  return del(['build'], cb);
});

var styles = function() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: []
    }).on('error', sass.logError))
    .pipe(gulp.dest('./build/css'));
};

gulp.task('styles', ['clean'], styles);
gulp.task('styles-watch', styles);

var scripts = function() {
  return gulp.src('js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
};

gulp.task('scripts', ['clean'], scripts);
gulp.task('scripts-watch', scripts);

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

gulp.task('server', function () {
  connect.server({
    root: ['build'],
    port: 8000,
    livereload: true,
    middleware: function(connect, opt) {
      return [
      connect.static('build'),
      function(req, res, next) {
        var file = fs.readFileSync('./build/404.html');
        res.statusCode = 404;
        res.end(file);
      }];
    }
  });
});

var metalsmith = function(){
  ironsmith();
};

gulp.task('metalsmith', ['clean'], metalsmith);
gulp.task('metalsmith-watch', metalsmith);

var metalsmithProd = function(){
  ironsmith(true);
};

gulp.task('metalsmith:prod', ['clean'], metalsmithProd);
gulp.task('metalsmith:prod-watch', metalsmithProd);

gulp.task('watch', function () {
  gulp.watch(['images/*'], ['images-watch']);
  gulp.watch('./js/**/*.js', ['scripts-watch']);
  gulp.watch('./scss/**/*.scss', ['styles-watch']);
  gulp.watch(['./src/**/*.html', './src/**/*.md', './templates/**/*.html'], ['metalsmith-watch']);
});

gulp.task('watch:prod', function () {
  gulp.watch(['images/*'], ['images-watch']);
  gulp.watch('./js/**/*.js', ['scripts-watch']);
  gulp.watch('./scss/**/*.scss', ['styles-watch']);
  gulp.watch(['./src/**/*.html', './src/**/*.md', './templates/**/*.html'], ['metalsmith:prod-watch']);
});

gulp.task('build', ['images', 'styles', 'scripts', 'metalsmith']);
gulp.task('build:prod', ['images', 'styles', 'scripts', 'metalsmith:prod']);
gulp.task('preview', ['watch', 'build', 'server']);
gulp.task('default', ['watch', 'build', 'server']);
