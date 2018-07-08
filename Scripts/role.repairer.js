var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('harvest');
	    }
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;
	        creep.say('repair');
	    }

	    if(creep.memory.repairing) {
            var targets = creep.room.find(FIND_STRUCTURES, {filter: object => object.hits < object.hitsMax});
			targets.sort((a,b) => a.hits - b.hits);
			if(targets.length > 0) {
				if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
				}
			}
			else {
                creep.moveTo(Game.flags.IdleCreeps, {visualizePathStyle: {stroke: '#ffffff'}});
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

module.exports = roleRepairer;