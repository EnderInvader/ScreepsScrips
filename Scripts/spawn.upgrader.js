var spawnUpgrader = {

    /** @param {Creep} creep **/
    run: function(spawn) {	
	    var room = spawn.room;
		var controller = room.controller;
		var controllerLevel = controller.level;
		var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
		
		/**Starter Upgrader, Level 1**/
		var upgradersLv1 = _.filter(upgraders, (creep) => creep.memory.level == 1);
		if (controllerLevel == 1) {
			if(harvestersLv1.length < 1) {
				var newName = 'StarterUpgrader' + Game.time;
				console.log('Spawning new upgrader: ' + newName);
				spawn.spawnCreep( [WORK,CARRY,MOVE],newName,{ memory: { role: 'upgrader' , level:1} } );
			}
		}
		
		var upgradersLv2 = _.filter(upgraders, (creep) => creep.memory.level == 2);
		/**Basic Upgrader, Level 2**/
		if (controllerLevel == 2) {
			if(harvestersLv2.length < 1) {
				var newName = 'BasicUpgrader' + Game.time;
				console.log('Spawning new upgrader: ' + newName);
				spawn.spawnCreep( [WORK,WORK,WORK,CARRY,MOVE,MOVE],newName,{ memory: { role: 'upgrader' , level:2} } );
			}
		}
	}
};

module.exports = spawnUpgrader;