//claimState -1: Move to room
//claimState 0: Sign
//claimState 1: Reserve
//claimState 2: Claim

var roleScout = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var searchRoom = creep.memory.target //target room
        
        if(creep.room.name != searchRoom) {
            creep.moveTo(new RoomPosition(25, 25, searchRoom), {reusePath: 50, ignoreCreeps: false, visualizePathStyle: {stroke: '#ffffff'}});
        }
        else {
            const targetCreeps = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            const targetStructures = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);

            var roomId;
            if(targetCreeps) {
                console.log("Found Hostile in Room " + searchRoom);
                roomId = this.updateRoom(searchRoom, 1);
            }
            else if (targetStructures) {
                console.log("Found Hostile Structure in Room " + searchRoom);
                roomId = this.updateRoom(searchRoom, 2);
            }
            else {
                console.log("No Hostile in Room " + searchRoom);
                roomId = this.updateRoom(searchRoom, 0);
            }
            
            this.newTarget(creep, roomId);
        }
	},
	
	updateRoom: function(searchRoom, newState) {
	    for(var i in Memory.targetRooms) {
            var targetRoom = Memory.targetRooms[i];
            if (searchRoom == targetRoom.name) {
                if (targetRoom.enemyState != 3) {
                    targetRoom.enemyState = newState;
                }
                if (Game.rooms[searchRoom].controller) {
                    targetRoom.reserved = Game.rooms[searchRoom].controller.reservation;
                }
                else {
                    targetRoom.reserved = null;
                }
                targetRoom.lastScan = Game.time;
                return i;
            }
        }
	},
	
	newTarget: function(creep, roomId) {
	    var currentRoom = creep.memory.target
	    
	    if (roomId >= Memory.targetRooms.length - 1) {
	        roomId = 0;
	        creep.memory.target = Memory.targetRooms[roomId].name;
	    }
	    else {
	        roomId++;
	        creep.memory.target = Memory.targetRooms[roomId].name;
	    }
	}
};

module.exports = roleScout;