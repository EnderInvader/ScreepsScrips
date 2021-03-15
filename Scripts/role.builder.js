var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var spawn = creep.room.find(FIND_MY_SPAWNS)[0];
        var OSlevel = spawn.memory.OSlevel;
        
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
                targets.sort(function (a, b) {
                    return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
                });
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#0080ff'}});
                }
            }
            else {
	            creep.say("no building");
	            creep.moveTo(new RoomPosition(creep.room.memory.IdleCreeps.x,creep.room.memory.IdleCreeps.y,creep.room.memory.IdleCreeps.roomName), {visualizePathStyle: {stroke: '#ffffff'}});
            }
	    }
	    else {
	        if(creep.room.find(FIND_RUINS, {
                filter: (structure) => {
                    return structure.store[RESOURCE_ENERGY] == 99//0
                }
            }).length){
                creep.room.find(FIND_RUINS, {
                    filter: (structure) => {
                        return structure.store[RESOURCE_ENERGY] == 0
                    }
                }).forEach(ruin => {
                    creep.say(creep.dismantle(ruin));
                    if(creep.dismantle(ruin) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(ruin, {visualizePathStyle: {stroke: '#ff0000'}});
                    }  
                });
	        }
	        else{
	            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE ||
                            structure.structureType == STRUCTURE_CONTAINER) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0
                    }
	        });
	        targets.sort(function (a, b) {
                return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
            });
	        if(targets.length > 0) {
                if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else 
            {
                var sources = creep.room.find(FIND_SOURCES_ACTIVE);
                sources.sort(function (a, b) {
                    return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
                });
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
	        }
	    }

		
		
		if(creep.memory.level >= OSlevel) {//creep.memory.level >= controllerlevel - 1
			if(creep.ticksToLive <= 600 || creep.memory.renewing) {
				creep.memory.renewing = true;
				if (!Game.spawns['Spawn1'].spawning) {
					creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#00ff00'}})
				}
				else {
					creep.moveTo(Game.flags.IdleCreeps, {visualizePathStyle: {stroke: '#00ff00'}})
				}
				creep.say('renew');
			}
			if(creep.memory.renewing && creep.ticksToLive >= 1400)
			{
				creep.memory.renewing = false;
			}
		}
		else {
		    if(creep.ticksToLive <= 1000) {
                var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
                if (haulers > 0) {
				    creep.memory.role = "recycle";
                }
			}
		}
	}
};
module.exports = roleBuilder;