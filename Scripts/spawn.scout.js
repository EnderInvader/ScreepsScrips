/**
 * require('spawn.scout').consoleSpawnScout.run('Spawn1','targetRoom');
 * require('spawn.scout').consoleSpawnScout.run('Spawn1','W32S35');
 * require('spawn.scout').consoleSpawnScout.run('Spawn1','W33S36');
**/

var spawnScout = {
    
    run: function(spawn, targetRoom) {	
	    var room = spawn.room;
		var controller = room.controller;
		var controllerLevel = controller.level;
		var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');
		
		var success = true;
		var temp = 0;
		var error = "";
		
		if(room.energyAvailable >= 750) {
		    var newName = 'Scout' + Game.time;
		    console.log('Spawning new scout: ' + newName);
		    var temp = spawn.spawnCreep( [MOVE,MOVE],newName,{ memory: { role: 'scout', target: targetRoom} } );//100
		}
		else {
		    temp = -6;
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
			if (temp != -99) {
				console.log('Scout Spawning Error: ' + error);
			}
			return temp;
		}
	}
};

var consoleSpawnScout = {
	run: function(spawnName, targetRoom) {
	    if (Game.map.describeExits(targetRoom) == null) {
	        console.log("Error: Room not Found");
	    }
	    else {
	        var newName = 'Scout' + Game.time;
		    console.log('Spawning new scout: ' + newName + '   Target: ' + targetRoom);
		    Game.spawns[spawnName].spawnCreep( [MOVE,MOVE],newName,{ memory: { role: 'scout', target: targetRoom} } );//100
	    }
	}
};

module.exports = {
	spawnScout,
	consoleSpawnScout
};