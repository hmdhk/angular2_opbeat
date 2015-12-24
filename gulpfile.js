
var del = require('del');
var gulp = require('gulp');
var runSequence = require('run-sequence');

var jasmine = require('gulp-jasmine');

var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

var CONFIG = {
    src: {
        ts: 'src/**/*.ts',
    },
    test: {
        ts: 'test/**/*.ts'
    },
    dest: 'dist'
};

// CI tests suites

function runKarma(configFile, done) {
    var exec = require('child_process').exec;

    var cmd = process.platform === 'win32' ? 'node_modules\\.bin\\karma run ' :
        'node node_modules/.bin/karma run ';
    cmd += configFile;
    exec(cmd, function (e, stdout) {
        // ignore errors, we don't want to fail the build in the interactive (non-ci) mode
        // karma server will print all test failures
        done();
    });
}

gulp.task('karma-run', function (done) {
    // run the run command in a new process to avoid duplicate logging by both server and runner from
    // a single process
    runKarma('karma.conf.js', done);
});


gulp.task('build.typescript', function (release) {
    var tsResult = tsProject.src()
        .pipe(ts(tsProject));
    return tsResult.js
        .pipe(gulp.dest('./dist'));
});
gulp.task('clean', function () { del(CONFIG.dest); });

gulp.task('test', function () {
    return gulp.src('dist/test/**/*.js')
        .pipe(jasmine());
});

gulp.task('build', function () {
    runSequence('build.typescript', 'karma-run');
});

gulp.task('watch', function () {
    gulp.watch(CONFIG.src.ts, ['build']);
    gulp.watch(CONFIG.test.ts, ['build']);
});