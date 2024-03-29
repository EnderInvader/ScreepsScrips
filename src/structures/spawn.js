var spawn = {

	/** @param {StructureSpawn} structure **/
	run: function(structure) {
		let recycles = _.filter(Game.creeps, (search) => search.memory.role == 'recycle' && search.room.name == structure.room.name && search.ticksToLive < 30 && search.store === 0 && search.pos.isNearTo(structure.pos));
		if (recycles.length === 0) _.filter(Game.creeps, (search) => search.memory.role == 'recycle' && search.room.name == structure.room.name && search.ticksToLive < 10 && search.pos.isNearTo(structure.pos));
		
		if (recycles.length > 1) recycles.sort((a, b) => a.ticksToLive - b.ticksToLive);
		if (recycles[0] && structure.recycleCreep(recycles[0]) === OK) console.log(structure.room, 'Recycle', recycles[0].name);

		if (structure.spawning && Game.flags[`[${structure.room.name}]RapidFillCluster`]) {
			const flag = Game.flags[`[${structure.room.name}]RapidFillCluster`];

			if (Game.creeps[structure.spawning.name].memory.role === 'staticManager' && structure.pos.isNearTo(Game.creeps[structure.spawning.name].memory.target.x, Game.creeps[structure.spawning.name].memory.target.y)) {
				structure.spawning.setDirections([structure.pos.getDirectionTo(Game.creeps[structure.spawning.name].memory.target.x, Game.creeps[structure.spawning.name].memory.target.y)]);
			}
			else {
				switch (structure.pos.getDirectionTo(flag.pos)) {
					case TOP:
						structure.spawning.setDirections([BOTTOM,BOTTOM_LEFT,BOTTOM_RIGHT]);
						break;
						
					case BOTTOM_RIGHT:
						structure.spawning.setDirections([LEFT,BOTTOM_LEFT,TOP_LEFT]);
						break;
						
					case BOTTOM_LEFT:
						structure.spawning.setDirections([RIGHT,BOTTOM_RIGHT,TOP_RIGHT]);
						break;
				
					default:
						break;
				}
			}
		}
	},
};

module.exports = spawn;