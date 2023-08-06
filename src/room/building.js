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

// 2 - TODO: desc
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

// 3 - TODO: desc
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

// 4 - TODO: desc
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
				//console.log(pos.p, structure.structureType, JSON.stringify(structure.pos));
				return true;
			}
			
			const constructionSite = room.lookForAt(LOOK_CONSTRUCTION_SITES, pos.x + Flag_RapidFillCluster.pos.x, pos.y + Flag_RapidFillCluster.pos.y).filter(found => found.structureType === structureType)[0];
			if (constructionSite) {
				//console.log(pos.p, constructionSite.structureType, JSON.stringify(constructionSite.pos));
				return true;
			}

			build = pos;
			//console.log(structureType, pos.p, ' x',pos.x,pos.x + Flag_RapidFillCluster.pos.x, ' y',pos.y,pos.y + Flag_RapidFillCluster.pos.y);
			return false;
		})
		if (build) return {x:build.x + Flag_RapidFillCluster.pos.x, y:build.y + Flag_RapidFillCluster.pos.y};
	}

	const Flag_AnchorCluster = Game.flags[`[${room.name}]AnchorCluster`];
	if (Flag_AnchorCluster) {
		_.forEach(AnchorCluster[structureType], function(pos) {
			const structure = room.lookForAt(LOOK_STRUCTURES, pos.x + Flag_AnchorCluster.pos.x, pos.y + Flag_AnchorCluster.pos.y).filter(found => found.structureType === structureType)[0];
			if (structure) {
				//console.log(pos.p, structure.structureType, JSON.stringify(structure.pos));
				return true;
			}
			
			const constructionSite = room.lookForAt(LOOK_CONSTRUCTION_SITES, pos.x + Flag_AnchorCluster.pos.x, pos.y + Flag_AnchorCluster.pos.y).filter(found => found.structureType === structureType)[0];
			if (constructionSite) {
				//console.log(pos.p, constructionSite.structureType, JSON.stringify(constructionSite.pos));
				return true;
			}

			build = pos;
			//console.log(structureType, pos.p, ' x',pos.x,pos.x + Flag_AnchorCluster.pos.x, ' y',pos.y,pos.y + Flag_AnchorCluster.pos.y);
			return false;
		})
		if (build) return {x:build.x + Flag_AnchorCluster.pos.x, y:build.y + Flag_AnchorCluster.pos.y};
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