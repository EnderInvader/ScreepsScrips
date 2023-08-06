var roleRunner = {
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
			var remoteMiner = Game.creeps[creep.memory.target];
			if (!remoteMiner && creep.memory.target) {
				console.log(creep.room, creep.name, 'Clearing remoteMiner target', creep.memory.target);
				delete creep.memory.target;
			}
			else if (remoteMiner && remoteMiner.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(remoteMiner);
			}
		}
		else if (status === this.status.working) {
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
								i.structureType == STRUCTURE_CONTAINER
							   ) &&
							   i.store.getFreeCapacity(RESOURCE_ENERGY) > 0
			});

			if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(target);
			}
		}

		if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
			let tombstones = creep.pos.findInRange(FIND_TOMBSTONES, 1, {
				filter: (i) => i.store[RESOURCE_ENERGY] > 0
			});
			_.forEach(tombstones, function(tombstone) {
				if (creep.withdraw(tombstone, RESOURCE_ENERGY) === OK) creep.memory.status = roleRunner.status.working;
			});

			let ruins = creep.pos.findInRange(FIND_RUINS, 1, {
				filter: (i) => i.store[RESOURCE_ENERGY] > 0
			});
			_.forEach(ruins, function(ruin) {
				if (creep.withdraw(ruin, RESOURCE_ENERGY) === OK) creep.memory.status = roleRunner.status.working;
			});
		}
	},
	
	// checks if the room needs to spawn a creep
	/** 
	 * @param {Room} room
	 * @param {StructureSpawn} spawn 
	 */
	spawn: function(room, spawn) {
		var runners = _.filter(Game.creeps, (creep) => creep.memory.role == 'runner' && creep.room.name == room.name);
		var remoteMiners = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteMiner' && creep.room.name == room.name);

		if (runners.length < remoteMiners.length) return true;
	},

	// returns an object with the data to spawn a new creep
	/** @param {Room} room **/
	spawnData: function(room) {
		let name = 'Runner' + Game.time;
		let memory = {role: 'runner'};
		let body = [CARRY,MOVE]; // 100

		let level = room.controller.level;
		let energy = room.energyCapacityAvailable;

		if (level >= 1 && energy >= 100)  body = [CARRY,MOVE]; // 100
		if (level >= 2 && energy >= 200)  body = [CARRY,CARRY,MOVE,MOVE]; // 200
		if (level >= 3 && energy >= 400)  body = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]; // 400
		if (level >= 4 && energy >= 600)  body = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; // 600
		if (level >= 5 && energy >= 800)  body = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; // 800
		if (level >= 6 && energy >= 1000) body = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; // 1000
		if (level >= 7 && energy >= 1200) body = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; // 1200
		if (level >= 8 && energy >= 2000) body = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; // 2000
		
		return {name, body, memory};
	},

	// setup memory
	/** @param {Creep} creep **/
	memory: function(creep) {
		if (!creep.memory.status) {
			creep.memory.status = this.status.working;
		}

		if (!creep.memory.target) {
			var targets = _.filter(Game.creeps, (search) => search.memory.role == 'remoteMiner' && search.room.name == creep.room.name);

			var runners = _.filter(Game.creeps, (search) => search.memory.role == 'runner' && search.room.name == creep.room.name && search.name != creep.name);
			for (let runner of runners) {
				const index = targets.findIndex(target => target.name === runner.memory.target);
				if (index > -1) targets.splice(index, 1);
			}

			if (targets.length === 0) {
				console.log(creep.room, creep.name, 'No remoteMiner target available');
				return;
			}

			targets.sort((a, b) => creep.pos.findPathTo(a.x, a.y, {ignoreCreeps: true}).length - creep.pos.findPathTo(b.x, b.y, {ignoreCreeps: true}).length);
			creep.memory.target = targets[0].name;
		}
	}
};

module.exports = roleRunner;