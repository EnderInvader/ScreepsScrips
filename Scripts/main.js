var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleRangedDefender= require('role.rangeddefender');
var buildingSpawner = require('building.spawner');
var buildingTower = require('building.tower');
var spawnHarvester = require('spawn.harvester');
var spawnUpgrader = require('spawn.upgrader');
var spawnBuilder = require('spawn.builder');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

	var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
	var rangeddefenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'rangeddefender');
	
	var spawns = Game.spawns;
	for(var name in spawns){
		spawn = spawns[name];
		var spawnHarvesters = spawnHarvester.spawnHarvester.run(spawn);
		console.log(spawnHarvesters);
		
		if(spawn.energy > 200){
		spawnUpgrader.run(spawn);
		}
		else if(spawn.energy > 200){
		spawnBuilder.spawnBuilder.run(spawn);
		}
	}
	
    /**else if(builders.length < 3) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
		Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],     newName,     { memory: { role: 'builder' , level: 4 } } );
    }**/
	if(spawn.energy > 200){
    if(repairers.length < 1) {
        var newName = 'Repairer' + Game.time;
        console.log('Spawning new repairer: ' + newName);
		Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],     newName,     { memory: { role: 'repairer' , level: 4 } } );
    }
	
	
    else if(rangeddefenders.length < 6) {
        var newName = 'RangedDefender' + Game.time;
        console.log('Spawning new ranged defender: ' + newName);
		Game.spawns['Spawn1'].spawnCreep( [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK],     newName,     { memory: { role: 'rangeddefender' , level: 4 } } );
}}
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
            Game.spawns['Spawn1'].spawning.setDirections([TOP_LEFT,TOP_RIGHT,BOTTOM_LEFT,BOTTOM_RIGHT]);
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
		if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
		if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
		if(creep.memory.role == 'rangeddefender') {
            roleRangedDefender.run(creep);
        }
    }
	
	for(var name in Game.spawns) {
		var spawn = Game.spawns[name];
        buildingSpawner.run(spawn);
		//var roomName = Game.spawns[name].room;
		//console.log(roomName);
        buildingTower.run();
    }
}