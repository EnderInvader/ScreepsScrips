let creepLogic = require("../creeps/index");
let creepTypes = _.keys(creepLogic);

/** @param {Room} room **/
function spawnCreeps(room) {

	// find the first or 0th spawn in the room
	let spawns = room.find(FIND_MY_SPAWNS);
	if (spawns.length > 1) {
		spawns.sort((a,b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]);
	}
	let spawn = spawns[0];

	// find a creep type that returns true for the .spawn() function
	let creepTypeNeeded = _.find(creepTypes, function(type) {
		return creepLogic[type].spawn(room, spawn);
	});

	// get the data for spawning a new creep of creepTypeNeeded
	let creepSpawnData = creepLogic[creepTypeNeeded] && creepLogic[creepTypeNeeded].spawnData(room);

	if (creepSpawnData) {
		let status = spawn.spawnCreep(creepSpawnData.body, creepSpawnData.name, {dryRun: true});
		switch (status) {
			case OK:
				spawn.spawnCreep(creepSpawnData.body, creepSpawnData.name, {memory: creepSpawnData.memory});
				console.log(room, 'Spawn', creepTypeNeeded, 'OK');
				break;

			case ERR_BUSY:
				console.log(room, 'Spawn', creepTypeNeeded, 'ERR_BUSY');
				break;

			case ERR_NOT_ENOUGH_ENERGY:
				console.log(room, 'Spawn', creepTypeNeeded, 'ERR_NOT_ENOUGH_ENERGY');
				break;
		
			default:
				console.log(room, 'Spawn', creepTypeNeeded, 'ERR', status);
				break;
		}
	}
}

module.exports = spawnCreeps;