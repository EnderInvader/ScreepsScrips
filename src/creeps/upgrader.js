var roleUpgrader = {
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
			if (creep.store[RESOURCE_ENERGY] > 0) creep.memory.status = this.status.working;
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
			var remoteMiners = _.filter(Game.creeps, (search) => search.memory.role == 'remoteMiner' && search.room.name == creep.room.name && search.store[RESOURCE_ENERGY] > 0);
			remoteMiners.sort((a, b) => creep.pos.findPathTo(a.pos.x, a.pos.y, {ignoreCreeps: true}).length - creep.pos.findPathTo(b.pos.x, b.pos.y, {ignoreCreeps: true}).length);
			if (remoteMiners[0].transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(remoteMiners[0]);
			}
		}
		else if (status === this.status.working) {
			if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
				creep.moveTo(creep.room.controller);
			}
		}
	},
	
	// checks if the room needs to spawn a creep
	/** 
	 * @param {Room} room
	 * @param {StructureSpawn} spawn 
	 */
	spawn: function(room, spawn) {
		var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == room.name);
		//console.log(room, 'Upgraders: ' + upgraders.length);

		if (upgraders.length < 2) {
			return true;
		}
	},

	// returns an object with the data to spawn a new creep
	/** @param {Room} room **/
	spawnData: function(room) {
		let name = 'Upgrader' + Game.time;
		let memory = {role: 'upgrader'};
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

module.exports = roleUpgrader;