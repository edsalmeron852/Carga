var gulp = require('gulp') ,
 nodemon = require('gulp-nodemon');


gulp.task('serve', function (cb) {
    nodemon({
        script  : 'app.js'
    }).on('start');
});
