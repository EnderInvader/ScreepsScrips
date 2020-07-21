/**
 * require('spawn.claimer').consoleSpawnClaimer.run('Spawn1',1,'targetRoom');
 * require('spawn.claimer').consoleSpawnClaimer.run('Spawn1',2,'W32S35');
**/

var spawnClaimer = {
    
    run: function(spawn, Slevel, targetRoom) {	
	    var room = spawn.room;
		var controller = room.controller;
		var controllerLevel = controller.level;
		var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
		
		var claimersLv3 = _.filter(claimers, (creep) => creep.memory.level == 3);
		var claimersLv4 = _.filter(claimers, (creep) => creep.memory.level == 4);
		var claimersLv5 = _.filter(claimers, (creep) => creep.memory.level == 5);
		var success = true;
		var temp = 0;
		var error = "";
		
		var OSlevel = 0;
		
		if (OSlevel != 0){
		    Slevel = OSlevel;
		}
		
		if (Slevel == 1 || Slevel == 2) {
			var success = false;
			var error = 'No Claimers Level ' + Slevel;
			var temp = -99;
		}
		/**Claimer, Level 3**///700
		else if (Slevel == 3) {
			if(room.energyAvailable >= 700) {
			    var newName = 'Claimer1' + targetRoom + '' + Game.time;
			    console.log('Spawning new claimer: ' + newName + '   Target: ' + targetRoom);
			    var temp = spawn.spawnCreep( [CLAIM,MOVE,MOVE],newName,{ memory: { role: 'claimer' , level:3, target: targetRoom, claimState: -1} } );//700
		    }
		}
		
		/**Claimer, Level 4 and 5**///1300
		else if (Slevel == 4 || Slevel == 5) {//1300 and 1800
			if(room.energyAvailable >= 1300) {
				var newName = 'Claimer2' + targetRoom + '' + Game.time;
				console.log('Spawning new claimer: ' + newName + '   Target: ' + targetRoom);
				var temp = spawn.spawnCreep( [CLAIM,CLAIM,MOVE,MOVE],newName,{ memory: { role: 'claimer' , level:Slevel, target: targetRoom, claimState: -1} } );//1300
			}
		}
		
		/**Claimer, Level 6**///1950
		else if (Slevel == 6) {//2300
			if(room.energyAvailable >= 1950) {
				var newName = 'Claimer2' + targetRoom + '' + Game.time;
				console.log('Spawning new claimer: ' + newName + '   Target: ' + targetRoom);
				var temp = spawn.spawnCreep( [CLAIM,CLAIM,CLAIM,MOVE,MOVE,MOVE],newName,{ memory: { role: 'claimer' , level:6, target: targetRoom, claimState: -1} } );//1950
			}
		}
		
		else {
			var success = false;
			console.log('Controller Level, Out of Range, Claimer');
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
			//console.log('Claimer Spawning Error: ' + error);
			return temp;
		}
	}
};

var consoleSpawnClaimer = {
	run: function(spawnName, level, targetRoom) {
	    if (Game.map.describeExits(targetRoom) == null) {
	        console.log("Error: Room not Found");
	    }
	    else {
	        
	        if (level == 1) {//3 800
	            var newName = 'Claimer1' + targetRoom + '' + Game.time;
			    console.log('Spawning new claimer: ' + newName + '   Target: ' + targetRoom);
			    Game.spawns[spawnName].spawnCreep( [CLAIM,MOVE,MOVE],newName,{ memory: { role: 'claimer' , level:3, target: targetRoom, claimState: -1} } );//700
		    }
		    else if (level == 2) {//4 1300
		        var newName = 'Claimer2' + targetRoom + '' + Game.time;
			    console.log('Spawning new claimer: ' + newName + '   Target: ' + targetRoom);
			    Game.spawns[spawnName].spawnCreep( [CLAIM,CLAIM,MOVE,MOVE],newName,{ memory: { role: 'claimer' , level:4, target: targetRoom, claimState: -1} } );//1300
            }
		    else if (level == 3) {//5 1800
		        var newName = 'Claimer3' + targetRoom + '' + Game.time;
			    console.log('Spawning new claimer: ' + newName + '   Target: ' + targetRoom);
			    Game.spawns[spawnName].spawnCreep( [TOUGH,TOUGH,CLAIM,CLAIM,MOVE,MOVE,MOVE,MOVE],newName,{ memory: { role: 'claimer' , level:5, target: targetRoom, claimState: -1} } );//1420
            }
            
            else {
                console.log("Error: Level incorrect");
            }
            
	    }
	}
};

module.exports = {
	spawnClaimer,
	consoleSpawnClaimer
};