const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const concat = require('gulp-concat');
const replace = require('gulp-replace');

gulp.task('clean', function(cb) {
    del(['./dist/*']);
    cb();
})

gulp.task('sass', function(cb) {
    gulp.src('./src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist'))
    cb();
})

gulp.task('copy:html', function (cb) {
    gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'))
    cb()
})

const scripts = (paths, outputFilename, outputPath) => {
    return gulp
        .src(paths)
        .pipe(concat(outputFilename))
        // .pipe(replace(/((?!require).*)/,'//replace'))
        .pipe(replace(/((module.exports).*)/,'//replace'))
        .pipe(gulp.dest(outputPath));
};

gulp.task('copy:js', function (cb) {
    scripts(['./src/script/**/*.js'], 'index.js', './dist/script', false);
    cb()
})

gulp.task('copy:img', function (cb) {
    gulp.src('./src/img/**/*.{jpg,gif,png,ico}')
        .pipe(gulp.dest('./dist/img'))
    cb()
})

gulp.task('copy:fonts', (cb) => {
    gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'))
    cb()
})


gulp.task('watch', () => {
    gulp.watch('./src/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/**/*.html', gulp.series('copy:html'));
    gulp.watch('./src/**/*.js', gulp.series('copy:js'));
});


gulp.task('default', gulp.series(['clean', 'sass', 'copy:html', 'copy:js', 'copy:img', 'copy:fonts',gulp.parallel(['watch'])]))