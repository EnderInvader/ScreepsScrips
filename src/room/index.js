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
	evaluate: require('./evaluate'),
	spawning: require('./spawning'),
	building: require('./building'),
}

module.exports = roomLogic;