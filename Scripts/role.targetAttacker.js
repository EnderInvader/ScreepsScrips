//attackState -1: Move to room
//attackState 0: Attack
//attackState 1: Find other enemies

var roleTargetAttacker = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var targetRoom = creep.memory.targetRoom
        var targetCreep = creep.memory.targetCreep
        
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
            if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#8000ff'}});
            }
            break;
            
          case 1:
            creep.say("other enemies");
            if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {reusePath: 50, visualizePathStyle: {stroke: '#ffffff'}});
            }
            break;
            
          default:
            creep.say("Unknown");
            creep.moveTo(25, 25);
        }
	}
};

module.exports = roleTargetAttacker;