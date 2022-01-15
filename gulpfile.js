const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const concat = require('gulp-concat');
const removeCode = require('gulp-remove-code');


gulp.task('clean', function(cb) {
    del(['./dist/*']);
    cb();
})

gulp.task('sass', function(cb) {
    gulp.src('./web/src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist'))
    cb();
})

gulp.task('copy:html', function (cb) {
    gulp.src('./web/src/index.html')
        .pipe(gulp.dest('./dist'))
    cb()
})

const scripts = (paths, outputFilename, outputPath) => {
    return gulp
        .src(paths)
        .pipe(concat(outputFilename))
        .pipe(removeCode({ production: true }))
        .pipe(gulp.dest(outputPath));
};

gulp.task('copy:js', function (cb) {
    scripts(['./web/src/script/**/*.js'], 'index.js', './dist/script', false);
    cb()
})

gulp.task('copy:img', function (cb) {
    gulp.src('./web/src/img/**/*.{jpg,gif,png,ico}')
        .pipe(gulp.dest('./dist/img'))
    cb()
})

gulp.task('copy:fonts', (cb) => {
    gulp.src('./web/src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'))
    cb()
})


gulp.task('watch', () => {
    gulp.watch('./web/src/**/*.scss', gulp.series('sass'));
    gulp.watch('./web/src/**/*.html', gulp.series('copy:html'));
    gulp.watch('./web/src/**/*.js', gulp.series('copy:js'));
});


gulp.task('default', gulp.series(['clean', 'sass', 'copy:html', 'copy:js', 'copy:img', 'copy:fonts',gulp.parallel(['watch'])]))