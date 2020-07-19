/**require('spawn.repairer').consoleSpawnRepairer.run('Spawn1',1);**/

var spawnRepairer = {

    /** @param {Creep} creep **/
    run: function(spawn, Slevel) {	
	    var room = spawn.room;
		var controller = room.controller;
		var controllerLevel = controller.level;
		var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
		
		var repairersLv1 = _.filter(repairers, (creep) => creep.memory.level == 1);
		var repairersLv2 = _.filter(repairers, (creep) => creep.memory.level == 2);
		var repairersLv3 = _.filter(repairers, (creep) => creep.memory.level == 3);
		var success = true;
		var temp = 0;
		var error = "";
		
		var OSlevel = 0;
		
		if (OSlevel != 0){
		    Slevel = OSlevel;
		}
		
		/**Starter Repairer, Level 1**///300
		if (Slevel == 1) {
			if(repairersLv1.length < 1) {
			    if(room.energyAvailable >= 250) {
				    var newName = 'StarterRepairer' + Game.time;
				    console.log('Spawning new repairer: ' + newName);
				    var temp = spawn.spawnCreep( [WORK,CARRY,MOVE],newName,{ memory: { role: 'repairer' , level:1} } );//200
			    }
			}
			else{
				var success = false;
				var error = 'Max number of Repairers Level 1, Reached';
				var temp = -99;
			}
		}
		
		/**Basic Repairer, Level 2**///550
		else if (Slevel == 2) {
			if(repairersLv2.length < 1) {
			    if(room.energyAvailable >= 500) {
				    var newName = 'BasicRepairer' + Game.time;
				    console.log('Spawning new repairer: ' + newName);
				    var temp = spawn.spawnCreep( [WORK,WORK,WORK,CARRY,MOVE,MOVE],newName,{ memory: { role: 'repairer' , level:2} } );//450
			    }
			}
			else{
				var success = false;
				var error = 'Max number of Repairers Level 2, Reached';
				var temp = -99;
			}
		}
		
		/**Basic Repairer, Level 3**///800
		else if (Slevel == 3) {
			if(repairersLv3.length < 2) {
			    if(room.energyAvailable >= 650) {
				    var newName = 'AdvancedRepairer' + Game.time;
				    console.log('Spawning new repairer: ' + newName);
				    var temp = spawn.spawnCreep( [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],newName,{ memory: { role: 'repairer' , level:3} } );//600
			    }
			}
			else{
				var success = false;
				var error = 'Max number of Repairers Level 3, Reached';
				var temp = -99;
			}
		}
		
		else {
			var success = false;
			console.log('Controller Level, Out of Range, Repairer');
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
			//console.log('Repairer Spawning Error: ' + error);
			return temp;
		}
	}
};

var consoleSpawnRepairer = {
	run: function(spawnName,level) {
		if(level == 1) {
			var newName = 'StarterRepairer' + Game.time;
			console.log('Spawning new repairer: ' + newName);
			var temp = spawn.spawnCreep( [WORK,CARRY,MOVE],newName,{ memory: { role: 'repairer' , level:1} } );
		}
		else if(level == 2) {
			var newName = 'BasicRepairer' + Game.time;
			console.log('Spawning new repairer: ' + newName);
			var temp = spawn.spawnCreep( [WORK,WORK,WORK,CARRY,MOVE,MOVE],newName,{ memory: { role: 'repairer' , level:2} } );
		}
	}
};

module.exports = {
	spawnRepairer,
	consoleSpawnRepairer
};