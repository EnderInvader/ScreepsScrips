var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleRangedDefender= require('role.rangeddefender');
var buildingSpawner = require('building.spawner');
var buildingTower = require('building.tower');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if(harvesters.length < 4) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
		Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE],     newName,     { memory: { role: 'harvester' , level: 'big' } } );
    }
	
	var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    if(builders.length < 3) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
		Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE],     newName,     { memory: { role: 'builder' , level: 'big' } } );
    }
	
	var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if(upgraders.length < 2) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
		Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE],     newName,     { memory: { role: 'upgrader' , level: 'big' } } );
    }
	
	var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    if(repairers.length < 1) {
        var newName = 'Repairer' + Game.time;
        console.log('Spawning new repairer: ' + newName);
		Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE],     newName,     { memory: { role: 'repairer' , level: 'big' } } );
    }
	
	var rangeddefenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'rangeddefender');
    if(rangeddefenders.length < 2) {
        var newName = 'RangedDefender' + Game.time;
        console.log('Spawning new ranged defender: ' + newName);
		Game.spawns['Spawn1'].spawnCreep( [TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE],     newName,     { memory: { role: 'rangeddefender' , level: 'medium' } } );
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
            Game.spawns['Spawn1'].spawning.setDirections([TOP]);
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
		var roomName = Game.spawns[name].room;
        buildingTower.run(roomName);
        console.log(roomName);
    }
}