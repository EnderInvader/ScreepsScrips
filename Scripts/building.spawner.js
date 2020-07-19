var buildingSpawner = {

    run: function(spawner) {
        var room = spawner.room;
		var controller = room.controller;
		var controllerLevel = controller.level;

        for(var name in Game.creeps) {
			var creep = Game.creeps[name];
			if(creep.my == true) { //controllerLevel   creep.memory.level >= controllerLevel - 1 && 
				if(creep.ticksToLive <= 1500) {
				    //console.log(spawner.renewCreep(creep))
				    spawner.renewCreep(creep);
				}
			}
			
		    if(creep.memory.role == 'recycle')
		    {
		        spawner.recycleCreep(creep);
		    }
		}
	}
};

module.exports = buildingSpawner;