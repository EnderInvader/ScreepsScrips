var roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep, controllerlevel) {		
	    if(creep.memory.despositing && creep.carry.energy == 0) {
            creep.memory.despositing = false;
            creep.say('collect');
	    }
	    if(!creep.memory.despositing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.despositing = true;
	        creep.say('deposit');
	    }

	    if(creep.memory.despositing) {
	        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_TOWER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                }
	        });
	        targets.sort(function (a, b) {
	        	//TODO: sort also by, spawn > extenstion > (tower how much energy)
	        	
	        	if (a.structureType == STRUCTURE_EXTENSION && b.structureType == STRUCTURE_SPAWN) return 1;
	        	if (a.structureType == STRUCTURE_TOWER && b.structureType == STRUCTURE_EXTENSION) return 1;
	        	
	        	if (a.structureType == STRUCTURE_SPAWN && b.structureType == STRUCTURE_EXTENSION) return -1;
	        	if (a.structureType == STRUCTURE_EXTENSION && b.structureType == STRUCTURE_TOWER) return -1;
	        	
	        	if (creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b) > 0) return 1;
	        	if (creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b) < 0) return -1;
	        	return 0;
            });
	        if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {reusePath: 10, visualizePathStyle: {stroke: '#ffff00'}});
                }
            }
            else
            {
                var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_STORAGE ||
                                    structure.structureType == STRUCTURE_CONTAINER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                        }
	            });
	            targets.sort(function (a, b) {
                    return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
                });
	            if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {reusePath: 10, visualizePathStyle: {stroke: '#ffff00'}});
                    }
                }
            }
	    }
	    else {
	        if(creep.room.find(FIND_TOMBSTONES, {
                filter: (structure) => {
                    return structure.store[RESOURCE_ENERGY] > 0
                }
            }).length){
	            creep.say("tombstone");
	            creep.room.find(FIND_TOMBSTONES).forEach(tombstone => {
                    if(creep.withdraw(tombstone, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(tombstone, {reusePath: 10, visualizePathStyle: {stroke: '#ff0000'}});
                    }  
                });
	        }
	        else if(creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: (structure) => {
                    return structure.amount > 2 && structure.resourceType == RESOURCE_ENERGY
                }
            }).length){
	            creep.say("dropped");
	            creep.room.find(FIND_DROPPED_RESOURCES).forEach(resourceDrop => {
                    if(creep.pickup(resourceDrop) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(resourceDrop, {reusePath: 10, visualizePathStyle: {stroke: '#ff0000'}});
                    }
				});
			}
			else if(creep.room.find(FIND_RUINS, {
				filter: (structure) => {
					return structure.store[RESOURCE_ENERGY] > 0
				}
			}).length){
				creep.say("ruins");
				creep.room.find(FIND_RUINS).forEach(ruins => {
					//creep.say(creep.withdraw(ruins, RESOURCE_ENERGY));
					if(creep.withdraw(ruins, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(ruins, {reusePath: 10, visualizePathStyle: {stroke: '#ff0000'}});
					}
				});
			}
			else
			{
				if(creep.store[RESOURCE_ENERGY] > 0){
					creep.memory.despositing = true;
					creep.say('deposit');
				}
				else
				{
					//Grab from storage
					var targets = creep.room.find(FIND_STRUCTURES, {
						filter: (structure) => {
							return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_TOWER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
						}
					});
					if(targets.length > 0) {
						//Sort
						targets.sort(function(a,b){
							if(a > b) return 1;
							if(a < b) return -1;
							return 0;
						});

						var storages = creep.room.find(FIND_STRUCTURES, {//TODO: Grab from containers first?
							filter: (structure) => {
								return (structure.structureType == STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] > 10000;
							}
						});
						if (storages.length > 0) {
						    if(creep.withdraw(storages[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
							    creep.moveTo(storages[0], {reusePath: 10, visualizePathStyle: {stroke: '#ff8000'}});
						    }
						}
					}
					else {
						creep.moveTo(Game.flags.IdleCreeps, {reusePath: 20, visualizePathStyle: {stroke: '#ffffff'}});
					}
				}
			}
		}


		if(true) {//creep.memory.level >= controllerlevel - 1
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
	}
};

module.exports = roleHauler;