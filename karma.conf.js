// Karma configuration
// Generated on Sun Dec 20 2015 15:23:51 GMT+0100 (Romance Standard Time)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['systemjs', 'jasmine'],


        // list of files / patterns to load in the browser
        files: [
            // 'dist/**/*.js',
            { pattern: 'dist/test/*.js', included: true, watched: false },
            { pattern: 'node_modules/angular2/**/*.js', included: false, watched: false }
            //  'node_modules/angular2/bundles/angular2.js'
            // 'node_modules/systemjs/dist/system.src.js'
        ],
        plugins: [
            'karma-systemjs',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine'
        ],

        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        // todo: should define dev and production test browsers,'PhantomJS','Chrome'
        browsers: [],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultanous
        concurrency: Infinity,

        systemjs: {
            configFile: 'system.conf.js',
            // includeFiles: ['node_modules/angular2/bundles/angular2.js'],
            serveFiles: [
                'dist/**/*.js',
                'node_modules/**/*.*'
            ],
            // config: {
            //     paths: {
            //         'angular2_opbeat': 'dist/**/*.js'
            //     }
            // }
        }
    })
}
