let matchdep = require('matchdep');
let mergeFiles = require('./grunt-scripts/mergeFiles');

module.exports = function (grunt) {
	matchdep.filterAll(['grunt-*', '!grunt-cli']).forEach(grunt.loadNpmTasks);
	mergeFiles(grunt);

	grunt.initConfig({
		screeps: {
			options: {
				email:  'derek.scandrett@cox.net',
				token:  'cd651bf7-2476-4406-b8cd-49579acb0642',
				branch: 'default',
				//server: 'season'
			},
			dist:    {
				src: ['dist/*.js']
			}
		},

		copy: {
			main: {
				expand:  true,
				flatten: true,
				filter:  'isFile',
				cwd:     'dist/',
				src:     '**',
				dest:    'Update This Path'
			},
		},
	});

	grunt.registerTask('main', ['merge', 'write']); // 'test'
	grunt.registerTask('sandbox', ['merge', 'write-private']);
	grunt.registerTask('merge', 'mergeFiles');
	grunt.registerTask('write', 'screeps');
	grunt.registerTask('write-private', 'copy');
};
