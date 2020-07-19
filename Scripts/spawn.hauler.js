/**require('spawn.hauler').consoleSpawnHauler.run('Spawn1',1);**/

var spawnHauler = {

    /** @param {Creep} creep **/
    run: function(spawn) {	
	    var room = spawn.room;
		var controller = room.controller;
		var controllerLevel = controller.level;
		var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
		
		var haulersLv2 = _.filter(haulers, (creep) => creep.memory.level == 2);
		var haulersLv3 = _.filter(haulers, (creep) => creep.memory.level == 2);
		var success = true;
		var temp = 0;
		var error = "";
		
		var Slevel = 2;
		
		/**Starter Hauler, Level 2**/
		if (Slevel == 2) {
			if(haulersLv2.length < 1) {
				var newName = 'BasicHauler' + Game.time;
				console.log('Spawning new hauler: ' + newName);
				var temp = spawn.spawnCreep( [CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],newName,{ memory: { role: 'hauler' , level:2} } );
			}
			else{
				var success = false;
				var error = 'Max number of Haulers Level 2, Reached';
				var temp = -99;
			}
		}
		
		/**Basic Hauler, Level 3**/
		else if (Slevel == 3) {
			if(haulersLv2.length < 2) {
				var newName = 'NormalHauler' + Game.time;
				console.log('Spawning new hauler: ' + newName);
				var temp = spawn.spawnCreep( [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],newName,{ memory: { role: 'hauler' , level:3} } );
			}
			else{
				var success = false;
				var error = 'Max number of Haulers Level 3, Reached';
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
			//console.log('Hauler Spawning Error: ' + error);
			return temp;
		}
	}
};

var consoleSpawnHauler = {
	run: function(spawnName,level) {
		if(level == 1) {
			var newName = 'StarterHauler' + Game.time;
			console.log('Spawning new hauler: ' + newName);
			var temp = spawn.spawnCreep( [WORK,CARRY,MOVE],newName,{ memory: { role: 'hauler' , level:1} } );
		}
		else if(level == 2) {
			var newName = 'BasicHauler' + Game.time;
			console.log('Spawning new hauler: ' + newName);
			var temp = spawn.spawnCreep( [WORK,WORK,WORK,CARRY,MOVE,MOVE],newName,{ memory: { role: 'hauler' , level:2} } );
		}
	}
};

module.exports = {
	spawnHauler,
	consoleSpawnHauler
};