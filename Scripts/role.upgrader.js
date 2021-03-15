var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var spawn = creep.room.find(FIND_MY_SPAWNS)[0];
        var OSlevel = spawn.memory.OSlevel;
        
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvest');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('upgrade');
	    }

	    if(creep.memory.upgrading) {
	        var signText = "no touchy";
	        if(creep.room.controller.sign == null || creep.room.controller.sign.text != signText) {
	            if(creep.signController(creep.room.controller, signText) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
	        }
	        
            else if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {reusePath: 50, visualizePathStyle: {stroke: '#ffffff'}});
            }//creep.room.controller   , range: 3
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE ||
                            structure.structureType == STRUCTURE_CONTAINER) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0
                }
	        });
	        targets.sort(function (a, b) {
                return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
            });
	        if(false) {//targets.length > 0
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

module.exports = roleUpgrader;