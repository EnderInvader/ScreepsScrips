var roleBuilder = {
	status: {
		idle: 0,
		filling: 1,
		working: 2,
	},

	/** @param {Creep} creep **/
	statusState: function(creep) {
		if (creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.status = this.status.filling;
		}
		else if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
			creep.memory.status = this.status.working;
		}
		else if (creep.memory.status === this.status.idle) {
			if (creep.store[RESOURCE_ENERGY] > 0) creep.memory.status = this.status.filling;
		}
	},

	/** @param {Creep} creep **/
	run: function(creep) {
		if (creep.ticksToLive < 50) creep.memory.role = 'recycle';

		this.memory(creep);
		this.statusState(creep);

		/** @type {number} */
		let status = creep.memory.status;

		if (status === this.status.filling) {
			let storage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: (i) => (
								i.structureType == STRUCTURE_CONTAINER ||
								i.structureType == STRUCTURE_STORAGE
							   ) &&
							   i.store[RESOURCE_ENERGY] > 0
			});

			if (storage) {
				if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(storage);
				}
			}
			else {
				var remoteMiners = _.filter(Game.creeps, (search) => search.memory.role == 'remoteMiner' && search.room.name == creep.room.name && search.store[RESOURCE_ENERGY] / search.store.getCapacity(RESOURCE_ENERGY) > 0.4);
				remoteMiners.sort((a, b) => creep.pos.findPathTo(a.pos.x, a.pos.y, {ignoreCreeps: true}).length - creep.pos.findPathTo(b.pos.x, b.pos.y, {ignoreCreeps: true}).length);
				//remoteMiners.sort((a, b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]);
				//remoteMiners.sort((a, b) => (creep.pos.findPathTo(a.pos.x, a.pos.y, {ignoreCreeps: true}).length - (10 * a.store[RESOURCE_ENERGY] / a.store.getCapacity[RESOURCE_ENERGY])) - (creep.pos.findPathTo(b.pos.x, b.pos.y, {ignoreCreeps: true}).length - (10 * b.store[RESOURCE_ENERGY] / b.store.getCapacity[RESOURCE_ENERGY])));
				if (remoteMiners[0] && remoteMiners[0].transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(remoteMiners[0]);
				}
			}
		}
		else if (status === this.status.working) {
			let target = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES);
			if (creep.build(target) == ERR_NOT_IN_RANGE) {
				creep.moveTo(target);
			}
		}
	},
	
	// checks if the room needs to spawn a creep
	/** 
	 * @param {Room} room
	 * @param {StructureSpawn} spawn 
	 */
	spawn: function(room, spawn) {
		var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room.name == room.name);
		//console.log(room, 'Builders: ' + builders.length);

		if (room.controller.level > 1 && builders.length < 4) return true;
	},

	// returns an object with the data to spawn a new creep
	/** @param {Room} room **/
	spawnData: function(room) {
		let name = 'Builder' + Game.time;
		let memory = {role: 'builder'};
		let body = [CARRY,WORK,MOVE]; // 200

		let level = room.controller.level;
		let energy = room.energyCapacityAvailable;

		if (level >= 1 && energy >= 200)  body = [CARRY,WORK,MOVE]; // 200
		if (level >= 2 && energy >= 400)  body = [CARRY,CARRY,WORK,WORK,MOVE,MOVE]; // 400
	
		return {name, body, memory};
	},

	// setup memory
	/** @param {Creep} creep **/
	memory: function(creep) {
		if (!creep.memory.status) {
			creep.memory.status = this.status.working;
		}
	}
};

module.exports = roleBuilder;