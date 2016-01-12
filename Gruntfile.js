'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    bump: {
      options: {
        pushTo: 'origin'
      }
    },

    jshint: {
      all: [
        '*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    }

  });

  grunt.registerTask('default', ['jshint:all']);

};
