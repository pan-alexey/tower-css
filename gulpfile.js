const fs = require('fs');
const path = require('path');


let browserSync = require('browser-sync').create();

const gulp = require('gulp');
const babel = require('gulp-babel');
const inject = require('gulp-inject-string');
const clean = require('gulp-clean');
const less = require('gulp-less');
const cleancss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');

//================================================//
const PREFIX = "";


const babelPreset = ['@babel/env', {
    targets: {
        node: 'current',
        browsers: ["ie >= 9"],
    },
    modules: false
}];

const autoprefixerBrowsers = [
    'ie >= 9',
    'ie_mob >= 9',
    'ff >= 21',
    'chrome >= 21',
    'safari >= 6',
    'opera >= 21',
    'ios >= 6',
    'android >= 4.4',
    'bb >= 10'
];
//=============================================================//

//-------------------------------------------------------------//
gulp.task('clean', function() {
    if (!fs.existsSync('./dist')) { fs.mkdirSync('./dist'); }
    return gulp.src('./dist/', { read: false })
        .pipe(clean())
        .pipe(gulp.dest('./dist'));;
});

gulp.task('vendor', function() {
    return gulp.src(["./app/vendor/**"])
        .pipe(gulp.dest('./dist/vendor'))
});

gulp.task('fonts', function() {
    return gulp.src(["./app/fonts/**"])
        .pipe(gulp.dest('./dist/fonts'))
});

gulp.task('html', function() {
    return gulp.src(["./app/html/**"])
        .pipe(gulp.dest('./dist/'))
});

gulp.task('img', function() {
    return gulp.src(["./app/img/**"])
        .pipe(gulp.dest('./dist/img'))
});

//-------------------------------------------------------------//
gulp.task("polyfill", function() {
    return gulp.src(["./app/source/polyfill/*.js"])
        .pipe(inject.replace('virgo--', PREFIX))
        .pipe(babel({
            presets: [babelPreset],
        }))
        .pipe(concat('polyfill.js', { newLine: '\n' }))
        .pipe(gulp.dest("./dist/source/"))
        .pipe(uglify({}).on('error', function(e) {
            console.log("polyfill", e);
            this.emit('end');
        }))
        .pipe(rename(function(path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest("./dist/source/"))
});


//-----------------------------------------//
gulp.task("core.js", function() {
    return gulp.src(["./app/source/core/**/script.js"])
        .pipe(inject.replace('@{_}', PREFIX))
        .pipe(rename(function(renamePath) {
            renamePath.basename = path.basename(renamePath.dirname);
            renamePath.dirname = "";
        }))
        .pipe(babel({
            presets: [babelPreset],
        }))
        .pipe(gulp.dest("./dist/source/js/core"))
        .pipe(concat('core.js', { newLine: '\n' }))
        .pipe(gulp.dest("./dist/source/js"))
        .pipe(uglify({}).on('error', function(e) {
            console.log("core", e);
            this.emit('end');
        }))
        .pipe(rename(function(path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest("./dist/source/js"))

    ;
});
gulp.task("core.less", function() {
    return gulp.src(["./app/source/core/**/style.less"])
        .pipe(inject.replace('@{_}', PREFIX))
        .pipe(rename(function(renamePath) {
            renamePath.basename = path.basename(renamePath.dirname);
            renamePath.dirname = "";
        }))
        .pipe(less()).on('error', function(err) {
            console.log("core", err);
            this.emit('end');
        })
        .pipe(autoprefixer({ overrideBrowserslist: autoprefixerBrowsers, cascade: false }))
        .pipe(gulp.dest("./dist/source/css/core"))
        .pipe(concat('core.css', { newLine: '\n' }))
        .pipe(gulp.dest("./dist/source/css"))
        .pipe(cleancss({ compatibility: 'ie9' }))
        .pipe(rename(function(path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest("./dist/source/css"));
});
//-----------------------------------------//
gulp.task("components.js", function() {
    return gulp.src(["./app/source/components/**/script.js"])
        .pipe(inject.replace('@{_}', PREFIX))
        .pipe(rename(function(renamePath) {
            renamePath.basename = path.basename(renamePath.dirname);
            renamePath.dirname = "";
        }))
        .pipe(babel({
            presets: [babelPreset],
        }))
        .pipe(gulp.dest("./dist/source/js/components"))
        .pipe(concat('components.js', { newLine: '\n' }))
        .pipe(gulp.dest("./dist/source/js"))
        .pipe(uglify({}).on('error', function(e) {
            console.log("core", e);
            this.emit('end');
        }))
        .pipe(rename(function(path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest("./dist/source/js"))

    ;
});
gulp.task("components.less", function() {
    return gulp.src(["./app/source/components/**/style.less"])
        .pipe(inject.replace('@{_}', PREFIX))
        .pipe(rename(function(renamePath) {
            renamePath.basename = path.basename(renamePath.dirname);
            renamePath.dirname = "";
        }))
        .pipe(less()).on('error', function(err) {
            console.log("components", err);
            this.emit('end');
        })
        .pipe(autoprefixer({ overrideBrowserslist: autoprefixerBrowsers, cascade: false }))
        .pipe(gulp.dest("./dist/source/css/components"))
        .pipe(concat('components.css', { newLine: '\n' }))
        .pipe(gulp.dest("./dist/source/css"))
        .pipe(cleancss({ compatibility: 'ie9' }))
        .pipe(rename(function(path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest("./dist/source/css"));
});



const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const VueLoaderPlugin = require('vue-loader/lib/plugin')




gulp.task("webpack", function() {
    return gulp.src('./app/webpack/app.js')
    .pipe(webpackStream({
        mode: 'production',
        entry: {
            main: './app/webpack/app.js'
        },
        module: {
            rules: [
                { test: /\.vue$/, use: 'vue-loader'},
                { test: /\.css$/, use: ['vue-style-loader', 'css-loader']},
            ]
        },
        plugins: [
            new VueLoaderPlugin()
        ],
        output: {
            filename: 'app.js',
        },
    }), webpack)
    .on('error', function(err) {
        console.log("webpack", err);
        this.emit('end');
    })
    .pipe(inject.replace('@{_}', PREFIX))
    .pipe(babel({
        presets: [babelPreset],
    }))
    .pipe(gulp.dest('./dist/webpack'));
});



gulp.task('bsync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist",
            notify: true
        }
    });
});

//---------------------------------------------------------------------//
gulp.task('watch', function() {
    gulp.watch("./dist/**").on('all', browserSync.reload);
    gulp.watch(["./app/html/**"], gulp.series('html'));
    gulp.watch(["./app/vendor/**"], gulp.series('vendor'));
    gulp.watch(["./app/fonts/**"], gulp.series('fonts'));

    gulp.watch(["./app/source/polyfill/*.js"], gulp.parallel('polyfill'));
    gulp.watch(["./app/source/core/**/script.js"], gulp.parallel('core.js'));
    gulp.watch(["./app/source/components/**/script.js"], gulp.parallel('components.js'));

    gulp.watch(["./app/source/varibles.less"], gulp.parallel(['core.less', 'components.less']));
    gulp.watch(["./app/source/components/**/style.less"], gulp.parallel('components.less'));
    gulp.watch(["./app/source/core/**/style.less"], gulp.parallel('core.less'));

    gulp.watch(["./app/webpack/**"], gulp.parallel('webpack'));

});

//---------------------------------------------------------------------//
gulp.task('default', gulp.series(
    'clean',
    "webpack",
    gulp.parallel(
        "vendor",
        "fonts",
        "html",
        "img",

        "polyfill",

        "core.js",
        "core.less",

        "components.js",
        "components.less",

   
    ),
    gulp.parallel(
        'bsync',
        "watch",
    )
));