/**require('spawn.rangedDefender').consoleSpawnRangedDefender.run('Spawn1',1);**/

var spawnRangedDefender = {

    /** @param {Creep} creep **/
    run: function(spawn, Slevel) {	
	    var room = spawn.room;
		var controller = room.controller;
		var controllerLevel = controller.level;
		var rangedDefenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'rangedDefender');
		
		var rangedDefendersLv1 = _.filter(rangedDefenders, (creep) => creep.memory.level == 1);
		var success = true;
		var temp = 0;
		var error = "";
		
		var OSlevel = 1;
		
		if (OSlevel != 0){
		    Slevel = OSlevel;
		}
		
		/**Starter Ranged Defender, Level 1**///300
		if (Slevel == 1) {//controllerLevel == 1
		    if(rangedDefenders.length < 3 && !spawn.spawning) {
				if(room.energyAvailable >= 450) {
				    var newName = 'Ranged Defender.' + Game.time;
				    console.log('Spawning new ranged defender: ' + newName);
				    var temp = spawn.spawnCreep( [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE],newName,{ memory: { role: 'rangedDefender' , level:1} } );//400
			    }
			    else
			    {
			        //console.log(room.energyAvailable)
			    }
			}
			else{
				var success = false;
				var error = 'Max number of Ranged Defenders, Reached';
				var temp = -99;
			}
		}
		
		else {
			var success = false;
			console.log('Controller Level, Out of Range, Ranged Defender');
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
			//console.log('Ranged Defender Spawning Error: ' + error);
			return temp;
		}
	}
};

module.exports = {
	spawnRangedDefender
};