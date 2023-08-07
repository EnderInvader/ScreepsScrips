const { HostileROE } = require("../global");
const { AlertStatus } = require("../room/roomMemory");

var roleDefender = {
	status: {
		idle:    0,
		active:  1,
		retreat: 2,
	},

	/** @param {Creep} creep **/
	statusState: function(creep) {
		// TODO: Retreat on low health

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
			// TODO: retreat
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
	
	// checks if the room needs to spawn a creep
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

	// returns an object with the data to spawn a new creep
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

	// setup memory
	/** @param {Creep} creep **/
	memory: function(creep) {
		if (!creep.memory.status) {
			creep.memory.status = this.status.idle;
		}
	}
};

module.exports = roleDefender;