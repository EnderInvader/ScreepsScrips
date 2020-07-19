var roleRecycled = {

    run: function(creep) {
        creep.say("die");
        
        if (creep.carry.energy > 0){
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                    }
	        });
	        if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                }
            }
            else
            {
                var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_TOWER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                        }
	            });
	            if(targets.length > 0) {
	                targets.sort(function (a, b) {
                        return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
                    });
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                    }
                }
                else
            {
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
                            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
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
                                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                            }
                        }
                        else 
	                    {
	                        creep.say('all full')
	                    }
                    }
                }
            }
        }
        else{
            creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ff0080'}});
        }
	}
};

module.exports = roleRecycled;