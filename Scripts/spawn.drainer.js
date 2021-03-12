/**
 * require('spawn.drainer').consoleSpawnClaimer.run('Spawn1',1,'targetRoom');
 * require('spawn.drainer').consoleSpawnClaimer.run('Spawn1',2,'W32S35');
**/

var spawnDrainer = {
    
    run: function(spawn, Slevel, targetRoom) {	
	    var room = spawn.room;
		var controller = room.controller;
		var controllerLevel = controller.level;
		var drainers = _.filter(Game.creeps, (creep) => creep.memory.role == 'drainer');
		
		var drainersLv3 = _.filter(drainers, (creep) => creep.memory.level == 3);
		var drainersLv4 = _.filter(drainers, (creep) => creep.memory.level == 4);
		var drainersLv5 = _.filter(drainers, (creep) => creep.memory.level == 5);
		var success = true;
		var temp = 0;
		var error = "";
		
		var OSlevel = 0;
		
		if (OSlevel != 0){
		    Slevel = OSlevel;
		}
		
		if (Slevel == 1 || Slevel == 2) {
			var success = false;
			var error = 'No Drainers Level ' + Slevel;
			var temp = -99;
		}
		/**Drainer, Level 3**///300
		else if (Slevel == 3) {//800
			if(room.energyAvailable >= 300) {
			    var newName = 'Drainer1' + targetRoom + '' + Game.time;
			    console.log('Spawning new drainer: ' + newName + '   Target: ' + targetRoom);
			    var temp = spawn.spawnCreep( [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE],newName,{ memory: { role: 'drainer' , level:3, target: targetRoom} } );//300
		    }
		}
		
		/**Drainer, Level 4**///500
		else if (Slevel == 4) {//1300
			if(room.energyAvailable >= 500) {
				var newName = 'Drainer2' + targetRoom + '' + Game.time;
				console.log('Spawning new drainer: ' + newName + '   Target: ' + targetRoom);
				var temp = spawn.spawnCreep( [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE],newName,{ memory: { role: 'drainer' , level:Slevel, target: targetRoom} } );//500
			}
		}
		
		/**Drainer, Level 5**///800
		else if (Slevel == 5) {//1800
			if(room.energyAvailable >= 800) {
				var newName = 'Drainer3' + targetRoom + '' + Game.time;
				console.log('Spawning new drainer: ' + newName + '   Target: ' + targetRoom);
				var temp = spawn.spawnCreep( [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],newName,{ memory: { role: 'drainer' , level:6, target: targetRoom} } );//800
			}
		}
		
		else {
			var success = false;
			console.log('Controller Level, Out of Range, Drainer');
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
			//console.log('Drainer Spawning Error: ' + error);
			return temp;
		}
	}
};

var consoleSpawnDrainer = {
	run: function(spawnName, level, targetRoom) {
	    if (Game.map.describeExits(targetRoom) == null) {
	        console.log("Error: Room not Found");
	    }
	    else {
	        
	        if (level == 1) {//3 800
	            var newName = 'Drainer1' + targetRoom + '' + Game.time;
			    console.log('Spawning new drainer: ' + newName + '   Target: ' + targetRoom);
			    Game.spawns[spawnName].spawnCreep( [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE],newName,{ memory: { role: 'drainer' , level:3, target: targetRoom} } );//700
		    }
		    else if (level == 2) {//4 1300
		        var newName = 'Drainer2' + targetRoom + '' + Game.time;
			    console.log('Spawning new drainer: ' + newName + '   Target: ' + targetRoom);
			    Game.spawns[spawnName].spawnCreep( [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE],newName,{ memory: { role: 'drainer' , level:4, target: targetRoom} } );//1300
            }
		    else if (level == 3) {//5 1800
		        var newName = 'Drainer3' + targetRoom + '' + Game.time;
			    console.log('Spawning new drainer: ' + newName + '   Target: ' + targetRoom);
			    Game.spawns[spawnName].spawnCreep( [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],newName,{ memory: { role: 'drainer' , level:5, target: targetRoom} } );//1420
            }
            
            else {
                console.log("Error: Level incorrect");
            }
            
	    }
	}
};

module.exports = {
	spawnDrainer,
	consoleSpawnDrainer
};