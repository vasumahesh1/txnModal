module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        compress: {
          drop_console: true
        }
      },
      build: {
        src: ['src/txnModal.js'],
        dest: 'build/txn-modal.min.js'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        'sub': true,
        'loopfunc': true,
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['<%= uglify.build.src %>'],
      tasks: ['jshint' , 'uglify']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Default task(s).
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('build', ['jshint', 'uglify']);
  grunt.registerTask('dist', ['uglify']);
  grunt.registerTask('dev', ['watch']);

};