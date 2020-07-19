//attackState -1: Move to room
//attackState 0: Attack
//attackState 1: Rescan Room

var roleScout = require('role.scout');

var roleTargetAttacker = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var targetRoom = creep.memory.target;
        
        if(creep.room.name != targetRoom) {
            creep.moveTo(new RoomPosition(25, 25, targetRoom), {reusePath: 50, visualizePathStyle: {stroke: '#ffffff'}});
            creep.memory.attackState = -1;
        }
        else if (creep.memory.attackState == -1) {
            creep.memory.attackState = 0;
        }
        
        switch(creep.memory.attackState) {
          case -1:
            creep.say("moving");
            break;
            
          case 0:
            creep.say("attacking");
            if (creep.hits / 2 < creep.hitsMax) {
                creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#8000ff'}});
            }
            else {
                const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if (target) {
                    if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#8000ff'}});
                    }
                }
                else {
                    const target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
                    if(target) {
                        if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, {visualizePathStyle: {stroke: '#8000ff'}});
                        }
                    }
                    else {
                        creep.memory.attackState = 1;
                    }
                }
            }
            break;
            
          case 1:
            creep.say("other enemies");
            creep.moveTo(Game.flags.IdleAttackers, {reusePath: 50, visualizePathStyle: {stroke: '#ffffff'}});
            roomId = roleScout.updateRoom(targetRoom, 0);
            break;
            
          default:
            creep.say("Unknown");
            creep.moveTo(25, 25);
        }
	}
};

module.exports = roleTargetAttacker;