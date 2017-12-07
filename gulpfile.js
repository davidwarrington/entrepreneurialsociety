const gulp         = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      browser_sync = require('browser-sync'),
      concat       = require('gulp-concat'),
      del          = require('del'),
      sass         = require('gulp-sass');

const config = {
    npm_dir: './node_modules'
}

gulp.task('clean', cb => {
    return del(['./dist'], cb);
});

/**
 * Create Browser-Sync local server
 */
gulp.task('browser-sync', () => {
    browser_sync.init({
        server: {
            baseDir: './dist'
        }
    })
});

/**
 * Convert SASS to CSS, autoprefix CSS, move files to dist and reload page
 */
gulp.task('sass', () => {
    return gulp.src('./src/assets/sass/*.scss')
               .pipe(sass({
                   style: 'expanded',
                   onError: browser_sync.notify
               }))
               .pipe(autoprefixer(
                   ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
                   { cascade: true }
               ))
               .pipe(gulp.dest('./dist/assets/css'))
               .pipe(browser_sync.reload({ stream: true }));
});

/**
 * Concatenate JS files, move to dist and reload page
 */
gulp.task('scripts', () => {
    return gulp.src([
                    config.npm_dir + '/jquery/dist/jquery.min.js',
                    config.npm_dir + '/popper.js/dist/umd/popper.min.js',
                    config.npm_dir + '/boostrap/dist/js/bootstrap.min.js',
                    config.npm_dir + '/jquery.easing/jquery.easing.min.js',
                    './src/assets/js/vendor/*.js',
                    './src/assets/js/*.js'
                ])
                .pipe(concat('scripts.js'))
                .pipe(gulp.dest('./dist/assets/js'))
                .pipe(browser_sync.stream())
});

/**
 * Move images to dist, reload page
 */
gulp.task('images', () => {
    return gulp.src('./src/assets/img/**/*')
               .pipe(gulp.dest('./dist/assets/img'))
               .pipe(browser_sync.stream());
});

/**
 * Move HTML to dist, reload page
 */
gulp.task('html', () => {
    return gulp.src('./src/*.html')
               .pipe(gulp.dest('./dist'))
               .pipe(browser_sync.stream());
});

/**
 * Gulp watch task, watch for file changes
 */
gulp.task('watch', () => {
    gulp.watch('./src/assets/img/*', ['images']);
    gulp.watch('./src/assets/img/**/*', ['images']);
    gulp.watch('./src/assets/js/*.js', ['scripts']);
    gulp.watch('./src/assets/js/**/*.js', ['scripts']);
    gulp.watch('./src/assets/sass/*.scss', ['sass']);
    gulp.watch('./src/assets/sass/**/*.scss', ['sass']);
    gulp.watch('./src/*.html', ['html']);
    gulp.watch('./src/**/*.html', ['html']);
});

/**
 * Default task, running just 'gulp' will run open the server and run the watch task
 */
gulp.task('default', ['clean', 'html', 'sass', 'scripts', 'images', 'browser-sync', 'watch']);
