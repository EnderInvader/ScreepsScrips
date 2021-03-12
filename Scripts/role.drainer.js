//attackState -2: Retreat and Heal
//attackState -1: Move to room
//attackState 0: Attack
//attackState 1: Rescan Room

var roleScout = require('role.scout');

var roleDrainer = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var targetRoom = creep.memory.target;
        
        creep.moveTo(new RoomPosition(25, 25, targetRoom), {reusePath: 50, range: 25, ignoreCreeps: false, visualizePathStyle: {stroke: '#ffffff'}});

        /*if (creep.room.name == targetRoom) {
        	if (creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)) {
                roomId = roleScout.updateRoom(targetRoom, 1);
            }
            else if (creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES)) {
            	roomId = roleScout.updateRoom(targetRoom, 2);
            }
            else {
        		roomId = roleScout.updateRoom(targetRoom, 0);
        	}
        }*/
    }
};

module.exports = roleDrainer;