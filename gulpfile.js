var gulp = require('gulp');

//These paths need to be changed based on the location of the respective files on your application
var paths = {
  html:['views/**/*.html'],
  css:['public/**/*.css'],
  js:['public/**/*.js','routes/**/*.js','app.js'],
};
var runSequence = require('run-sequence');
var karma = require('karma').server;
var mocha = require('gulp-mocha');
var bower = require('gulp-bower');
var shell = require('gulp-shell');

/*
Gulp tasks for linting
*/

gulp.task('default', function(callback) {
  runSequence('lint', 'dev-unit', callback);
});

gulp.task('lint-js', shell.task(
    ['node_modules/.bin/jshint app.js routes/ --reporter=node_modules/jshint-junit-reporter/reporter.js > test/jslint.xml'],
    { cwd: __dirname, ignoreErrors: false }
));

gulp.task('lint-css', shell.task(
    ['node_modules/.bin/csslint public/**/*.css --ignore=box-model,ids --format=junit-xml > test/csslint.xml'],
    { cwd: __dirname, ignoreErrors: false }
));

gulp.task('lint', ['lint-js','lint-css']);

/*
Gulp tasks for unit tests
*/

//Task for karma (frontend) unit tests
gulp.task('dev-karma', function(done) {
  karma.start({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: true,
  }, done);
});

//Task for mocha (server) unit tests
gulp.task('dev-mocha', function() {
  return gulp.src('test/unit/server/**/*spec.js', {read: false})
    .pipe(mocha({
      globals:['expect'],
      timeout: 3000,
      ignoreLeaks: true,
      ui: 'bdd',
      colors: true,
      reporter: 'mocha-jenkins-reporter',
      reporterOptions: {
        junit_report_name: 'Mocha Unit Tests for Server',
        junit_report_path: 'test/mocha-report.xml',
        junit_report_stack: 1,
      },
    }));
});

gulp.task('dev-setup', function() {
  return bower();
});

gulp.task('dev-unit', ['dev-karma','dev-mocha']);
