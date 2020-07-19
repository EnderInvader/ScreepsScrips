/**
 * require('spawn.targetAttacker').consoleSpawnTargetAttacker.run('Spawn1',1,'targetRoom','targetCreepName','targetCreepOwner');
 * require('spawn.targetAttacker').consoleSpawnTargetAttacker.run('Spawn1',2,'W32S35','infestor_0','XyzzyPrime');
**/

var spawnTargetAttacker = {
    
    run: function(spawn, Slevel, targetRoom) {	
	    var room = spawn.room;
		var controller = room.controller;
		var controllerLevel = controller.level;
		var targetAttackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'targetAttacker');
		
		var targetAttackersLv3 = _.filter(targetAttackers, (creep) => creep.memory.level == 3);
		var targetAttackersLv4 = _.filter(targetAttackers, (creep) => creep.memory.level == 4);
		var targetAttackersLv5 = _.filter(targetAttackers, (creep) => creep.memory.level == 5);
		var success = true;
		var temp = 0;
		var error = "";
		
		var OSlevel = 0;
		
		if (OSlevel != 0){
		    Slevel = OSlevel;
		}
		
		if (Slevel == 1 || Slevel == 2) {
			var success = false;
			var error = 'No Attackers Level ' + Slevel;
			var temp = -99;
		}
		/**Attacker, Level 3**///800
		else if (Slevel == 3) {//800
			if(room.energyAvailable >= 800) {
			    var newName = 'Attacker1' + targetRoom + '' + Game.time;
			    console.log('Spawning new attacker: ' + newName + '   Target: ' + targetRoom);
			    var temp = spawn.spawnCreep( [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE],newName,{ memory: { role: 'targetAttacker' , level:3, target: targetRoom, attackState: -1} } );//800
		    }
		}
		
		/**Attacker, Level 4**///1200
		else if (Slevel == 4) {//1300
			if(room.energyAvailable >= 1200) {
				var newName = 'Attacker2' + targetRoom + '' + Game.time;
				console.log('Spawning new attacker: ' + newName + '   Target: ' + targetRoom);
				var temp = spawn.spawnCreep( [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],newName,{ memory: { role: 'targetAttacker' , level:4, target: targetRoom, attackState: -1} } );//1200
			}
		}
		
		/**Attacker, Level 5**///1580
		else if (Slevel == 5) {//1800
			if(room.energyAvailable >= 1580) {
				var newName = 'Attacker3' + targetRoom + '' + Game.time;
				console.log('Spawning new attacker: ' + newName + '   Target: ' + targetRoom);
				var temp = spawn.spawnCreep( [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],newName,{ memory: { role: 'targetAttacker' , level:5, target: targetRoom, attackState: -1} } );//1500
			}
		}
		
		else {
			var success = false;
			console.log('Controller Level, Out of Range, Target Attacker');
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
			//console.log('Attacker Spawning Error: ' + error);
			return temp;
		}
	}
};

var consoleSpawnTargetAttacker = {
	run: function(spawnName, level, targetRoom) {
	    if (Game.map.describeExits(targetRoom) == null) {
	        console.log("Error: Room not Found");
	    }
	    else {
	        
	        if (level == 1) {//3 800
	            var newName = 'Attacker1' + Game.time;
			    console.log('Spawning new target attacker: ' + newName + '   Target: ' + targetRoom);
			    Game.spawns[spawnName].spawnCreep( [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE],newName,{ memory: { role: 'targetAttacker' , level:3, target: targetRoom, attackState: -1} } );//700
		    }
		    else if (level == 2) {//4 1300
		        var newName = 'Attacker2' + Game.time;
			    console.log('Spawning new target attacker: ' + newName + '   Target: ' + targetRoom);
			    Game.spawns[spawnName].spawnCreep( [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,CLAIM,MOVE,MOVE,MOVE],newName,{ memory: { role: 'claimer' , level:4, target: targetRoom, claimState: -1} } );//800
            }
		    else if (level == 3) {//5 1800
		        var newName = 'Attacker3' + Game.time;
			    console.log('Spawning new target attacker: ' + newName + '   Target: ' + targetRoom);
			    Game.spawns[spawnName].spawnCreep( [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,CLAIM,MOVE,MOVE,MOVE,MOVE],newName,{ memory: { role: 'claimer' , level:5, target: targetRoom, claimState: -1} } );
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