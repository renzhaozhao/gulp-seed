const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel')
const plumber = require('gulp-plumber')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const gutil = require("gulp-util");
const through = require("through2");

const connect = require('gulp-connect')

const copyright = require('./package.json').copyright

gulp.task('html', function () {
  gulp.src('./src/*.html')
    .pipe(gulp.dest('./public'))
    .pipe(connect.reload());
})

gulp.task('img', function () {
  gulp.src('./src/img/*')
    .pipe(gulp.dest('./public/img'))
})

gulp.task('js', () => {
  gulp.src('./src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(babel())
    .pipe(uglify())
    .pipe(ac())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/js'))
    .pipe(connect.reload())
})

gulp.task('sass', () => (
  gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(ac())
    .pipe(gulp.dest('./public/css'))
    .pipe(connect.reload())
))

gulp.task('watch', () => {
  gulp.watch('./src/js/**/*.js', ['js'])
  gulp.watch('./src/sass/**/*.scss', ['sass'])
  gulp.watch('./src/*.html', ['html'])
  gulp.watch('./src/*', ['img'])
})

gulp.task('init', ['sass', 'js', 'html', 'img']);

gulp.task('server', () => {
  connect.server({
    root: 'public',
    livereload: true,
    port: 8888
  });
})

gulp.task('default', ['server', 'watch'])

function ac() {
  var stream = through.obj(function (file, enc, cb) {
    if (file.isBuffer()) {
      file.contents = new Buffer(copyright + file.contents.toString())
      this.push(file);
      return cb();
    }
    else {
      gutil.log(gutil.colors.cyan('warning:'), "there's something wrong with the file");
    }
    return cb();
  });
  return stream;
}

