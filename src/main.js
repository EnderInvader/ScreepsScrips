let creepLogic = require('./creeps');
let roomLogic = require('./room');
let structureLogic = require('./structures');
let prototypes = require('./prototypes');


global.resetRoomMem = function(name = undefined) {
	if (name) {
		if (Memory.rooms[name]) delete Memory.rooms[name];
	}
	else {
		Memory.rooms = {};
	}
	
	return true;
}


function placeFlags() {
	_.forEach(Game.flags, function(flag) {
		if (flag.name.toLowerCase().startsWith('[place]')) {
			flag.name = flag.name.toLowerCase().replace('[place]', `[${flag.room.name}]`);
			console.log(flag.room, "Flag", flag.name);
		}
	});
}


module.exports.loop = function() {
	console.log('--------------', Game.time, Game.cpu.bucket, '--------------');

	// free up memory if creep no longer exists
	for (var name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name];
			console.log('Clearing non-existing creep memory:', name);
		}
	}

	// make a list of all of our rooms
	/** @type {Room[]} */
	let myRooms = _.filter(Game.rooms, r => r.controller && r.controller.level > 0 && r.controller.my);

	// roomLogic
	_.forEach(myRooms, function (room) {
		roomLogic.main(room);

		let nukes = room.find(FIND_NUKES);
		_.forEach(nukes, function(nuke) {
			console.log(room, "NUKE", nuke.timeToLand, nuke.launchRoomName);
			if (nuke.timeToLand === 49950) Game.notify(`${room} NUKE ${nuke.timeToLand} ${nuke.launchRoomName}`);
		});
	});

	// structureLogic
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
	
	// creepLogic
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
			console.log("[game] PixelGenerated", Game.resources.pixel + 1);
			if ((Game.resources.pixel + 1) % 100 === 0) Game.notify(`[game] PixelGenerated % 100 ${Game.resources.pixel + 1}`);
		}
	}
}