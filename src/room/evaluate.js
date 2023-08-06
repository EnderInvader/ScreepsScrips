let creepLogic = require("../creeps/index");
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