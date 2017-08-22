var gulp = require('gulp')
var to5 = require('gulp-6to5')

gulp.task('es6-es5', function(){ //convert es6 -> es5 for server side rendering
    return gulp.src([
        './src/serverapp.js',
        './src/*/**.js',
        './src/*/*/**.js'
    ])
        .pipe(to5())
        .pipe(gulp.dest('./public/build/es5/'))
})

gulp.task('watch', function(){ //webpack for changes...converts new es6 code to es5
    gulp.watch(['./src/serverapp.js',
        './src/*/**.js',
        './src/*/*/**.js'],
        ['es6-es5'])
})

gulp.task('default', ['es6-es5', 'watch'], function(){}) //Kind of like module that exports for gulpfile