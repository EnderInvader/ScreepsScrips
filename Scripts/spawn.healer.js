/**require('spawn.healer').consoleSpawnHealer.run('Spawn1',1);**/

var spawnHealer = {

    /** @param {Creep} creep **/
    run: function(spawn, Slevel) {	
	    var room = spawn.room;
		var controller = room.controller;
		var controllerLevel = controller.level;
		var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer');
		
		var healersLv1 = _.filter(healers, (creep) => creep.memory.level == 1);
		var healersLv2 = _.filter(healers, (creep) => creep.memory.level == 2);
		var healersLv3 = _.filter(healers, (creep) => creep.memory.level == 3);
		var success = true;
		var temp = 0;
		var error = "";
		
		var OSlevel = 1;
		
		if (OSlevel != 0){
		    Slevel = OSlevel;
		}
		
		/**Starter Healer, Level 1**///300
		if (Slevel == 1) {//controllerLevel == 1
		    if(healers.length < 1) {
				if(room.energyAvailable >= 400) {
				    var newName = 'StarterHealer' + Game.time;
				    console.log('Spawning new healer: ' + newName);
				    var temp = spawn.spawnCreep( [HEAL,MOVE,MOVE],newName,{ memory: { role: 'healer' , level:1} } );//350
			    }
			    else
			    {
			        console.log(room.energyAvailable)
			    }
			}
			else{
				var success = false;
				var error = 'Max number of Healers, Reached';
				var temp = -99;
			}
		}
		
		else {
			var success = false;
			console.log('Controller Level, Out of Range, Healer');
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
			//console.log('Healer Spawning Error: ' + error);
			return temp;
		}
	}
};

module.exports = {
	spawnHealer
};