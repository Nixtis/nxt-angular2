module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            { pattern: './sources/tests.entry.js' }
        ],
        exclude: [
        ],
        preprocessors: {
            './sources/tests.entry.js': [ 'webpack', 'sourcemap' ],
        },
        webpack: require('./build/test')({ env: 'test' }),
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: true,
        concurrency: Infinity
    })
}
