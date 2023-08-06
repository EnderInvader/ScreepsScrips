var roleRecycle = {
	//status: {
	//	idle: 0,
	//},

	/** @param {Creep} creep **/
	//statusState: function(creep) {
	//},

	/** @param {Creep} creep **/
	run: function(creep) {
		//this.memory(creep);
		//this.statusState(creep);

		/** @type {number} */
		//let status = creep.memory.status;

        creep.say("recycle");

		if (creep.store > 0) {
			let target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
				filter: (i) => (
								i.structureType == STRUCTURE_SPAWN ||
								i.structureType == STRUCTURE_EXTENSION ||
								i.structureType == STRUCTURE_STORAGE
							   ) &&
							   i.store.getFreeCapacity(RESOURCE_ENERGY) > 0
			});

			if (!target) target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: (i) => (
								i.structureType == STRUCTURE_CONTAINER ||
								i.structureType == STRUCTURE_STORAGE
							   ) &&
							   i.store.getFreeCapacity(RESOURCE_ENERGY) > 0
			});

			if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(target);
			}
		}
		else {
			let spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
			creep.moveTo(spawn);
		}
	},
	
	// checks if the room needs to spawn a creep
	/** 
	 * @param {Room} room
	 * @param {StructureSpawn} spawn 
	 */
	spawn: function(room, spawn) {
		return false;
	},

	// setup memory
	/** @param {Creep} creep **/
	//memory: function(creep) {
	//	//if (!creep.memory.status) {
	//	//	creep.memory.status = this.status.working;
	//	//}
	//}
};

module.exports = roleRecycle;