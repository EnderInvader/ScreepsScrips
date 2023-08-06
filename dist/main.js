/* This header is placed at the beginning of the output file and defines the
	special `__require`, `__getFilename`, and `__getDirname` functions.
*/
(function() {
	/* __modules is an Array of functions; each function is a module added
		to the project */
var __modules = {},
	/* __modulesCache is an Array of cached modules, much like
		`require.cache`.  Once a module is executed, it is cached. */
	__modulesCache = {},
	/* __moduleIsCached - an Array of booleans, `true` if module is cached. */
	__moduleIsCached = {};
/* If the module with the specified `uid` is cached, return it;
	otherwise, execute and cache it first. */
function __require(uid, parentUid) {
	if(!__moduleIsCached[uid]) {
		// Populate the cache initially with an empty `exports` Object
		__modulesCache[uid] = {"exports": {}, "loaded": false};
		__moduleIsCached[uid] = true;
		if(uid === 0 && typeof require === "function") {
			require.main = __modulesCache[0];
		} else {
			__modulesCache[uid].parent = __modulesCache[parentUid];
		}
		/* Note: if this module requires itself, or if its depenedencies
			require it, they will only see an empty Object for now */
		// Now load the module
		__modules[uid].call(this, __modulesCache[uid], __modulesCache[uid].exports);
		__modulesCache[uid].loaded = true;
	}
	return __modulesCache[uid].exports;
}
/* This function is the replacement for all `__filename` references within a
	project file.  The idea is to return the correct `__filename` as if the
	file was not concatenated at all.  Therefore, we should return the
	filename relative to the output file's path.

	`path` is the path relative to the output file's path at the time the
	project file was concatenated and added to the output file.
*/
function __getFilename(path) {
	return require("path").resolve(__dirname + "/" + path);
}
/* Same deal as __getFilename.
	`path` is the path relative to the output file's path at the time the
	project file was concatenated and added to the output file.
*/
function __getDirname(path) {
	return require("path").resolve(__dirname + "/" + path + "/../");
}
/********** End of header **********/
/********** Start module 0: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\main.js **********/
__modules[0] = function(module, exports) {
let creepLogic = __require(1,0);
let roomLogic = __require(2,0);
let structureLogic = __require(3,0);
let prototypes = __require(4,0);


global.resetRoomMem = function(name = undefined) {
	if (name) {
		if (Memory.rooms[name]) delete Memory.rooms[name];
	}
	else {
		Memory.rooms = {};
	}
	
	return true;
}


module.exports.loop = function() {
	console.log('--------------', Game.time, Game.cpu.bucket, '--------------');
	for (var name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name];
			console.log('Clearing non-existing creep memory:', name);
		}
	}
	/** @type {Room[]} */
	let myRooms = _.filter(Game.rooms, r => r.controller && r.controller.level > 0 && r.controller.my);
	_.forEach(myRooms, function (room) {
		roomLogic.main(room);

		let nukes = room.find(FIND_NUKES);
		_.forEach(nukes, function(nuke) {
			console.log(room, "NUKE", nuke.timeToLand, nuke.launchRoomName);
			if (nuke.timeToLand === 49950) Game.notify(`${room} NUKE ${nuke.timeToLand} ${nuke.launchRoomName}`);
		});
	});
	for (let name in Game.structures) {
		let structure = Game.structures[name];

		let structureType = structure.structureType;
		if (structureLogic[structureType]) {
			structureLogic[structureType].run(structure);
		}
		else {
			console.log('StructureType not found:', structureType);
		}
	}
	for (let name in Game.creeps) {
		let creep = Game.creeps[name];

		let role = creep.memory.role;
		if (creepLogic[role]) {
			creepLogic[role].run(creep);
		}
		else {
			console.log('Role not found:', role);
		}
	}

	if (Game.cpu.bucket == 10000) {
		if (Game.cpu.generatePixel() === OK) {
			console.log("[game] PixelGenerated", Game.resources.pixel + 1);
			Game.notify(`[game] PixelGenerated ${Game.resources.pixel + 1}`);
		}
	}
}
return module.exports;
}
/********** End of module 0: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\main.js **********/
/********** Start module 1: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\index.js **********/
__modules[1] = function(module, exports) {
let creepLogic = {
	recycle: __require(5,1),
	runner: __require(6,1),
	remoteMiner: __require(7,1),
	builder: __require(8,1),
	upgrader: __require(9,1),
}

module.exports = creepLogic;
return module.exports;
}
/********** End of module 1: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\index.js **********/
/********** Start module 2: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\room\index.js **********/
__modules[2] = function(module, exports) {
/**
 * @param {Room} room
 */
function roomMain(room) {
	roomLogic.evaluate(room);
	roomLogic.spawning(room);
	roomLogic.building(room);
}

let roomLogic = {
	main: roomMain,
	evaluate: __require(10,2),
	spawning: __require(11,2),
	building: __require(12,2),
}

module.exports = roomLogic;
return module.exports;
}
/********** End of module 2: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\room\index.js **********/
/********** Start module 3: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\structures\index.js **********/
__modules[3] = function(module, exports) {
let structureLogic = {
	[STRUCTURE_CONTROLLER]: __require(13,3),
	[STRUCTURE_SPAWN]: __require(14,3),
	[STRUCTURE_EXTENSION]: __require(15,3),
}

module.exports = structureLogic;
return module.exports;
}
/********** End of module 3: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\structures\index.js **********/
/********** Start module 4: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\prototypes\index.js **********/
__modules[4] = function(module, exports) {
let files = {
	room: __require(16,4),
	creep: __require(17,4),
}
return module.exports;
}
/********** End of module 4: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\prototypes\index.js **********/
/********** Start module 5: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\recycle.js **********/
__modules[5] = function(module, exports) {
var roleRecycle = {

	/** @param {Creep} creep **/

	/** @param {Creep} creep **/
	run: function(creep) {

		/** @type {number} */

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
	/** 
	 * @param {Room} room
	 * @param {StructureSpawn} spawn 
	 */
	spawn: function(room, spawn) {
		return false;
	},
	/** @param {Creep} creep **/
};

module.exports = roleRecycle;
return module.exports;
}
/********** End of module 5: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\recycle.js **********/
/********** Start module 6: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\runner.js **********/
__modules[6] = function(module, exports) {
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
		}
	},
	/** 
	 * @param {Room} room
	 * @param {StructureSpawn} spawn 
	 */
	spawn: function(room, spawn) {
		var runners = _.filter(Game.creeps, (creep) => creep.memory.role == 'runner' && creep.room.name == room.name);
		var remoteMiners = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteMiner' && creep.room.name == room.name);

		if (runners.length < remoteMiners.length) return true;
	},
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
return module.exports;
}
/********** End of module 6: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\runner.js **********/
/********** Start module 7: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\remoteMiner.js **********/
__modules[7] = function(module, exports) {
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
	/** @param {Creep} creep **/
	memory: function(creep) {
		if (!creep.memory.target) {
			/** @type {{x: number; y: number;}[]} */
			let targets = [...creep.room.memory.sourceSpots];
			
			var remoteMiners = _.filter(Game.creeps, (search) => search.memory.role == 'remoteMiner' && search.room.name == creep.room.name && search.name != creep.name);
			for (let miner of remoteMiners) {
				const index = targets.findIndex(pos => _.isEqual(pos, miner.memory.target));
				if (index > -1) targets.splice(index, 1);
			}

			targets.sort((a, b) => creep.pos.findPathTo(a.x, a.y, {ignoreCreeps: true}).length - creep.pos.findPathTo(b.x, b.y, {ignoreCreeps: true}).length);
			creep.memory.target = targets[0];
		}
	}
};

module.exports = roleRemoteMiner;
return module.exports;
}
/********** End of module 7: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\remoteMiner.js **********/
/********** Start module 8: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\builder.js **********/
__modules[8] = function(module, exports) {
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
	/** 
	 * @param {Room} room
	 * @param {StructureSpawn} spawn 
	 */
	spawn: function(room, spawn) {
		var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room.name == room.name);

		if (room.controller.level > 1 && builders.length < 4) return true;
	},
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
	/** @param {Creep} creep **/
	memory: function(creep) {
		if (!creep.memory.status) {
			creep.memory.status = this.status.working;
		}
	}
};

module.exports = roleBuilder;
return module.exports;
}
/********** End of module 8: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\builder.js **********/
/********** Start module 9: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\upgrader.js **********/
__modules[9] = function(module, exports) {
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
	/** 
	 * @param {Room} room
	 * @param {StructureSpawn} spawn 
	 */
	spawn: function(room, spawn) {
		var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == room.name);

		if (upgraders.length < 2) {
			return true;
		}
	},
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
	/** @param {Creep} creep **/
	memory: function(creep) {
		if (!creep.memory.status) {
			creep.memory.status = this.status.working;
		}
	}
};

module.exports = roleUpgrader;
return module.exports;
}
/********** End of module 9: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\upgrader.js **********/
/********** Start module 10: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\room\evaluate.js **********/
__modules[10] = function(module, exports) {
let creepLogic = __require(1,10);
let creepTypes = _.keys(creepLogic);

/**
 * @param {Room} room
 */
function evaluateRoom(room) {
	if (JSON.stringify(room.memory) != '{}') return;
	console.log(room, "Evaluate");

	let sources = [];
	_.forEach(room.find(FIND_SOURCES), source => _.forEach(emptyTerrain(room, source.pos), pos => sources.push(pos)));

	room.memory.sourceSpots = sources;
}

/**
 * @param {Room} room
 * @param {RoomPosition} pos
 */
function emptyTerrain(room, pos) {
	const positions = [
		{x: pos.x + 1, y: pos.y + 1},
		{x: pos.x + 1, y: pos.y - 1},
		{x: pos.x - 1, y: pos.y + 1},
		{x: pos.x - 1, y: pos.y - 1},
		{x: pos.x    , y: pos.y + 1},
		{x: pos.x    , y: pos.y - 1},
		{x: pos.x + 1, y: pos.y    },
		{x: pos.x - 1, y: pos.y    },
	];

	return positions.filter(pos => room.getTerrain().get(pos.x, pos.y) === 0);
}

module.exports = evaluateRoom;
return module.exports;
}
/********** End of module 10: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\room\evaluate.js **********/
/********** Start module 11: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\room\spawning.js **********/
__modules[11] = function(module, exports) {
let creepLogic = __require(1,11);
let creepTypes = _.keys(creepLogic);

/** @param {Room} room **/
function spawnCreeps(room) {
	let spawns = room.find(FIND_MY_SPAWNS);
	if (spawns.length > 1) {
		spawns.sort((a,b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]);
	}
	let spawn = spawns[0];
	let creepTypeNeeded = _.find(creepTypes, function(type) {
		return creepLogic[type].spawn(room, spawn);
	});
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
return module.exports;
}
/********** End of module 11: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\room\spawning.js **********/
/********** Start module 12: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\room\building.js **********/
__modules[12] = function(module, exports) {
/** @param {Room} room **/
function buildStructures(room) {
}

module.exports = buildStructures;
return module.exports;
}
/********** End of module 12: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\room\building.js **********/
/********** Start module 13: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\structures\controller.js **********/
__modules[13] = function(module, exports) {
var controller = {

	/** @param {Structure} structure **/
	run: function(structure) {
	},
};

module.exports = controller;
return module.exports;
}
/********** End of module 13: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\structures\controller.js **********/
/********** Start module 14: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\structures\spawn.js **********/
__modules[14] = function(module, exports) {
var spawn = {

	/** @param {StructureSpawn} structure **/
	run: function(structure) {
		var recycles = _.filter(Game.creeps, (search) => search.memory.role == 'recycle' && search.room.name == structure.room.name && search.pos.isNearTo(structure.pos));
		recycles.sort((a, b) => a.ticksToLive - b.ticksToLive);
		
		if (structure.recycleCreep(recycles[0]) === OK) console.log(structure.room, 'Recycle', recycles[0].name);
	},
};

module.exports = spawn;
return module.exports;
}
/********** End of module 14: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\structures\spawn.js **********/
/********** Start module 15: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\structures\extension.js **********/
__modules[15] = function(module, exports) {
var extension = {

	/** @param {Structure} structure **/
	run: function(structure) {
	},
};

module.exports = extension;
return module.exports;
}
/********** End of module 15: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\structures\extension.js **********/
/********** Start module 16: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\prototypes\room.js **********/
__modules[16] = function(module, exports) {

return module.exports;
}
/********** End of module 16: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\prototypes\room.js **********/
/********** Start module 17: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\prototypes\creep.js **********/
__modules[17] = function(module, exports) {
Creep.prototype.sayHello = function sayHello() {
	this.say("Hello", true);
}
return module.exports;
}
/********** End of module 17: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\prototypes\creep.js **********/
/********** Footer **********/
if(typeof module === "object")
	module.exports = __require(0);
else
	return __require(0);
})();
/********** End of footer **********/
