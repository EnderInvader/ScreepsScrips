var roleHarvester = require('role.harvester');
var roleCHarvester = require('role.charvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleRangedDefender = require('role.rangeddefender');
var roleHauler = require('role.hauler');
var roleHealer = require('role.healer');
var roleClaimer = require('role.claimer');
var roleRecycled = require('role.recycled');
var buildingSpawner = require('building.spawner');
var buildingTower = require('building.tower');
var spawnHarvester = require('spawn.harvester');
var spawnUpgrader = require('spawn.upgrader');
var spawnBuilder = require('spawn.builder');
var spawnRepairer = require('spawn.repairer');
var spawnRangedDefender = require('spawn.rangedDefender');
var spawnHauler = require('spawn.hauler');
var spawnHealer = require('spawn.healer');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

	var Slevel = 3;//1-3
	var spawns = Game.spawns;
	for(var name in spawns){
		spawn = spawns[name];
		
		const target = spawn.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function(object) {
                return object.hits < object.hitsMax;
            }
        });
        if (target && _.filter(Game.creeps, (creep) => creep.memory.role == 'healer') == 0) {
            console.log('Spawn Healer');
            var spawnHealers = spawnHealer.spawnHealer.run(spawn, 1);
        }
        
		
		else if (spawn.room.energyAvailable >= 200 && !spawn.spawning) {
			var spawnHarvesters = spawnHarvester.spawnHarvester.run(spawn, Slevel);
			
			if(spawnHarvesters == -99){
			    var spawnBuilders = spawnBuilder.spawnBuilder.run(spawn, Slevel);
				
				if(spawnBuilders == -99){
				    var spawnRepairers = spawnRepairer.spawnRepairer.run(spawn, Slevel);
					
					if(spawnRepairers == -99){
					    var spawnHaulers = spawnHauler.spawnHauler.run(spawn, Slevel);
						
						if(spawnHaulers == -99){
						    var spawnUpgraders = spawnUpgrader.spawnUpgrader.run(spawn, Slevel);
							
							if(spawnUpgraders == -99){
							    var spawnRangedDefenders = spawnRangedDefender.spawnRangedDefender.run(spawn, Slevel);
						    }
						}
					}
				}
			}
		}
	}
	
    /**else if(builders.length < 3) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
		Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],     newName,     { memory: { role: 'builder' , level: 4 } } );
    }
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
	}}**/
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
            Game.spawns['Spawn1'].spawning.setDirections([TOP_RIGHT,TOP_LEFT,TOP,RIGHT,BOTTOM_RIGHT]);
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        var controllerlevel = creep.room.controller.level;
        
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep, controllerlevel);
        }
        else if(creep.memory.role == 'charvester') {
            roleCHarvester.run(creep, controllerlevel);
        }
        else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep, controllerlevel);
        }
		else if(creep.memory.role == 'builder') {
            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
            if(harvesters.length == 0){
                roleHarvester.run(creep, controllerlevel);
            }
            roleBuilder.run(creep, controllerlevel);
        }
		else if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep, controllerlevel);
        }
		else if(creep.memory.role == 'rangedDefender') {
            roleRangedDefender.run(creep, controllerlevel);
        }
        else if(creep.memory.role == 'hauler') {
            roleHauler.run(creep, controllerlevel);
        }
        else if(creep.memory.role == 'healer') {
            roleHealer.run(creep, controllerlevel);
        }
        else if(creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        else if(creep.memory.role == 'recycle') {
            roleRecycled.run(creep);
        }
		else {
			console.log("ERR_ROLE_NOT_FOUND");
		}
    }
	
	for(var name in Game.spawns) {
		var spawn = Game.spawns[name];
        buildingSpawner.run(spawn);
    }
    
    for(var name in Game.structures) {
		var tower = Game.structures[name];
        if(tower.structureType == STRUCTURE_TOWER){
            buildingTower.run(tower);
        }
    }
}

/**
Trail Colors
Red (ff0000) Destroy Structure
Orange (ff8000) 
Yellow (ffff00) Deposit
Light Green (80ff00)
Green (00ff00) Renew
Green Blue (00ff80)
Cyan (00ffff)
Light Blue (0080ff) Build
Blue (0000ff)
Purple (8000ff) Attack
Pink (ff00ff)
Hot Pink (ff0080) Recycle
White (ffffff) Move
Black (000000)
**/