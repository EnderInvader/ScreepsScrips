/**
 * require('spawn.targetAttacker').consoleSpawnTargetAttacker.run('Spawn1',1,'targetRoom','targetCreepName','targetCreepOwner');
 * require('spawn.targetAttacker').consoleSpawnTargetAttacker.run('Spawn1',2,'W32S35','infestor_0','XyzzyPrime');
**/

var spawnTargetAttacker = {
    
    run: function(spawn, Slevel, targetRoom) {	
	    var room = spawn.room;
		var controller = room.controller;
		var controllerLevel = controller.level;
		var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
		
		var buildersLv1 = _.filter(builders, (creep) => creep.memory.level == 1);
		var buildersLv2 = _.filter(builders, (creep) => creep.memory.level == 2);
		var buildersLv3 = _.filter(builders, (creep) => creep.memory.level == 3);
		var success = true;
		var temp = 0;
		var error = "";
		
		var OSlevel = 0;
		
		if (OSlevel != 0){
		    Slevel = OSlevel;
		}
		
		/**Starter Builder, Level 1**///300
		if (Slevel == 1) {
			if(buildersLv1.length < 2) {
			    if(room.energyAvailable >= 250) {
				    var newName = 'StarterBuilder' + Game.time;
				    console.log('Spawning new builder: ' + newName);
				    var temp = spawn.spawnCreep( [WORK,CARRY,MOVE],newName,{ memory: { role: 'builder' , level:1} } );//200
			    }
			}
			else{
				var success = false;
				var error = 'Max number of Builders Level 1, Reached';
				var temp = -99;
			}
		}
		
		/**Basic Builder, Level 2**///550
		else if (Slevel == 2) {
			if(buildersLv2.length < 2) {
			    if(room.energyAvailable >= 450) {
				    var newName = 'BasicBuilder' + Game.time;
				    console.log('Spawning new builder: ' + newName);
				    var temp = spawn.spawnCreep( [WORK,WORK,CARRY,CARRY,MOVE,MOVE],newName,{ memory: { role: 'builder' , level:2} } );//400
			    }
			}
			else{
				var success = false;
				//var error = 'Max number of Builders Level 2, Reached';
				var temp = -99;
			}
		}
		
		/**Basic Builder, Level 3**///800
		else if (Slevel == 3) {
			if(buildersLv3.length < 2) {
			    if(room.energyAvailable >= 750) {
				    var newName = 'AdvancedBuilder' + Game.time;
				    console.log('Spawning new builder: ' + newName);
				    var temp = spawn.spawnCreep( [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],newName,{ memory: { role: 'builder' , level:3} } );//700
			    }
			}
			else{
				var success = false;
				//var error = 'Max number of Builders Level 3, Reached';
				var temp = -99;
			}
		}
		
		else {
			var success = false;
			console.log('Controller Level, Out of Range, Builder');
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
			//console.log('Builder Spawning Error: ' + error);
			return temp;
		}
	}
};

var consoleSpawnTargetAttacker = {
	run: function(spawnName, level, targetRoom, targetEnemy) {
	    if (Game.map.describeExits(targetRoom) == null) {
	        console.log("Error: Room not Found");
	    }
	    else {
	        
	        if (level == 1) {//550
	            var newName = 'TargetAttacker' + targetRoom + '' + Game.time;
			    console.log('Spawning new claimer: ' + newName + '   Target: ' + targetRoom);
			    Game.spawns[spawnName].spawnCreep( [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE],newName,{ memory: { role: 'claimer' , level:3, target: targetRoom, claimState: 0} } );//760
		    }
		    else if (level == 2) {//800
		        var newName = 'TargetAttacker' + targetRoom + '' + Game.time;
			    console.log('Spawning new claimer: ' + newName + '   Target: ' + targetRoom);
			    Game.spawns[spawnName].spawnCreep( [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,CLAIM,MOVE,MOVE,MOVE],newName,{ memory: { role: 'claimer' , level:4, target: targetRoom, claimState: 0} } );//800
            }
		    else if (level == 3) {//1300
		        var newName = 'TargetAttacker' + targetRoom + '' + Game.time;
			    console.log('Spawning new claimer: ' + newName + '   Target: ' + targetRoom);
			    Game.spawns[spawnName].spawnCreep( [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,CLAIM,MOVE,MOVE,MOVE,MOVE],newName,{ memory: { role: 'claimer' , level:5, target: targetRoom, claimState: 0} } );
            }
            
            else {
                console.log("Error: Level incorrect");
            }
            
	    }
	}
};

module.exports = {
	spawnTargetAttacker,
	consoleSpawnTargetAttacker
};