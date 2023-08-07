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
const roomLogic = __require(2,0);
let structureLogic = __require(3,0);
let prototypes = __require(4,0);
const { globalMemory } = __require(5,0);


global.resetRoomMem = function(name = undefined) {
	if (name) {
		if (Memory.rooms[name]) delete Memory.rooms[name];
	}
	else {
		delete Memory.rooms;
	}
	
	return true;
}

global.resetHostileROE = function(name = undefined) {
	if (name) {
		if (Memory.hostiles[name]) delete Memory.hostiles[name];
	}
	else {
		delete Memory.hostiles;
	}
	
	return true;
}


function placeFlags() {
	_.forEach(Game.flags, function(flag) {
		if (flag.name.toLowerCase().startsWith('[place]')) {
			let flagName = flag.name.toLowerCase().replace('[place]', `[${flag.room.name}]`);
			flag.room.createFlag(flag.pos, flagName);
			console.log(flag.room, "Flag", flagName);
		}
	});
}


module.exports.loop = function() {
	console.log('--------------', Game.time, Game.cpu.bucket, '--------------');
	for (var name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name];
			console.log('Clearing non-existing creep memory:', name);
		}
	}

	globalMemory();
	/** @type {Room[]} */
	let myRooms = _.filter(Game.rooms, r => r.controller && r.controller.level > 0 && r.controller.my);
	_.forEach(myRooms, function (room) {
		if (room.controller.safeMode) {
			console.log(room, "SafeMode", room.controller.safeMode);
			if (room.controller.safeMode === 450) Game.notify(`${room} SafeMode ${room.controller.safeMode}`);
			else if (room.controller.safeMode === 50) Game.notify(`${room} SafeMode ${room.controller.safeMode}`);
		}

		let nukes = room.find(FIND_NUKES);
		_.forEach(nukes, function(nuke) {
			console.log(room, "NUKE", nuke.timeToLand, nuke.launchRoomName);
			if (nuke.timeToLand === 49950) Game.notify(`${room} NUKE ${nuke.timeToLand} ${nuke.launchRoomName}`);
			else if (nuke.timeToLand === 450) Game.notify(`${room} NUKE ${nuke.timeToLand} ${nuke.launchRoomName}`);
			else if (nuke.timeToLand === 50) Game.notify(`${room} NUKE ${nuke.timeToLand} ${nuke.launchRoomName}`);
		});

		roomLogic(room);
	});
	placeFlags();
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

	if (Game.cpu.bucket >= 10000) {
		if (Game.cpu.generatePixel() === OK) {
			console.log("[global] PixelGenerated", Game.resources.pixel + 1);
			if ((Game.resources.pixel + 1) % 100 === 0) Game.notify(`[global] PixelGenerated % 100 ${Game.resources.pixel + 1}`);
		}
	}
}
return module.exports;
}
/********** End of module 0: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\main.js **********/
/********** Start module 1: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\index.js **********/
__modules[1] = function(module, exports) {
let creepLogic = {
	recycle: __require(6,1),
	defender: __require(7,1),
	staticManager: __require(8,1),
	runner: __require(9,1),
	remoteMiner: __require(10,1),
	builder: __require(11,1),
	upgrader: __require(12,1),
}

module.exports = creepLogic;
return module.exports;
}
/********** End of module 1: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\index.js **********/
/********** Start module 2: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\room\index.js **********/
__modules[2] = function(module, exports) {
const spawning = __require(13,2);
const building = __require(14,2);
const { roomMemory } = __require(15,2);

/**
 * @param {Room} room
 */
function roomLogic(room) {
	roomMemory(room);
	spawning(room);
	building(room);
}

module.exports = roomLogic;
return module.exports;
}
/********** End of module 2: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\room\index.js **********/
/********** Start module 3: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\structures\index.js **********/
__modules[3] = function(module, exports) {
let structureLogic = {
	[STRUCTURE_CONTROLLER]: __require(16,3),
	[STRUCTURE_SPAWN]: __require(17,3),
	[STRUCTURE_EXTENSION]: __require(18,3),
}

module.exports = structureLogic;
return module.exports;
}
/********** End of module 3: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\structures\index.js **********/
/********** Start module 4: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\prototypes\index.js **********/
__modules[4] = function(module, exports) {
let files = {
	room: __require(19,4),
	creep: __require(20,4),
}
return module.exports;
}
/********** End of module 4: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\prototypes\index.js **********/
/********** Start module 5: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\global.js **********/
__modules[5] = function(module, exports) {
const HostileROE = {
	Neutral:  "neutral",  // Defend
	Friendly: "friendly", // Passive
	Enemy:    "enemy",    // Attack
}

function globalMemory() {
	if (!Memory.hostiles) {
		console.log('[global]', "Memory", "Hostiles");

		let enemies = {
			"Invader": HostileROE.Enemy,
			"Source Keeper": HostileROE.Enemy,
		};

		Memory.hostiles = enemies;
	}
}

module.exports = { HostileROE, globalMemory };
return module.exports;
}
/********** End of module 5: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\global.js **********/
/********** Start module 6: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\recycle.js **********/
__modules[6] = function(module, exports) {
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
/********** End of module 6: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\recycle.js **********/
/********** Start module 7: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\defender.js **********/
__modules[7] = function(module, exports) {
const { HostileROE } = __require(5,7);
const { AlertStatus } = __require(15,7);

var roleDefender = {
	status: {
		idle:    0,
		active:  1,
		retreat: 2,
	},

	/** @param {Creep} creep **/
	statusState: function(creep) {

		switch (creep.room.memory.alertStatus) {
			case AlertStatus.Defensive:
				creep.memory.status = this.status.active;
				break;
		
			default:
				creep.memory.status = this.status.idle;
				break;
		}
	},

	/** @param {Creep} creep **/
	run: function(creep) {
		if (creep.ticksToLive < 50) creep.memory.role = 'recycle';

		this.memory(creep);
		this.statusState(creep);

		/** @type {number} */
		let status = creep.memory.status;

		creep.heal(creep);

		if (status == this.status.idle) {
			const found = creep.pos.findInRange(FIND_STRUCTURES, 3)[0];
			if (found) {
				let moves = [TOP, TOP_RIGHT, RIGHT, BOTTOM_RIGHT, BOTTOM, BOTTOM_LEFT, LEFT, TOP_LEFT];

				let defenders = _.filter(Game.creeps, (search) => search.memory.role == 'defender' && search.room.name == creep.room.name);
				_.forEach(defenders, function(defender) {
					const index = moves.indexOf(creep.pos.getDirectionTo(defender.pos));
					if (index > -1) {
						moves.splice(index, 1);
					}
				});

				const move = _.sample(moves);
				creep.move(move);
			}
		}
		else if (status == this.status.retreat) {
		}
		else {
			let hostile = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
				filter: function(hostile) {
					return (Memory.hostiles[hostile.owner.username] != HostileROE.Friendly &&
						(hostile.getActiveBodyparts(ATTACK) > 0 ||
						 hostile.getActiveBodyparts(RANGED_ATTACK) > 0 ||
						 hostile.getActiveBodyparts(HEAL) > 0)
					);
				}
			});
			if (!hostile) hostile = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
				filter: function(hostile) {
					return (Memory.hostiles[hostile.owner.username] === HostileROE.Enemy);
				}
			});
			
			if (hostile) if (creep.rangedAttack(hostile) === ERR_NOT_IN_RANGE) creep.moveTo(hostile);
		}
	},
	/** 
	 * @param {Room} room
	 * @param {StructureSpawn} spawn 
	 */
	spawn: function(room, spawn) {
		if (room.controller.level < 2 || room.controller.safeMode > 500) return false;

		var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender' && creep.room.name == room.name);

		if (defenders.length < 2) {
			return true;
		}
	},
	/** @param {Room} room **/
	spawnData: function(room) {
			let name = 'Defender' + Game.time;
			let memory = {role: 'defender'};
			let body = [RANGED_ATTACK,HEAL,MOVE]; // 450
	
			let level = room.controller.level;
			let energy = room.energyCapacityAvailable;
	
			if (level >= 2 && energy >= 450)  body = [RANGED_ATTACK,HEAL,MOVE]; // 450
		
			return {name, body, memory};
	},
	/** @param {Creep} creep **/
	memory: function(creep) {
		if (!creep.memory.status) {
			creep.memory.status = this.status.idle;
		}
	}
};

module.exports = roleDefender;
return module.exports;
}
/********** End of module 7: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\defender.js **********/
/********** Start module 8: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\staticManager.js **********/
__modules[8] = function(module, exports) {
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

		/** @type {number} */

		let target = creep.room.getPositionAt(creep.memory.target.x, creep.memory.target.y);
		if (!target.isEqualTo(creep.pos)) {
			creep.moveTo(target);
			return;
		}
		
		/** @type {StructureSpawn | StructureExtension} */
		const needed = creep.pos.findInRange(FIND_MY_STRUCTURES, 1, {
			filter: (structure) => (
									structure.structureType == STRUCTURE_SPAWN ||
									structure.structureType == STRUCTURE_EXTENSION
								   ) &&
								   structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
		}).sort((a,b) => a.store[RESOURCE_ENERGY] - b.store[RESOURCE_ENERGY])[0];

		if (needed) {
			if (creep.store[RESOURCE_ENERGY] > 0) creep.transfer(needed, RESOURCE_ENERGY);
			else {
				/** @type {STRUCTURE_CONTAINER} */
				const container = creep.pos.findInRange(FIND_STRUCTURES, 1, {
					filter: (structure) => structure.structureType == STRUCTURE_CONTAINER &&
										   structure.store[RESOURCE_ENERGY] > 0
				}).sort((a,b) => a.store[RESOURCE_ENERGY] - b.store[RESOURCE_ENERGY])[0];

				if (container) creep.withdraw(container, RESOURCE_ENERGY);
			}
		}
	},
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
			else if (room.controller.level > 1) {
				if (staticManagers.length < 2) return true;
			}
		}
	},
	/** @param {Room} room **/
	spawnData: function(room) {
		let name = 'StaticManager' + Game.time;
		let memory = {role: 'staticManager'};
		let body = [CARRY,CARRY,CARRY,CARRY,MOVE]; // 250
		
		return {name, body, memory};
	},
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
return module.exports;
}
/********** End of module 8: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\staticManager.js **********/
/********** Start module 9: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\runner.js **********/
__modules[9] = function(module, exports) {
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
				filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
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
/********** End of module 9: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\runner.js **********/
/********** Start module 10: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\remoteMiner.js **********/
__modules[10] = function(module, exports) {
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
return module.exports;
}
/********** End of module 10: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\remoteMiner.js **********/
/********** Start module 11: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\builder.js **********/
__modules[11] = function(module, exports) {
const roleUpgrader = __require(12,11);

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
			let target = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
			if (target) {
				if (creep.build(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target);
				}
			}
			else {
				roleUpgrader.run(creep);
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
/********** End of module 11: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\builder.js **********/
/********** Start module 12: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\upgrader.js **********/
__modules[12] = function(module, exports) {
const { ControllerSigns } = __require(15,12);

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
			const sign = ControllerSigns[creep.room.memory.type];
			if (!creep.room.controller.sign || creep.room.controller.sign.text != sign) {
				creep.signController(creep.room.controller, sign);
			}

			creep.upgradeController(creep.room.controller);
			creep.moveTo(creep.room.controller);
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
/********** End of module 12: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\creeps\upgrader.js **********/
/********** Start module 13: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\room\spawning.js **********/
__modules[13] = function(module, exports) {
let creepLogic = __require(1,13);
let creepTypes = _.keys(creepLogic);
const { AlertStatus } = __require(15,13);

/** @param {Room} room **/
function spawnCreeps(room) {
	let spawns = room.find(FIND_MY_SPAWNS, {
		filter: function(spawn) {
			return !spawn.spawning;
		}
	});
	if (spawns.length > 1) {
		spawns.sort((a,b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]);
	}
	let spawn = spawns[0];
	if (!spawn) return;

	let creepTypeNeeded;
	if (room.memory.alertStatus[0] === AlertStatus.Defensive) creepTypeNeeded = "defender";
	else {
		creepTypeNeeded = _.find(creepTypes, function(type) {
			return creepLogic[type].spawn(room, spawn);
		});
	}
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
/********** End of module 13: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\room\spawning.js **********/
/********** Start module 14: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\room\building.js **********/
__modules[14] = function(module, exports) {
// 0 - TODO: desc
const RapidFillCluster = {
	[STRUCTURE_SPAWN]:[
		{x: 0,y: 2,p: 0},
		{x:-2,y:-1,p: 1},
		{x: 2,y:-1,p: 2},
	],
	[STRUCTURE_EXTENSION]:[
		{x:-1,y: 2,p: 0},
		{x: 1,y: 2,p: 1},
		{x: 0,y: 1,p: 2},
		{x:-1,y: 0,p: 3},
		{x: 1,y: 0,p: 4},
		{x:-2,y: 2,p: 5},
		{x:-2,y: 1,p: 6},
		{x: 2,y: 2,p: 7},
		{x: 2,y: 1,p: 8},
		{x: 0,y:-1,p: 9},
		{x: 0,y:-2,p:10},
		{x:-1,y:-2,p:11},
		{x:-2,y:-2,p:12},
		{x: 1,y:-2,p:13},
		{x: 2,y:-2,p:14},
	],
	[STRUCTURE_CONTAINER]:[
		{x:-2,y: 0,p: 0},
		{x: 2,y: 0,p: 1},
	],
	[STRUCTURE_LINK]:[
		{x: 0,y: 0,p: 0},
	],
}
const AnchorCluster = {
	[STRUCTURE_TERMINAL]:[
		{x:-1,y: 0,p: 0}
	],
	[STRUCTURE_LINK]:[
		{x:-1,y: 1,p: 0}
	],
	[STRUCTURE_NUKER]:[
		{x: 0,y:-1,p: 0}
	],
	[STRUCTURE_STORAGE]:[
		{x:-1,y:-1,p: 0}
	],
	[STRUCTURE_EXTENSION]:[
		{x: 1,y: 0,p: 0},
		{x: 1,y:-1,p: 1}
	],
	[STRUCTURE_FACTORY]:[
		{x: 0,y: 1,p: 0}
	],
}
const ExtensionCluster = {
	[STRUCTURE_EXTENSION]:[
		{x: 0,y: 0,p: 0},
		{x:-1,y: 0,p: 1},
		{x: 0,y: 1,p: 2},
		{x: 0,y:-1,p: 3},
		{x: 1,y: 0,p: 4},
	],
	[STRUCTURE_ROAD]:[
		{x:-1,y:-1,p: 0},
		{x:-1,y: 1,p: 1},
		{x: 1,y: 1,p: 2},
		{x: 1,y:-1,p: 3},
		{x:-2,y: 0,p: 4},
		{x: 0,y:-2,p: 5},
		{x: 0,y: 2,p: 6},
		{x: 2,y: 0,p: 7},
	],
}
const LabCluster = {
	[STRUCTURE_LAB]:[
		{x: 0,y: 1,p: 0},
		{x: 1,y: 0,p: 1},
		{x: 1,y: 1,p: 2},
		{x:-1,y: 0,p: 3},
		{x: 0,y:-1,p: 4},
		{x:-1,y:-1,p: 5},
		{x:-1,y: 2,p: 6},
		{x:-2,y: 1,p: 7},
		{x: 0,y: 2,p: 8},
		{x:-2,y: 0,p: 9},
	],
	[STRUCTURE_ROAD]:[
		{x: 0,y: 0,p: 0},
		{x:-1,y: 1,p: 1},
		{x:-2,y: 2,p: 2},
		{x: 1,y:-1,p: 3},
	],
}

/**
 * @param {Room} room
 * @param {number} structureType
 * @returns {{x:number,y:number}} Structure of structureType to build
 */
function buildPriority(room, structureType) {
	let build;

	const Flag_RapidFillCluster = Game.flags[`[${room.name}]RapidFillCluster`];
	if (Flag_RapidFillCluster) {
		_.forEach(RapidFillCluster[structureType], function(pos) {
			const structure = room.lookForAt(LOOK_STRUCTURES, pos.x + Flag_RapidFillCluster.pos.x, pos.y + Flag_RapidFillCluster.pos.y).filter(found => found.structureType === structureType)[0];
			if (structure) {
				return true;
			}
			
			const constructionSite = room.lookForAt(LOOK_CONSTRUCTION_SITES, pos.x + Flag_RapidFillCluster.pos.x, pos.y + Flag_RapidFillCluster.pos.y).filter(found => found.structureType === structureType)[0];
			if (constructionSite) {
				return true;
			}

			build = pos;
			return false;
		})
		if (build) return {x:build.x + Flag_RapidFillCluster.pos.x, y:build.y + Flag_RapidFillCluster.pos.y};
	}

	const Flag_AnchorCluster = Game.flags[`[${room.name}]AnchorCluster`];
	if (Flag_AnchorCluster) {
		_.forEach(AnchorCluster[structureType], function(pos) {
			const structure = room.lookForAt(LOOK_STRUCTURES, pos.x + Flag_AnchorCluster.pos.x, pos.y + Flag_AnchorCluster.pos.y).filter(found => found.structureType === structureType)[0];
			if (structure) {
				return true;
			}
			
			const constructionSite = room.lookForAt(LOOK_CONSTRUCTION_SITES, pos.x + Flag_AnchorCluster.pos.x, pos.y + Flag_AnchorCluster.pos.y).filter(found => found.structureType === structureType)[0];
			if (constructionSite) {
				return true;
			}

			build = pos;
			return false;
		})
		if (build) return {x:build.x + Flag_AnchorCluster.pos.x, y:build.y + Flag_AnchorCluster.pos.y};
	}

	const Flag_ExtensionCluster = Game.flags[`[${room.name}]ExtensionCluster`];
	if (Flag_ExtensionCluster) {
		_.forEach(ExtensionCluster[structureType], function(pos) {
			const structure = room.lookForAt(LOOK_STRUCTURES, pos.x + Flag_ExtensionCluster.pos.x, pos.y + Flag_ExtensionCluster.pos.y).filter(found => found.structureType === structureType)[0];
			if (structure) {
				return true;
			}
			
			const constructionSite = room.lookForAt(LOOK_CONSTRUCTION_SITES, pos.x + Flag_ExtensionCluster.pos.x, pos.y + Flag_ExtensionCluster.pos.y).filter(found => found.structureType === structureType)[0];
			if (constructionSite) {
				return true;
			}

			build = pos;
			return false;
		})
		if (build) return {x:build.x + Flag_ExtensionCluster.pos.x, y:build.y + Flag_ExtensionCluster.pos.y};
	}

	const Flag_LabCluster = Game.flags[`[${room.name}]LabCluster`];
	if (Flag_LabCluster) {
		_.forEach(LabCluster[structureType], function(pos) {
			const structure = room.lookForAt(LOOK_STRUCTURES, pos.x + Flag_LabCluster.pos.x, pos.y + Flag_LabCluster.pos.y).filter(found => found.structureType === structureType)[0];
			if (structure) {
				return true;
			}
			
			const constructionSite = room.lookForAt(LOOK_CONSTRUCTION_SITES, pos.x + Flag_LabCluster.pos.x, pos.y + Flag_LabCluster.pos.y).filter(found => found.structureType === structureType)[0];
			if (constructionSite) {
				return true;
			}

			build = pos;
			return false;
		})
		if (build) return {x:build.x + Flag_LabCluster.pos.x, y:build.y + Flag_LabCluster.pos.y};
	}
}

const structurePriority = [
	STRUCTURE_TOWER,
	STRUCTURE_SPAWN,
	STRUCTURE_EXTENSION,
	STRUCTURE_STORAGE,
	STRUCTURE_CONTAINER,
	STRUCTURE_LINK,
	STRUCTURE_TERMINAL,
	STRUCTURE_FACTORY,
	STRUCTURE_LAB,
	STRUCTURE_OBSERVER,
	STRUCTURE_NUKER,
	STRUCTURE_POWER_SPAWN,
	STRUCTURE_RAMPART,
	STRUCTURE_ROAD,
]

/** @param {Room} room **/
function buildStructures(room) {
	_.forEach(structurePriority, function(structureType) {
		if (room.controller.level < 3 && (structureType === STRUCTURE_TOWER)) return true;
		if (room.controller.level < 4 && (structureType === STRUCTURE_STORAGE)) return true;
		if (room.controller.level < 5 && (structureType === STRUCTURE_LINK)) return true;
		if (room.controller.level < 6 && (structureType === STRUCTURE_LAB || structureType === STRUCTURE_TERMINAL)) return true;
		if (room.controller.level < 7 && (structureType === STRUCTURE_SPAWN || structureType === STRUCTURE_FACTORY)) return true;
		if (room.controller.level < 8 && (structureType === STRUCTURE_OBSERVER || structureType === STRUCTURE_NUKER || structureType === STRUCTURE_POWER_SPAWN)) return true;

		const build = buildPriority(room, structureType);
		if (build) {
			const status = room.createConstructionSite(build.x, build.y, structureType);
			if (status === OK) console.log(room, 'Build', structureType, JSON.stringify(build));
			else if (status === ERR_INVALID_TARGET) console.log(room, 'Build', structureType, JSON.stringify(build), 'ERR_INVALID_TARGET');
			else if (status === ERR_RCL_NOT_ENOUGH) console.log(room, 'Build', structureType, JSON.stringify(build), 'ERR_RCL_NOT_ENOUGH');
			else console.log(room, 'Build', structureType, JSON.stringify(build), 'ERR', status);
		}
	})
}

module.exports = buildStructures;
return module.exports;
}
/********** End of module 14: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\room\building.js **********/
/********** Start module 15: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\room\roomMemory.js **********/
__modules[15] = function(module, exports) {
const { HostileROE } = __require(5,15);

const AlertStatus = {
	Passive:   "passive",   // Daily Business
	Defensive: "defensive", // Active Enemy
};

const RoomTypes = {
	Main: "main",
	Satellite: "satellite",
};

const ControllerSigns = {
	[RoomTypes.Main]: "🚀",
	[RoomTypes.Satellite]: "📡",
};


/**
 * @param {Room} room
 */
function roomMemory(room) {
	if (!room.memory.type) {
		console.log(room, "Memory", "Type");
		room.memory.type = RoomTypes.Main;
	}

	if (!room.memory.alertStatus) {
		console.log(room, "Memory", "AlertStatus");
		room.memory.alertStatus = [AlertStatus.Passive, 0];
	}

	if (!room.memory.sourceSpots) {
		console.log(room, "Memory", "SourceSpots");

		let sources = [];
		_.forEach(room.find(FIND_SOURCES), source => _.forEach(emptyTerrain(room, source.pos), pos => sources.push(pos)));

		room.memory.sourceSpots = sources;
	}


	const hostiles = room.find(FIND_HOSTILE_CREEPS, {
		filter: function(hostile) {
			if (Memory.hostiles[hostile.owner.username] === undefined) {
				console.log(room, "ROE", "NewHostile", hostile.owner.username);
				Memory.hostiles[hostile.owner.username] = HostileROE.Neutral;
			}

			return (Memory.hostiles[hostile.owner.username] != HostileROE.Friendly &&
				(hostile.getActiveBodyparts(ATTACK) > 0 ||
				 hostile.getActiveBodyparts(RANGED_ATTACK) > 0 ||
				 hostile.getActiveBodyparts(HEAL) > 0)
			);
		}
	});

	if (hostiles.length > 0) {
		room.memory.alertStatus = [AlertStatus.Defensive, 0];
		console.log(room, "ROE", AlertStatus.Defensive + '^', hostiles[0].owner.username);
		Game.notify(`${room} ROE ${AlertStatus.Defensive + '^'} ${hostiles[0].owner.username}`);
	}
	else if (room.memory.alertStatus[0] === AlertStatus.Defensive) {
		room.memory.alertStatus[1]++;
		console.log(room, "ROE", AlertStatus.Defensive + '_', room.memory.alertStatus[1]);
	}

	if (room.memory.alertStatus[0] === AlertStatus.Defensive && room.memory.alertStatus[1] > 100) {
		room.memory.alertStatus = [AlertStatus.Passive, 0];
	}
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

module.exports = { AlertStatus, RoomTypes, ControllerSigns, roomMemory };
return module.exports;
}
/********** End of module 15: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\room\roomMemory.js **********/
/********** Start module 16: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\structures\controller.js **********/
__modules[16] = function(module, exports) {
var controller = {

	/** @param {Structure} structure **/
	run: function(structure) {
	},
};

module.exports = controller;
return module.exports;
}
/********** End of module 16: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\structures\controller.js **********/
/********** Start module 17: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\structures\spawn.js **********/
__modules[17] = function(module, exports) {
var spawn = {

	/** @param {StructureSpawn} structure **/
	run: function(structure) {
		let recycles = _.filter(Game.creeps, (search) => search.memory.role == 'recycle' && search.room.name == structure.room.name && search.ticksToLive < 30 && search.store === 0 && search.pos.isNearTo(structure.pos));
		if (recycles.length === 0) _.filter(Game.creeps, (search) => search.memory.role == 'recycle' && search.room.name == structure.room.name && search.ticksToLive < 10 && search.pos.isNearTo(structure.pos));
		
		if (recycles.length > 1) recycles.sort((a, b) => a.ticksToLive - b.ticksToLive);
		if (recycles[0] && structure.recycleCreep(recycles[0]) === OK) console.log(structure.room, 'Recycle', recycles[0].name);

		if (structure.spawning && Game.flags[`[${structure.room.name}]RapidFillCluster`]) {
			const flag = Game.flags[`[${structure.room.name}]RapidFillCluster`];

			if (Game.creeps[structure.spawning.name].memory.role === 'staticManager' && structure.pos.isNearTo(Game.creeps[structure.spawning.name].memory.target.x, Game.creeps[structure.spawning.name].memory.target.y)) {
				structure.spawning.setDirections([structure.pos.getDirectionTo(Game.creeps[structure.spawning.name].memory.target.x, Game.creeps[structure.spawning.name].memory.target.y)]);
			}
			else {
				switch (structure.pos.getDirectionTo(flag.pos)) {
					case TOP:
						structure.spawning.setDirections([BOTTOM,BOTTOM_LEFT,BOTTOM_RIGHT]);
						break;
						
					case BOTTOM_RIGHT:
						structure.spawning.setDirections([LEFT,BOTTOM_LEFT,TOP_LEFT]);
						break;
						
					case BOTTOM_LEFT:
						structure.spawning.setDirections([RIGHT,BOTTOM_RIGHT,TOP_RIGHT]);
						break;
				
					default:
						break;
				}
			}
		}
	},
};

module.exports = spawn;
return module.exports;
}
/********** End of module 17: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\structures\spawn.js **********/
/********** Start module 18: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\structures\extension.js **********/
__modules[18] = function(module, exports) {
var extension = {

	/** @param {Structure} structure **/
	run: function(structure) {},
};

module.exports = extension;
return module.exports;
}
/********** End of module 18: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\structures\extension.js **********/
/********** Start module 19: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\prototypes\room.js **********/
__modules[19] = function(module, exports) {

return module.exports;
}
/********** End of module 19: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\prototypes\room.js **********/
/********** Start module 20: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\prototypes\creep.js **********/
__modules[20] = function(module, exports) {
Creep.prototype.sayHello = function sayHello() {
	this.say("Hello", true);
}
return module.exports;
}
/********** End of module 20: C:\Users\derek\OneDrive\Projects\ScreepsScrips\src\prototypes\creep.js **********/
/********** Footer **********/
if(typeof module === "object")
	module.exports = __require(0);
else
	return __require(0);
})();
/********** End of footer **********/
