const gulp = require('gulp');
const postcss = require('gulp-postcss');
const stylishdark = require('./index');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const headerfooter = require('gulp-headerfooter');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');

/*-----------------------------------------------------------------------------
 * lint
 *---------------------------------------------------------------------------*/

// src
const build_js_src = './index.js';

gulp.task('lint', () => {
    return gulp.src([build_js_src])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});


/*-----------------------------------------------------------------------------
 * build
 *---------------------------------------------------------------------------*/

// src
const css_src_header = './stylish/common/header.css';
const css_src_footer = './stylish/common/footer.css';
const css_src_dir = [
    './stylish/domain/**/*.css',
    '!./stylish/common/**/*.css'
];

// dst
const css_dst_dir = './stylish/dist';
const css_dst_file = 'dark-theme.css';

gulp.task('build', function () {
    const plugins = [
        stylishdark
    ];
    return gulp.src(css_src_dir)
        .pipe(sourcemaps.init())
        .pipe(postcss(plugins))
        .pipe(concat(css_dst_file))
        .pipe(headerfooter.header(css_src_header))
        .pipe(headerfooter.footer(css_src_footer))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(css_dst_dir));
});

/*-----------------------------------------------------------------------------
 * watch
 *---------------------------------------------------------------------------*/

gulp.task('watch', function () {
    gulp.watch(css_src_dir, [
        'lint',
        'build'
    ]);
});

/*-----------------------------------------------------------------------------
 * test
 *---------------------------------------------------------------------------*/
gulp.task('pre-test', function () {
    return gulp.src(['index.js'])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function () {
    return gulp.src(['test/*.js'])
        .pipe(mocha({reporter: 'nyan'}))
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 70 } }));
});


/*-----------------------------------------------------------------------------
 * default
 *---------------------------------------------------------------------------*/

// Default Task
gulp.task('default', [
    'lint',
    'build',
    'watch'
]);
