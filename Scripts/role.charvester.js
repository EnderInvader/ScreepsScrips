var roleCHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var spawn = creep.room.find(FIND_MY_SPAWNS)[0];
        var OSlevel = spawn.memory.OSlevel;
        
        if(!creep.memory.Csource){
            creep.say("have");
            creep.memory.Csource = 1;
        }
        
        if(creep.memory.despositing && creep.carry.energy == 0) {
            creep.memory.despositing = false;
            creep.say('harvest');
	    }
	    if(!creep.memory.despositing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.despositing = true;
	        creep.say('deposit');
	    }
        
	    if(creep.memory.despositing) {
	        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                }
            });
            if(targets.length > 0) {
                targets.sort(function (a, b) {
                    return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
                });
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else
            {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                    }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else 
                {
                    if(creep.memory.level == 1){
                        var roleBuilder = require('role.builder');
		                roleBuilder.run(creep);
                    }
                    else {
                        creep.say('all full')
                        creep.moveTo(Game.flags.IdleCreeps, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
	    }
	    else {
	        if(!creep.memory.Csource){
	            var sources = creep.room.find(FIND_SOURCES_ACTIVE);
	            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
	        }
	        else{
	            var sources = creep.room.find(FIND_SOURCES);
	            if(sources[creep.memory.Csource - 1].energy > 0) {
                    if(creep.harvest(sources[creep.memory.Csource - 1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[creep.memory.Csource - 1], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
	            }
	            else{
	                var sources = creep.room.find(FIND_SOURCES_ACTIVE);
	                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
	            }
	        }
            
	        /**if(creep.room.find(FIND_SOURCES, {
                filter: (source) => {
                    return source.energy > 0
                }
            }).length){
	            creep.room.find(FIND_SOURCES).forEach(sources => {
                    if(sources.energy > 0){
                        if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(sources, {visualizePathStyle: {stroke: '#ff9000'}});
                        }
                    }
                });
	        }
	        
	        else
	        {
	            //creep.say("none");
	            if(creep.store[RESOURCE_ENERGY] > 0){
	                creep.memory.despositing = true;
	                creep.say('deposit');
	            }
	            else 
	            {
	                creep.say('all sources empty')
	                creep.moveTo(Game.flags.IdleCreeps, {visualizePathStyle: {stroke: '#ffffff'}});
	            }
	        }**/
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
module.exports = roleCHarvester;