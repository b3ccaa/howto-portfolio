module.exports = function(grunt) {
 
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //Grunt Tasks
    stencil: {
      project: { // Target
        options: { // Option config
          env: {
            title: "<%= pkg.name %>",
          }
        },
      files: [
        {
          expand: true,
          cwd: 'pages/',
          src: '**/*.dot.html',
          dest: 'tmp',
          ext: '.html'
        }
      ]
      }
    },

    prettify: { // generic setup to prettify all HTML in tmp dir
      all: {
        expand: true,
        cwd: 'tmp/',
        ext: '.html',
        src: ['**/*.html'],
        dest: 'dist/'
      },
    },

    watch: { // generic setup to watch changes to HTML files
      html: {
        files: ['pages/**/*.html', 'partials/**/*.html', 'templates/*dot.html'],
        tasks: ['stencil', 'prettify'],
        options: {
          spawn: false,
        },
      },
    },

    htmllint: { // generic setup to validate all HTML in the dist dir
      all: ["dist/**/*.html"]
    },

    htmlclean: {
      options: {},
      deploy: {
        expand: true,
        cwd: 'pretty/',
        src: '**/*.html',
        dest: 'dist/'
      },
    },

    zip: {
      project: {
        cwd: 'dist/',
        src: ['dist/*.html'],
        dest: '<%= pkg.name %>-v<%= pkg.version %>.zip'
      },
    },

    less: {
      development: {
        files: {
          "dist/css/styles.css": "less/styles.less"
        }
      },
    }
    
  });

  grunt.loadNpmTasks('grunt-stencil');
  grunt.loadNpmTasks('grunt-prettify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html');
  grunt.loadNpmTasks('grunt-htmlclean');
  grunt.loadNpmTasks('grunt-zip');
  grunt.loadNpmTasks('grunt-contrib-less');
  
 
  // Default task.
  grunt.registerTask('default', ['stencil', 'prettify']);
};