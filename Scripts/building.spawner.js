var buildingSpawner = {

    run: function(spawner) {
        var room = spawner.room;
		var controller = room.controller;
		var controllerLevel = controller.level;

        for(var name in Game.creeps) {
			var creep = Game.creeps[name];
			if(creep.memory.level >= controllerLevel - 1 && creep.my == true) { //controllerLevel
				if(creep.ticksToLive <= 1500) {
					spawner.renewCreep(creep);
				}
			}
		    else if(creep.memory.level < controllerLevel - 1) //creep.memory.level < controllerLevel
		    {
		        spawner.recycleCreep(creep);
		    }
		}
	}
};

module.exports = buildingSpawner;