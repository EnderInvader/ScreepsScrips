var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {		
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                /**creep.moveTo(Game.flags.IdleCreeps);**/
				var roleHarvester = require('role.harvester');
				roleHarvester.run(creep);
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }

		if(creep.memory.level != 'starter') {
			if(creep.ticksToLive <= 1000) {
				creep.cancelOrder('move');
				creep.moveTo(Game.spawns['Spawn1'])
			}
		}		
	}
};

module.exports = roleBuilder;