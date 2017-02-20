/// <binding BeforeBuild='default' ProjectOpened='default' />
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    debug = require('gulp-debug'),
    cleanCSS = require('gulp-clean-css'),
    templateCache = require('gulp-angular-templatecache');

var config = {
    clientApp: 'app',
    dist: 'content/dist',
    vendorSrc: [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-sanitize/angular.sanitize.js',
        'bower_components/moment/moment.js',
        'bower_components/angular-moment-service/release/angular-momentjs-service.js',
        'bower_components/bootstrap-daterangepicker/daterangepicker.js',
        'bower_components/angular-daterangepicker/js/angular-daterangepicker.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'bower_components/angular-loading-bar/build/loading-bar.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js' //the bower version is out of date
    ],
    cssSrc: [
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'bower_components/bootstrap-daterangepicker/daterangepicker.css',
        'bower_components/font-awesome/css/font-awesome.css',
        'bower_components/angular-loading-bar/build/loading-bar.css',
        'Content/css/**/*.css'
    ],
    htmltemplates: 'app/**/*.html'
};

gulp.task('vendor', function () {
    return gulp.src(config.vendorSrc)
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(config.dist + '/js/'))
});

gulp.task('minify-css', function () {
    return gulp.src(config.cssSrc)
        .pipe(sourcemaps.init())
            .pipe(cleanCSS())
            .pipe(autoprefixer('last 2 versions'))
            .pipe(concat('site.min.css'))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(config.dist + '/css'))
});

gulp.task("app-templates", function () {
    return gulp.src(config.htmltemplates)
       .pipe(templateCache({module: "app"}))
       .pipe(gulp.dest(config.clientApp))
});


gulp.task('app', ['app-templates'], function () {
    return gulp.src(config.clientApp + '/**/*.js')
        .pipe(sourcemaps.init())
            .pipe(concat('app.min.js'))
            .pipe(uglify())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(config.dist + '/js'));
});
gulp.task('fonts', function () {
    return gulp.src([
        'bower_components/font-awesome/fonts/fontawesome-webfont.*',
        'fonts/*'
    ]).pipe(gulp.dest('content/dist/fonts/'));
});
gulp.task('default', ['vendor', 'minify-css', 'app', 'fonts']);
