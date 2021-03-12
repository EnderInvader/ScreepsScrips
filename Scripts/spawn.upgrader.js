/**require('spawn.upgrader').consoleSpawnUpgrader.run('Spawn1',1);**/

var spawnUpgrader = {

    /** @param {Creep} creep **/
    run: function(spawn, Slevel) {	
	    var room = spawn.room;
		var controller = room.controller;
		var controllerLevel = controller.level;
		var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
		
		var upgradersLv1 = _.filter(upgraders, (creep) => creep.memory.level == 1);
		var upgradersLv2 = _.filter(upgraders, (creep) => creep.memory.level == 2);
		var upgradersLv3 = _.filter(upgraders, (creep) => creep.memory.level == 3);
		var upgradersLv4 = _.filter(upgraders, (creep) => creep.memory.level == 4);
		var upgradersLv5 = _.filter(upgraders, (creep) => creep.memory.level == 5);
		var success = true;
		var temp = 0;
		var error = "";
		
		var OSlevel = 0;
		
		if (OSlevel != 0){
		    Slevel = OSlevel;
		}
		
		/**Starter Upgrader, Level 1**/
		if (Slevel == 1) {
			if(upgradersLv1.length < 1) {
			    if(room.energyAvailable >= 250) {
				    var newName = 'StarterUpgrader' + Game.time;
				    console.log('Spawning new upgrader: ' + newName);
				    var temp = spawn.spawnCreep( [WORK,CARRY,MOVE],newName,{ memory: { role: 'upgrader' , level:1} } );//200
			    }
			    else
			    {
			        //console.log(room.energyAvailable)
			    }
			}
			else{
				var success = false;
				var error = 'Max number of Upgraders Level 1, Reached';
				var temp = -99;
			}
		}
		
		/**Basic Upgrader, Level 2**/
		else if (Slevel == 2) {
			if(upgradersLv2.length < 2) {
			    if(room.energyAvailable >= 500) {
				    var newName = 'BasicUpgrader' + Game.time;
				    console.log('Spawning new upgrader: ' + newName);
				    var temp = spawn.spawnCreep( [WORK,WORK,WORK,CARRY,MOVE,MOVE],newName,{ memory: { role: 'upgrader' , level:2} } );//450
			    }
			    else
			    {
			        //console.log(room.energyAvailable)
			    }
			}
			else{
				var success = false;
				var error = 'Max number of Upgraders Level 2, Reached';
				var temp = -99;
			}
		}
		
		/**Advanced Upgrader, Level 3**/
		else if (Slevel == 3) {
			if(upgradersLv3.length < 2) {
			    if(room.energyAvailable >= 500) {
				    var newName = 'AdvancedUpgrader' + Game.time;
				    console.log('Spawning new upgrader: ' + newName);
				    var temp = spawn.spawnCreep( [WORK,WORK,WORK,CARRY,MOVE,MOVE],newName,{ memory: { role: 'upgrader' , level:3} } );//450
			    }
			    else
			    {
			        //console.log(room.energyAvailable)
			    }
			}
			else{
				var success = false;
				var error = 'Max number of Upgraders Level 3, Reached';
				var temp = -99;
			}
		}
		
		else if (Slevel == 4) {
			if(upgradersLv4.length < 2) {
			    if(room.energyAvailable >= 500) {
				    var newName = 'Upgrader' + Game.time;
				    console.log('Spawning new upgrader: ' + newName);
				    var temp = spawn.spawnCreep( [WORK,WORK,WORK,CARRY,MOVE,MOVE],newName,{ memory: { role: 'upgrader' , level:4} } );//450
			    }
			    else
			    {
			        //console.log(room.energyAvailable)
			    }
			}
			else{
				var success = false;
				var error = 'Max number of Upgraders Level 4, Reached';
				var temp = -99;
			}
		}
		
		else if (Slevel == 5) {
			if(upgradersLv5.length < 2) {
			    if(room.energyAvailable >= 500) {
				    var newName = 'HighUpgrader' + Game.time;
				    console.log('Spawning new upgrader: ' + newName);
				    var temp = spawn.spawnCreep( [WORK,WORK,WORK,CARRY,MOVE,MOVE],newName,{ memory: { role: 'upgrader' , level:5} } );//450
			    }
			    else
			    {
			        //console.log(room.energyAvailable)
			    }
			}
			else{
				var success = false;
				var error = 'Max number of Upgraders Level 5, Reached';
				var temp = -99;
			}
		}
		
		else {
			var success = false;
			console.log('Controller Level, Out of Range, Upgrader');
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
			//console.log('Upgrader Spawning Error: ' + error);
			return temp;
		}
	}
};

var consoleSpawnUpgrader = {
	run: function(spawnName,level) {
		if (level == 1) {
			var newName = 'StarterUpgrader' + Game.time;
			console.log('Spawning new upgrader: ' + newName);
			Game.spawns[spawnName].spawnCreep( [WORK,CARRY,MOVE],newName,{ memory: { role: 'upgrader' , level:1} } );
		}
		else if (level == 2) {
			var newName = 'BasicUpgrader' + Game.time;
			console.log('Spawning new upgrader: ' + newName);
			Game.spawns[spawnName].spawnCreep( [WORK,WORK,WORK,CARRY,MOVE,MOVE],newName,{ memory: { role: 'upgrader' , level:2} } );
		}
	}
};

module.exports = {
	spawnUpgrader,
	consoleSpawnUpgrader
};