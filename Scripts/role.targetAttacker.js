//attackState -2: Retreat and Heal
//attackState -1: Move to room
//attackState 0: Attack
//attackState 1: Rescan Room

var roleScout = require('role.scout');

var roleTargetAttacker = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var targetRoom = creep.memory.target;
        
        if(creep.room.name != targetRoom && creep.memory.attackState != -2) {
            creep.memory.attackState = -1;
        }
        else if (creep.memory.attackState == -1) {
            creep.memory.attackState = 0;
        }
        
        switch(creep.memory.attackState) {
          case -2:
            creep.moveTo(Game.spawns['Spawn1'], {ignoreCreeps: true, visualizePathStyle: {stroke: '#00ff00'}});
            if (creep.hits == creep.hitsMax) {
                creep.memory.attackState = 0;
            }
            break;
            
          case -1:
            creep.say("moving");
            creep.moveTo(new RoomPosition(25, 25, targetRoom), {reusePath: 50, range: 25, ignoreCreeps: false, visualizePathStyle: {stroke: '#ffffff'}});

            /*creep.moveTo(new RoomPosition(25, 25, targetRoom), {visualizePathStyle: {stroke: '#ffffff'}, {
                costCallback: function(roomName, costMatrix) {
                    if(roomName == 'W1N5') {
                        // set anotherCreep's location as walkable
                        costMatrix.set(anotherCreep.pos.x, anotherCreep.pos.y, 0);
                        // set flag location as an obstacle
                        costMatrix.set(flag.pos.x, flag.pos.y, 255);
                        // increase cost for (25,20) location to 50
                        costMatrix.set(25, 20, 50);
                    }
                }
            }};*/

            break;
            
          case 0:
            creep.say("attacking");
            if (creep.hits < creep.hitsMax * 0.5) {
                creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#8000ff'}});
                creep.memory.attackState = -2;
            }
            else {
                const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);//FIND_HOSTILE_CREEPS
                if (false) {
                    creep.moveTo(target, {ignoreCreeps: true, visualizePathStyle: {stroke: '#8000ff'}});
                    creep.attack(target);
                }
                else {
                    const target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                        filter: (s) => {
                            return (s.structureType != STRUCTURE_CONTROLLER)
                        }
                    });
                    if(target) {
                        if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, {visualizePathStyle: {stroke: '#8000ff'}});
                        }
                    }
                    else if (creep.hits < creep.hitsMax) {
                        creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#8000ff'}});
                        creep.memory.attackState = -2;
                    }
                    else {
                        const target = creep.pos.findClosestByRange(FIND_HOSTILE_CONSTRUCTION_SITES);
                        if(target) {
                            creep.moveTo(target, {visualizePathStyle: {stroke: '#8000ff'}});
                        }
                        else {
                            creep.memory.attackState = 1;
                        }
                    }
                }
            }
            break;
            
          case 1:
            creep.say("other enemies");
            //creep.moveTo(Game.flags.IdleAttackers, {reusePath: 50, visualizePathStyle: {stroke: '#ffffff'}});
            roomId = roleScout.updateRoom(targetRoom, 0);
            
            const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);//FIND_HOSTILE_CREEPS
            if (target) {
                roomId = roleScout.updateRoom(targetRoom, 1);
                creep.memory.attackState = 0;
            }
            break;


          case 2:
            creep.say("rarr");
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_WALL) && structure.hits;
                }
            });
            if(targets.length) {
                targets.sort(function (a, b) {
                    return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
                });
                if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#8000ff'}});
                }
            }
            break;


          default:
            creep.say("Unknown");
            creep.moveTo(25, 25);
        }
	}
};

module.exports = roleTargetAttacker;