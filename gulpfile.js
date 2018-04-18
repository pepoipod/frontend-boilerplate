const gulp = require('gulp');

const autoPrefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const cleanCSS = require('gulp-clean-css');
const packageImporter = require('node-sass-package-importer');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourceMaps = require('gulp-sourcemaps');
const webpack = require("webpack");
const webpackStream = require("webpack-stream");


gulp.task('styles', () => {
  gulp.src('web/src/styles/index.scss')
    .pipe(plumber())
    .pipe(sourceMaps.init())
    .pipe(sass({
      importer: packageImporter({
        extensions: ['.scss', '.css']
      })
    }).on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(autoPrefixer())
    .pipe(sourceMaps.write('./'))
    .pipe(gulp.dest('./web/assets/css/'))
    .pipe(browserSync.stream());
});


gulp.task('scripts', () => {
  const webpackConfig = require('./webpack.config');

  webpackStream(webpackConfig, webpack)
    .pipe(plumber())
    .pipe(gulp.dest('./web/assets/js'))
    .pipe(browserSync.stream());
});


gulp.task('default', () => {
  browserSync.init({
    server: {
      baseDir: "./web"
    }
  });

  gulp.watch('web/src/styles/**/*.scss', ['styles']);
  gulp.watch('web/src/scripts/**/*.js', ['scripts']);
});
