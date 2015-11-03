module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns
    // (eg. files, exclude)
    basePath: '..',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon'],

    // list of files / patterns to load in the browser
    files: [

      //Include any components needed
      //'.bower_components/angular/angular.js',

      //Include the files to test
      //'app/static/**/*.js',

      //Include the test files
      'test/unit/frontend/**/*.js',

      //{pattern: 'tests/fixtures/**/*.json', watched: true, served: true, included: false}
    ],

    // list of files to exclude
    //note: karma HATES files with requires in them
    exclude: [

      //'exclude.js',
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors:
    //  https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/static/**/*.js': ['coverage'],
    },

    // configure the reporter
    coverageReporter: {
      type: 'html',
      dir: 'coverage',
    },

    // test results reporter to use
    // possible values: "dots", "progress"
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // install these with npm
    reporters: ['junit', 'spec', 'coverage', 'progress', 'dots'],

    junitReporter: {
      outputDir: 'test',
    },

    plugins: [

      //'karma-chrome-launcher',
      //'karma-firefox-launcher',
      //'karma-ie-launcher',
      //'karma-safari-launcher',
      'karma-phantomjs-launcher',
      'karma-mocha',
      'karma-chai',
      'karma-sinon',
      'karma-spec-reporter',
      'karma-junit-reporter',
      'karma-coverage',
      'karma-jasmine',
    ],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
    // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    // enable / disable watching file and executing
    // tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers:
    // https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    detectBrowsers: {
      // enable/disable, default is true, set to false to use above browsers array.
      enabled: false,

      // enable/disable phantomjs support, default is true
      usePhantomJS: true,
    },
  });
};
