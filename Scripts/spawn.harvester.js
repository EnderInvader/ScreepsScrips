var spawnHarvester = {

    /** @param {Creep} creep **/
    run: function(spawn) {	
	    var room = spawn.room;
		var controller = room.controller;
		var controllerLevel = controller.level;
		var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
		
		/**Starter Harvester, Level 1**/
		var harvestersLv1 = _.filter(harvesters, (creep) => creep.memory.level == 1);
		var harvestersLv2 = _.filter(harvesters, (creep) => creep.memory.level == 2);
		
		if (controllerLevel == 1) {
			if(harvestersLv1.length < 3) {
				var newName = 'StarterHarvester' + Game.time;
				console.log('Spawning new harvester: ' + newName);
				spawn.spawnCreep( [WORK,CARRY,MOVE],newName,{ memory: { role: 'harvester' , level:1} } );
			}
			else{
				var success = false;
				console.log('Max number of Harvesters Level 1, Reached');
			}
		}
		
		/**Basic Harvester, Level 2**/
		else if (controllerLevel == 2) {
			if(harvestersLv2.length < 3) {
				var newName = 'BasicHarvester' + Game.time;
				console.log('Spawning new harvester: ' + newName);
				spawn.spawnCreep( [WORK,WORK,WORK,CARRY,MOVE,MOVE],newName,{ memory: { role: 'harvester' , level:2} } );
			}
			else{
				var success = false;
				console.log('Max number of Harvesters Level 2, Reached');
			}
		}
		
		else {
			var success = false;
			console.log('Controller Level, Out of Range');
		}
		return success;
	}
};

var consoleSpawnHarvester = {
	run: function(spawn,level) {
		if (level == 1) {
			var newName = 'StarterHarvester' + Game.time;
			console.log('Spawning new harvester: ' + newName);
			spawn.spawnCreep( [WORK,CARRY,MOVE],newName,{ memory: { role: 'harvester' , level:1} } );
		}
		else if (level == 2) {
			var newName = 'BasicHarvester' + Game.time;
			console.log('Spawning new harvester: ' + newName);
			spawn.spawnCreep( [WORK,WORK,WORK,CARRY,MOVE,MOVE],newName,{ memory: { role: 'harvester' , level:2} } );
		}
	}
};

module.exports = {
	spawnHarvester,
	consoleSpawnHarvester
};