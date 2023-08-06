var roleRemoteMiner = {

	/** @param {Creep} creep **/
	run: function(creep) {
		if (creep.ticksToLive < 50) creep.memory.role = 'recycle';

		this.memory(creep);

		let target = creep.room.getPositionAt(creep.memory.target.x, creep.memory.target.y);
		if (!target.isEqualTo(creep.pos)) {
			creep.moveTo(target);
			return;
		}

		if (creep.store.getFreeCapacity() > 0) {
			if (creep.harvest(creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE)) == ERR_NOT_IN_RANGE) {
				console.log(creep.room, creep.name, "FAULT_SOURCE");
			}
			return;
		}
	},

	// checks if the room needs to spawn a creep
	/** 
	 * @param {Room} room
	 * @param {StructureSpawn} spawn 
	 */
	spawn: function(room, spawn) {
		var remoteMiners = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteMiner' && creep.room.name == room.name);

		const sourceKeepers = room.find(FIND_HOSTILE_CREEPS, {
			filter: function(enemy) {
				return enemy.owner.username === 'Source Keeper';
			}
		});

		/** @type {{x: number; y: number;}[]} */
		let targets = [...room.memory.sourceSpots];

		for (let keeper of sourceKeepers) {
			targets = targets.filter((target) => keeper.pos.getRangeTo(target.x, target.y) > 5);	
		}

		if (room.controller.level === 1 && remoteMiners.length >= 2) return false;
		if (remoteMiners.length < targets.length) return true;
	},

	// returns an object with the data to spawn a new creep
	/** @param {Room} room **/
	spawnData: function(room) {
		let name = 'RemoteMiner' + Game.time;
		let memory = {role: 'remoteMiner'};
		let body = [CARRY,WORK,MOVE]; // 200

		let level = room.controller.level;
		let energy = room.energyCapacityAvailable;

		if (level >= 1 && energy >= 200)  body = [CARRY,WORK,MOVE]; // 200
		if (level >= 2 && energy >= 350)  body = [CARRY,CARRY,WORK,WORK,MOVE]; // 350
		if (level >= 3 && energy >= 650)  body = [CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK,MOVE]; // 650
		if (level >= 4 && energy >= 950)  body = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,MOVE]; // 950
		if (level >= 5 && energy >= 1250) body = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE]; // 1250
		if (level >= 6 && energy >= 1550) body = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE]; // 1550
		if (level >= 7 && energy >= 1850) body = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE]; // 1850
		if (level >= 8 && energy >= 3050) body = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE]; // 3050
	
		return {name, body, memory};
	},

	// setup memory
	/** @param {Creep} creep **/
	memory: function(creep) {
		if (!creep.memory.target) {
			/** @type {{x: number; y: number;}[]} */
			let targets = [...creep.room.memory.sourceSpots];
			
			var remoteMiners = _.filter(Game.creeps, (search) => search.memory.role == 'remoteMiner' && search.room.name == creep.room.name && search.name != creep.name);
			for (let remoteMiner of remoteMiners) {
				const index = targets.findIndex(pos => _.isEqual(pos, remoteMiner.memory.target));
				if (index > -1) targets.splice(index, 1);
			}

			targets.sort((a, b) => creep.pos.findPathTo(a.x, a.y, {ignoreCreeps: true}).length - creep.pos.findPathTo(b.x, b.y, {ignoreCreeps: true}).length);
			creep.memory.target = targets[0];
		}
	}
};

module.exports = roleRemoteMiner;