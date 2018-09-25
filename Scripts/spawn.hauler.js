var spawnBuilder = {

    /** @param {Creep} creep **/
    run: function(spawn) {	
	    var room = spawn.room;
		var controller = room.controller;
		var controllerLevel = controller.level;
		var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
		
		/**Starter Builder, Level 1**/
		var buildersLv1 = _.filter(builders, (creep) => creep.memory.level == 1);
		if (controllerLevel == 1) {
			if(buildersLv1.length < 2) {
				var newName = 'StarterBuilder' + Game.time;
				console.log('Spawning new builder: ' + newName);
				spawn.spawnCreep( [WORK,CARRY,MOVE],newName,{ memory: { role: 'builder' , level:1} } );
			}
		}
		
		var buildersLv2 = _.filter(builders, (creep) => creep.memory.level == 2);
		/**Basic Builder, Level 2**/
		if (controllerLevel == 2) {
			if(buildersLv2.length < 3) {
				var newName = 'BasicBuilder' + Game.time;
				console.log('Spawning new builder: ' + newName);
				spawn.spawnCreep( [WORK,WORK,WORK,CARRY,MOVE,MOVE],newName,{ memory: { role: 'builder' , level:2} } );
			}
		}
	}
};

var consoleSpawnBuilder = {
	run: function(spawnName,level) {
		if (level == 1) {
			var newName = 'StarterBuilder' + Game.time;
			console.log('Spawning new builder: ' + newName);
			Game.spawns[spawnName].spawnCreep( [WORK,CARRY,MOVE],newName,{ memory: { role: 'builder' , level:1} } );
		}
		else if (level == 2) {
			var newName = 'BasicBuilder' + Game.time;
			console.log('Spawning new builder: ' + newName);
			Game.spawns[spawnName].spawnCreep( [WORK,WORK,WORK,CARRY,MOVE,MOVE],newName,{ memory: { role: 'builder' , level:2} } );
		}
	}
};

module.exports = {
	spawnBuilder,
	consoleSpawnBuilder
};