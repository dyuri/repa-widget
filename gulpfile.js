const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const rollup = require("gulp-better-rollup");
const resolve = require("rollup-plugin-node-resolve");
const babel = require("rollup-plugin-babel");
const commonjs = require("rollup-plugin-commonjs");
const terser = require("rollup-plugin-terser").terser;
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const cssnext = require("postcss-cssnext");
const cssimport = require("postcss-import");
const cssnano = require("cssnano");

gulp.task("js-nobabel-nosm", () => {
  return gulp
    .src("js/*.js")
    .pipe(
      rollup({
        plugins: [terser()]
      },
      {
        format: "umd"
      })
    )
    .pipe(gulp.dest("bundle"));
});

gulp.task("js-nobabel-sm", () => {
  return (
    gulp
      .src("js/*.js")
      .pipe(sourcemaps.init())
      .pipe(
        rollup({
          plugins: [terser()]
        },
        {
          format: "umd"
        })
      )
      // inlining the sourcemap into the exported .js file
      .pipe(sourcemaps.write())
      .pipe(rename({ suffix: ".sm" }))
      .pipe(gulp.dest("bundle"))
  );
});

gulp.task("js-babel-nosm", () => {
  return gulp
    .src("js/*.js")
    .pipe(
      rollup(
        {
          plugins: [resolve(), babel(), commonjs(), terser()]
        },
        {
          format: "umd"
        }
      )
    )
    .pipe(rename({ suffix: ".ie" }))
    .pipe(gulp.dest("bundle"));
});

gulp.task("js-babel-sm", () => {
  return gulp
    .src("js/*.js")
    .pipe(sourcemaps.init())
    .pipe(
      rollup(
        {
          plugins: [resolve(), babel(), commonjs(), terser()]
        },
        {
          format: "umd"
        }
      )
    )
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: ".ie.sm" }))
    .pipe(gulp.dest("bundle"));
});

gulp.task("css-nosm", () => {
  return gulp
    .src("css/*.css")
    .pipe(postcss([cssimport, cssnext, cssnano]))
    .pipe(gulp.dest("bundle"));
});

gulp.task("css-sm", () => {
  return gulp
    .src("css/*.css")
    .pipe(sourcemaps.init())
    .pipe(postcss([cssimport, cssnext, cssnano]))
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: ".sm" }))
    .pipe(gulp.dest("bundle"));
});

const cssBundle = gulp.parallel("css-nosm", "css-sm");
const jsBundle = gulp.parallel("js-nobabel-nosm", "js-nobabel-sm", "js-babel-nosm", "js-babel-sm");

gulp.task("css", cssBundle);
gulp.task("js", jsBundle);

gulp.task("bundle", gulp.parallel("css", "js"));

gulp.task("watch-css", () => {
  return gulp.watch(["css/**/*.css"], cssBundle);
});

gulp.task("watch-js", () => {
  return gulp.watch(["js/**/*.js"], jsBundle);
});

gulp.task("watch", gulp.parallel("watch-css", "watch-js"));
