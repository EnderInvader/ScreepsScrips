var roleRangedDefender = {

    //TOWER CODE
    run: function(creep) {
        spawn = creep.room.find(FIND_MY_SPAWNS)[0];
        var OSlevel = spawn.memory.OSlevel;

		var myRoomName = creep.room
        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		
        //if there are hostiles - attakc them    
        if(target) {
            var username = target.owner.username;
            var name = target.name;
            Game.notify(`User ${username} with creep ${name} spotted in room ${myRoomName.name}`);
            if(creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {ignoreDestructibleStructures: true, ignoreCreeps: true, visualizePathStyle: {stroke: '#8000ff'}});
            }
            console.log(`User ${username} with creep ${name} spotted in room ${myRoomName.name}`);
        }
		else {
			creep.moveTo(new RoomPosition(creep.room.memory.IdleDefenders.x,creep.room.memory.IdleDefenders.y,creep.room.memory.IdleDefenders.roomName));
		}

		
		
		if(creep.memory.level >= OSlevel) {//creep.memory.level >= controllerlevel - 1
			if(creep.ticksToLive <= 600 || creep.memory.renewing) {
				creep.memory.renewing = true;
				if (!Game.spawns['Spawn1'].spawning) {
					creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#00ff00'}})
				}
				else {
					creep.moveTo(Game.flags.IdleCreeps, {visualizePathStyle: {stroke: '#00ff00'}})
				}
				creep.say('renew');
			}
			if(creep.memory.renewing && creep.ticksToLive >= 1400)
			{
				creep.memory.renewing = false;
			}
		}
		else {
		    if(creep.ticksToLive <= 1000) {
				creep.memory.role = "recycle";
			}
		}
	}
};

module.exports = roleRangedDefender;