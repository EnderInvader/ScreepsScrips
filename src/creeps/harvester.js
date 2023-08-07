var roleHarvester = {

	/** @param {Creep} creep **/
	run: function(creep) {
		if (creep.ticksToLive < 50) creep.memory.role = 'recycle';

		if (creep.store.getFreeCapacity() > 0) {
			var sources = creep.room.find(FIND_SOURCES);
			if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[0]);
			}
		}
		else {
			if (creep.transfer(creep.room.find(FIND_MY_SPAWNS)[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(creep.room.find(FIND_MY_SPAWNS)[0]);
			}
		}
	},
	
	// checks if the room needs to spawn a creep
	/** 
	 * @param {Room} room
	 * @param {StructureSpawn} spawn 
	 */
	spawn: function(room, spawn) {
		var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == room.name);

		if (harvesters.length < 2) {
			return true;
		}
	},

	// returns an object with the data to spawn a new creep
	/** @param {Room} room **/
	spawnData: function(room) {
			let name = 'Harvester' + Game.time;
			let body = [WORK, CARRY, MOVE];
			let memory = {role: 'harvester'};
		
			return {name, body, memory};
	}
};

module.exports = roleHarvester;