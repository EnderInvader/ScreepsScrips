var roleStaticManager = {
	status: {
		idle: 0,
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
		if (creep.ticksToLive < 30) creep.memory.role = 'recycle';

		this.memory(creep);
		//this.statusState(creep);

		/** @type {number} */
		//let status = creep.memory.status;

		let target = creep.room.getPositionAt(creep.memory.target.x, creep.memory.target.y);
		if (!target.isEqualTo(creep.pos)) {
			creep.moveTo(target);
			return;
		}

		// TODO: staticManager logic
	},
	
	// checks if the room needs to spawn a creep
	/** 
	 * @param {Room} room
	 * @param {StructureSpawn} spawn 
	 */
	spawn: function(room, spawn) {
		var staticManagers = _.filter(Game.creeps, (creep) => creep.memory.role == 'staticManager' && creep.room.name == room.name);

		if (Game.flags[`[${room.name}]RapidFillCluster`]) {
			if (room.controller.level >= 4) {
				if (staticManagers.length < 4) return true;
			}
			else {
				if (staticManagers.length < 2) return true;
			}
		}
	},

	// returns an object with the data to spawn a new creep
	/** @param {Room} room **/
	spawnData: function(room) {
		let name = 'StaticManager' + Game.time;
		let memory = {role: 'staticManager'};
		let body = [CARRY,CARRY,CARRY,CARRY,MOVE]; // 250

		//let level = room.controller.level;
		//let energy = room.energyCapacityAvailable;

		//if (level >= 1 && energy >= 250)  body = [CARRY,CARRY,CARRY,CARRY,MOVE]; // 250
		
		return {name, body, memory};
	},

	// setup memory
	/** @param {Creep} creep **/
	memory: function(creep) {
		if (!creep.memory.status) {
			creep.memory.status = this.status.working;
		}

		if (!creep.memory.target) {
			const pos = Game.flags[`[${creep.room.name}]RapidFillCluster`].pos;

			/** @type {{x: number; y: number;}[]} */
			let targets = [
				{x: pos.x - 1, y: pos.y + 1},
				{x: pos.x + 1, y: pos.y + 1},
				{x: pos.x - 1, y: pos.y - 1},
				{x: pos.x + 1, y: pos.y - 1},
			];
			
			var staticManagers = _.filter(Game.creeps, (search) => search.memory.role == 'staticManager' && search.room.name == creep.room.name && search.name != creep.name);
			for (let staticManager of staticManagers) {
				const index = targets.findIndex(pos => _.isEqual(pos, staticManager.memory.target));
				if (index > -1) targets.splice(index, 1);
			}

			targets.sort((a, b) => creep.pos.findPathTo(a.x, a.y, {ignoreCreeps: true}).length - creep.pos.findPathTo(b.x, b.y, {ignoreCreeps: true}).length);
			creep.memory.target = targets[0];
		}
	}
};

module.exports = roleStaticManager;