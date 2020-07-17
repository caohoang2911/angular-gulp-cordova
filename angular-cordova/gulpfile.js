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
    const template = gulp.src([
        'src/app/pages/**/*.scss',
    ])
        .pipe(gulpSass())
        .pipe(gulp.dest(['www/pages']))
    const component = gulp.src([
        'src/app/components/**/*.scss'
    ])
        .pipe(gulpSass())
        .pipe(gulp.dest(['www/components']))
    const scss = gulp.src([
        'src/app/scss/*.scss'
    ])
        .pipe(gulpSass())
        .pipe(gulp.dest(['www/scss']))
    return merge(template, component, scss);
}

function bundlePug() {
    const root = gulp.src([
        'src/app/root/*.pug'
    ])
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('www/root'))
    const template = gulp.src([
        'src/app/templates/*.pug',

    ])
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('www/templates'))
    const pages = gulp.src(['src/app/pages/**/*.pug'])
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(['www/pages']))
    const component = gulp.src([
        'src/app/components/**/*.pug',
    ])
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(['www/components']))
    return merge(root, template, pages, component);
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
        .pipe(inject(fileJS))
        .pipe(gulp.dest(['www']))
}

function moveJS() {
    const rootJS = gulp.src([
        'src/app/root/*.js'
    ])
        .pipe(gulp.dest('www/root'))
    const pagesJS = gulp.src([
        'src/app/pages/**/*.js',
    ])
        .pipe(gulp.dest('www/pages'))
    const componentJS = gulp.src([
        'src/app/components/**/*.js'
    ])
        .pipe(gulp.dest('www/components'))
    const libJS = gulp.src([
        'src/app/lib/angular.min.js',
        'src/app/lib/angular-route.min.js',
        'src/app/lib/**/*.js'
    ])
        .pipe(gulp.dest('www/lib'))
    const services = gulp.src([
        'src/app/services/*.js'
    ])
        .pipe(gulp.dest('www/services'))
    const directives = gulp.src(
        ['src/app/directives/*.js']
    )
        .pipe(gulp.dest('www/directives'))
    return merge(rootJS, pagesJS, componentJS, libJS, services, directives)
}

function injectFileServe() {
    console.log('0lks')
    const cssFile = gulp.src([
        'www/scss/*.css',
        'www/pages/**/*.css',
        'www/components/**/*.css',
    ])
    const fileJS = gulp.src([
        'www/lib/angular.min.js',
        'www/lib/angular-route.min.js',
        'www/**/*.module.js',
        'www/services/*.js',
        'www/directives/*.js',
        'www/**/*.component.js',
        'www/components/**/*.js',
        'www/pages/**/*.js',

    ])
    return gulp.src(['src/app/index.pug'])
        .pipe(pug({pretty: true}))
        .pipe(inject(cssFile))
        .pipe(inject(fileJS))
        .pipe(replace('href="/' + 'www' + '/', 'href="/'))
        .pipe(replace('src="/' + 'www' + '/', 'src="/'))
        .pipe(gulp.dest(['www']))
}

function reloadServe(done) {
    browserSync.reload();
    done();
}

function watch() {
    return gulp.watch([
        'src/**/*.js',
        'src/**/*.scss',
        'src/**/*.pug',
        'src/*.pug',
        'src/**/**/*.js',
        'src/**/**/*.scss',
        'src/**/**/*.pug',
    ], gulp.series(
        bundlePug,
        bundleCss,
        moveJS,
        injectFileServe,
        reloadServe,
    ))
}

// task child
gulp.task('minify', gulp.series(
    minifyCSS,
))

// run build
gulp.task('default', gulp.series(
    bundlePug,
    bundleCss,
    moveJS,
    injectFileServe,
    serve,
    watch
))
gulp.task('build-web', gulp.series(
    delWWW,
    bundlePug,
    minifyJSBuild,
    bundleCss,
    moveJS,
    'minify',
    injectFileBuild
));

