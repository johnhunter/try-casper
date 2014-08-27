/* jshint node:true */
var matchdep = require("matchdep");


module.exports = function(grunt) {
    matchdep.filterDev("grunt-*").forEach(grunt.loadNpmTasks);


    grunt.registerTask('default', ['clean:reports', 'casper:dev']);
    grunt.registerTask('build', ['clean:reports', 'casper:build']);


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            reports: ['xunit/**/*.xml']
        },

        casper: {
            dev: {
                options: {
                    test: true,
                    parallel: true,
                    concurrency: 5,
                    'fail-fast': true,
                    concise: true,
                    verbose: true,
                },
                src: ['tests/**/*.test.js'],
                dest: function(input) {
                    return input.replace(/(tests\/)(.*)(\.js$)/, 'xunit/$2.xml');
                }
            },
            build: {
                options: {
                    test: true,
                    parallel: true,
                    concurrency: 5,
                    'fail-fast': true,
                    verbose: false,
                    concise: true,
                },
                src: ['tests/**/*.test.js'],
                dest: function(input) {
                    return input.replace(/(tests\/)(.*)(\.js$)/, 'xunit/$2.xml');
                }
            }
        }
    });
};
