var roleRangedDefender = {

    //TOWER CODE
    run: function(rangeddefender, controllerlevel) {

		var myRoomName = rangeddefender.room
        var target = rangeddefender.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		var creep = rangeddefender
		
        //if there are hostiles - attakc them    
        if(target) {
            var username = target.owner.username;
            var name = target.name;
            Game.notify(`User ${username} with creep ${name} spotted in room ${myRoomName.name}`);
            if(creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#8000ff'}});
            }
            console.log("ALERT!!!! WE ARE UNDER ATTACK!!!!!");
        }
		else {
			creep.moveTo(Game.flags.IdleDefenders);
		}

		
		
		if(true) {//creep.memory.level >= controllerlevel - 1
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
		}	
	}
};

module.exports = roleRangedDefender;