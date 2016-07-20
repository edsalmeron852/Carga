var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
//Nos indica si hay problemas en los archivos javascript, puntos y coma omitidos, etc
var jshint = require('gulp-jshint');

/**
 * Gulp Tasks
 */
 var paths = {
   styles: ['./public/css/*.css'],
   html: ['./app/views/**/*.html'],
   scripts: ['./public/js/controller.js']
 }

 gulp.task('scripts', function() {
     gulp.src(paths.scripts)
         //Verificamos que no tengan problemas en la escritura/semantica
         .pipe(jshint())
         .pipe(jshint.reporter('default'))

 });


gulp.task('browser-sync', ['nodemon'], function() {
  browserSync({
    proxy: "localhost:8000",  // local node app address
    port: 5000,  // use *different* port than above
    notify: true
  });
});

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'app.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});

gulp.task('watch', ['browser-sync'], function () {
  gulp.watch([paths.html], reload);
  gulp.watch([paths.styles], reload);
})
