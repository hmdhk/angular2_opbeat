System.config({
    transpiler: null,
    paths: {
        'systemjs': 'node_modules/systemjs/dist/system.src.js',
        'system-polyfills': 'node_modules/systemjs/dist/system-polyfills.js',
        'es6-module-loader': 'node_modules/es6-module-loader/dist/es6-module-loader.js',
        'phantomjs-polyfill': 'node_modules/phantomjs-polyfill/bind-polyfill.js',
        // 'angular2/*': 'node_modules/angular2/bundles/*.js',
        'angular2/angular2': 'node_modules/angular2/bundles/angular2.js',
        'angular2_opbeat/*': 'dist/src/*.js'
    },
    meta: {
        'angular2/angular2': {
            format: 'register'
        }
    }
});

// System.import('angular2_opbeat');