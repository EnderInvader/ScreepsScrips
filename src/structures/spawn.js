var spawn = {

	/** @param {StructureSpawn} structure **/
	run: function(structure) {
		var recycles = _.filter(Game.creeps, (search) => search.memory.role == 'recycle' && search.room.name == structure.room.name && search.pos.isNearTo(structure.pos));
		recycles.sort((a, b) => a.ticksToLive - b.ticksToLive);
		
		if (structure.recycleCreep(recycles[0]) === OK) console.log(structure.room, 'Recycle', recycles[0].name);
	},
};

module.exports = spawn;