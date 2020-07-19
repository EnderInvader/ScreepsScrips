var roleHealer = {

    /** @param {Creep} creep **/
    run: function(creep, controllerlevel) {		
	    const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function(object) {
                return object.hits < object.hitsMax;
            }
        });
        if(target) {
            if(creep.heal(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        else {
            creep.say("No Healing");
            creep.moveTo(Game.flags.IdleCreeps, {visualizePathStyle: {stroke: '#ffffff'}});
        }
        
        
        
        
        if(true) {
			if(creep.ticksToLive <= 200) {
			    creep.memory.role = 'recycle';
			}
		}
	}
};

module.exports = roleHealer;