/**require('spawn.harvester').consoleSpawnHarvester.run('Spawn1',1);**/

var spawnHarvester = {

    /** @param {Creep} creep **/
    run: function(spawn) {	
	    var room = spawn.room;
		var controller = room.controller;
		var controllerLevel = controller.level;
		var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
		
		var harvestersLv1 = _.filter(harvesters, (creep) => creep.memory.level == 1);
		var harvestersLv2 = _.filter(harvesters, (creep) => creep.memory.level == 2);
		var success = true;
		var temp = 0;
		var error = "";
		
		var Slevel = 2;
		
		/**Starter Harvester, Level 1**///300
		if (Slevel == 1) {//controllerLevel == 1
			if(harvestersLv1.length < 2) {
				var newName = 'StarterHarvester' + Game.time;
				console.log('Spawning new harvester: ' + newName);
				var temp = spawn.spawnCreep( [WORK,CARRY,MOVE],newName,{ memory: { role: 'harvester' , level:1} } );//200
			}
			else{
				var success = false;
				var error = 'Max number of Harvesters Level 1, Reached';
				var temp = -99;
			}
		}
		
		/**Basic Harvester, Level 2**///550
		else if (Slevel == 2) {
			if(harvestersLv2.length < 3) {
			    if(room.energyAvailable >= 450) {
				    var newName = 'BasicHarvester' + Game.time;
				    console.log('Spawning new harvester: ' + newName);
				    var temp = spawn.spawnCreep( [WORK,WORK,WORK,CARRY,MOVE,MOVE],newName,{ memory: { role: 'harvester' , level:2} } );//450
			    }
			    else
			    {
			        //console.log(room.energyAvailable)
			    }
			}
			else{
				var success = false;
				var error = 'Max number of Harvesters Level 2, Reached';
				var temp = -99;
			}
		}
		
		else {
			var success = false;
			console.log('Controller Level, Out of Range');
		}
		
		if(temp == 0){
			var success = true;
		}
		else if(temp == -1){
			var success = false;
			var error = "ERR_NOT_OWNER";
		}
		else if(temp == -3){
			var success = false;
			var error = "ERR_NAME_EXISTS";
		}
		else if(temp == -4){
			var success = false;
			var error = "ERR_BUSY";
		}
		else if(temp == -6){
			var success = false;
			var error = "ERR_NOT_ENOUGH_ENERGY";
		}
		else if(temp == -10){
			var success = false;
			var error = "ERR_INVALID_ARGS";
		}
		else if(temp == -14){
			var success = false;
			var error = "ERR_RCL_NOT_ENOUGH";
		}
		else{
			var success = false;
		}
		
		if(success == true){
			return success;
		}
		else{
			//console.log('Harvester Spawning Error: ' + error);
			return temp;
		}
	}
};

var consoleSpawnHarvester = {
	run: function(spawnName,level) {
		if (level == 1) {
			var newName = 'StarterHarvester' + Game.time;
			console.log('Spawning new harvester: ' + newName);
			Game.spawns[spawnName].spawnCreep( [WORK,CARRY,MOVE],newName,{ memory: { role: 'harvester' , level:1} } );
		}
		else if (level == 2) {
			var newName = 'BasicHarvester' + Game.time;
			console.log('Spawning new harvester: ' + newName);
			Game.spawns[spawnName].spawnCreep( [WORK,WORK,WORK,CARRY,MOVE,MOVE],newName,{ memory: { role: 'harvester' , level:2} } );
		}
	}
};

module.exports = {
	spawnHarvester,
	consoleSpawnHarvester
};