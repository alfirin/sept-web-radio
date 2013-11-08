// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['ng-scenario'],

    // list of files / patterns to load in the browser
    files: [
      //'app/bower_components/angular-scenario/angular-scenario.js',
      'test/e2e/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    //port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // enable / disable colors in the output (reporters and logs)
    colors: true,


  // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Firefox'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    plugins : [
      //'karma-junit-reporter',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-ng-scenario'
    ],

    // Uncomment the following lines if you are using grunt's server to run the tests
    proxies: {
      '/': 'http://localhost:9001/'
    },
    // URL root prevent conflicts with the site root
    urlRoot: '_karma_',

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 7000,

    /*junitReporter : {
      outputFile: 'test_out/e2e.xml',
      suite: 'e2e'
    }*/

  });
};
