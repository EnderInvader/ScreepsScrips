var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep, controllerlevel) { 
        if(!creep.memory.Csource){
            creep.say("Starting");
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
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
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
                        return (structure.structureType == STRUCTURE_TOWER) && structure.store[RESOURCE_ENERGY] < 1000 //500
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
                else{
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
                                if(controllerlevel == 1){
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
                }
            }
        }
        else {
            if(!creep.memory.Csource){
                var sources = creep.room.find(FIND_SOURCES_ACTIVE);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ff8000'}});
                }
            }
            else{
                var sources = creep.room.find(FIND_SOURCES);
                if(sources[creep.memory.Csource - 1].energy > 0) {
                    if(creep.harvest(sources[creep.memory.Csource - 1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[creep.memory.Csource - 1], {visualizePathStyle: {stroke: '#ff8000'}});
                    }
                }
                else{
                    var sources = creep.room.find(FIND_SOURCES_ACTIVE);
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ff8000'}});
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
        
        
        
        /*if(creep.memory.level >= controllerlevel) {
            if(creep.ticksToLive <= 600 || creep.memory.renewing) {
                creep.memory.renewing = true;
                creep.cancelOrder('move');
                creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#00ff00'}})
                creep.say('renew');
            }
            if(creep.memory.renewing && creep.ticksToLive >= 1400)
            {
                creep.memory.renewing = false;
            }
        }*/
    }
};
module.exports = roleHarvester;