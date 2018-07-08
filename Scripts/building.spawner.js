var buildingSpawner = {

    run: function(spawner) {
        

        for(var name in Game.creeps) {
			var creep = Game.creeps[name];
			if(creep.memory.level != 'starter') {
				if(creep.ticksToLive <= 1500) {
					spawner.renewCreep(creep);
				}
			}
		}
	}
};

module.exports = buildingSpawner;