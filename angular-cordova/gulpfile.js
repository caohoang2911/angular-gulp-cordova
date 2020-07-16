var gulp = require('gulp');
var gulpSass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var del = require('del');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var pug = require('gulp-pug');
var inject = require('gulp-inject');
var merge = require('merge-stream');
var cleanCss = require('gulp-clean-css');
var replace = require('gulp-replace');
var sourcemaps = require('gulp-sourcemaps');

function delWWW() {
    return del(['www'], {
        force: true
    })
}

function serve(done) {
    browserSync.init({
        server: 'www',
        port: 3000
    });
    done();
}

function bundleCss() {
    const template = gulp.src(['src/app/pages/**/*.scss'])
        .pipe(gulpSass())
        .pipe(gulp.dest(['www/pages']))

    return merge(template);
}

function bundlePug() {
    const template = gulp.src(['src/app/templates/*.pug'])
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('www/templates'))
    const pages = gulp.src(['src/app/pages/**/*.pug'])
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(['www/pages']))

    return merge(template, pages);
}

function minifyJSBuild() {
    return gulp.src(['src/**/*.js'])
        .pipe(concat('script.js'))
        .pipe(minify())
        .pipe(gulp.dest(['www']))
}

function minifyCSS() {
    console.log('minifyCss')
    return gulp.src([
        'www/pages/**/*.css',
    ]).pipe(concat('style.min.css'))
        .pipe(cleanCss())
        .pipe(minify())
        .pipe(gulp.dest(['www']))
}

function injectFileBuild() {
    const cssFile = gulp.src(['www/style.min.css']);
    const fileJS = gulp.src(['www/script-min.js'])
    return gulp.src(['src/app/index.pug'])
        .pipe(pug({pretty: true}))
        .pipe(inject(cssFile))
        // .pipe(inject(fileJS))
        .pipe(gulp.dest(['www']))
}

function injectFileServe() {
    console.log('0lks')
    const cssFile = gulp.src([
        'www/pages/**/*.css',
    ])
    const fileJS = gulp.src([
        'src/app/pages/**/*.js',
    ])
    return gulp.src(['src/app/index.pug'])
        .pipe(pug({pretty: true}))
        .pipe(inject(cssFile))
        .pipe(inject(fileJS))
        .pipe(replace('href="/' + 'www' + '/', 'href="/'))
        .pipe(replace('src="/' + 'www' + '/', 'src="/'))
        .pipe(gulp.dest(['www']))
}

function reloadServe() {
    return browserSync.reload();
}

// function watch() {
//     return gulp.src([
//         'src/app/*.js',
//         'src/app/*.scss',
//         'src/app/*.pug'
//     ], gulp.series(
//         delWWW,
//         bundlePug,
//         bundleJS,
//         bundleCss,
//         'minify',
//         injectFileServe,
//         reloadServe
//     ))
// }

// task child
gulp.task('minify', gulp.series(
    minifyCSS,
))

// run build
gulp.task('default', gulp.series(
    bundlePug,
    bundleCss,
    'minify',
    injectFileServe,
    serve,
    // watch
))
gulp.task('build-web', gulp.series(
    delWWW,
    bundlePug,
    minifyJSBuild,
    bundleCss,
    'minify',
    injectFileBuild
));

