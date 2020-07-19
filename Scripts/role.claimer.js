//claimState -1: Move to room
//claimState 0: Sign
//claimState 1: Reserve
//claimState 2: Claim

var roleClaimer = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var targetRoom = creep.memory.target //target room
        
        if(creep.room.name != targetRoom) {
            creep.moveTo(new RoomPosition(25, 25, targetRoom), {reusePath: 50, visualizePathStyle: {stroke: '#ffffff'}});
            creep.memory.claimState = -1;
        }
        else if (creep.memory.claimState == -1) {
            creep.memory.claimState = 0;
        }
        
        switch(creep.memory.claimState) {
          case -1:
            creep.say("moving");
            break;
            
          case 0:
            creep.say("signing");
            var signer = creep.signController(creep.room.controller, "No touchy");
            if(signer == -9) {
                creep.moveTo(creep.room.controller, {reusePath: 50, visualizePathStyle: {stroke: '#ffffff'}});
            }
            else if (signer == 0) {
                creep.memory.claimState = 1;
            }
            break;
            
          case 1:
            creep.say("mine", true);
            if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {reusePath: 50, visualizePathStyle: {stroke: '#ffffff'}});
            }
            break;
            
          case 2:
            creep.say("claiming");
            if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {reusePath: 50, visualizePathStyle: {stroke: '#ffffff'}});
            }
            break;
            
          default:
            creep.say("Unknown");
            creep.moveTo(25, 25);
        }
	}
};

module.exports = roleClaimer;