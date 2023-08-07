const { HostileROE } = require("../global");

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