var roleRepairer = {

	/** @param {Creep} creep **/
	run: function(creep) {
	    spawn = creep.room.find(FIND_MY_SPAWNS)[0];
        var OSlevel = spawn.memory.OSlevel;
	    
		if(creep.memory.repairing && creep.carry.energy == 0) {
			creep.memory.repairing = false;
			creep.say('harvest');
		}
		if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
			creep.memory.repairing = true;
			creep.say('repair');
		}

		if(creep.memory.repairing) {
			var targets = creep.room.find(FIND_STRUCTURES, {
				filter: (s) => {
					return (s.hits < s.hitsMax)
				}
			});
			targets.sort(function (a, b) {
				if (a.hits == b.hits) {
					return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
				}
				else {
					return (a.hits - b.hits);
				}
			});
			if(targets.length > 0) {
				if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
				}
			}
			else {
			    if(creep.memory.level == 1){
                    var roleBuilder = require('role.builder');
                    roleBuilder.run(creep);
                }
                else {
                    if(creep.carry.energy < creep.carryCapacity) {
			            creep.memory.repairing = false;
			            creep.say('harvest');
		            }
                    else {
				        creep.say("no repair")
				        creep.moveTo(new RoomPosition(creep.room.memory.IdleCreeps.x,creep.room.memory.IdleCreeps.y,creep.room.memory.IdleCreeps.roomName), {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
			}
		}
		else {
			var targets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_STORAGE ||
					structure.structureType == STRUCTURE_CONTAINER) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0
				}
			});
			if(targets.length > 0) {
				if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
				}
			}
			else
			{
				var sources = creep.room.find(FIND_SOURCES);
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
				creep.memory.role = "recycle";
			}
		}
	}
};

module.exports = roleRepairer;