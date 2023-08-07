const spawning = require('./spawning');
const building = require('./building');
const { roomMemory } = require('./roomMemory');

/**
 * @param {Room} room
 */
function roomLogic(room) {
	roomMemory(room);
	spawning(room);
	building(room);
}

module.exports = roomLogic;