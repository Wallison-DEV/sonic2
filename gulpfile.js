const gulp = require ('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const imagemin= require('gulp-imagemin');

function compilaSass(){
    return gulp.src('./src/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(
            {
                outputStyle: 'compressed'
            }
        ))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/styles'))
}

function minificaJS(){
    return gulp.src('src/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts'))
}

function minificaImagem(){
    return gulp.src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
}

exports.default = gulp.parallel(compilaSass, minificaJS, minificaImagem);
exports.imagens = minificaImagem;

exports.watch = function(){
    gulp.watch('./src',{ignoreInitial: false}, gulp.parallel(compilaSass, minificaJS))
}