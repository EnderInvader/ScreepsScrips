var roleRangedDefender = {

    //TOWER CODE
    run: function(rangeddefender) {

		var myRoomName = rangeddefender.room
        var target = rangeddefender.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		var creep = rangeddefender
		
        //if there are hostiles - attakc them    
        if(target) {
            var username = target.owner.username;
            Game.notify(`User ${username} spotted in room ${myRoomName}`);
            if(creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ff0000'}});
            }
            console.log("ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ");
        }
		else {
			creep.moveTo(Game.flags.IdleDefenders);
		}
		
		if(creep.memory.level != 'starter') {
			if(creep.ticksToLive <= 1000) {
				creep.cancelOrder('move');
				creep.moveTo(Game.spawns['Spawn1'])
			}
		}
	}
};

module.exports = roleRangedDefender;