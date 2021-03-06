var roleHarvester = require('role.harvester');
var roleCHarvester = require('role.charvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleRangedDefender = require('role.rangeddefender');
var roleHauler = require('role.hauler');
var roleHealer = require('role.healer');
var roleClaimer = require('role.claimer');
var roleScout = require('role.scout');
var roleTargetAttacker = require('role.targetAttacker');
var roleDrainer = require('role.drainer');
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
var spawnScout = require('spawn.scout');
var spawnClaimer = require('spawn.claimer');
var spawnTargetAttacker = require('spawn.targetAttacker');
var spawnDrainer = require('spawn.drainer');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var spawns = Game.spawns;
	for(var name in spawns){
	    spawn = spawns[name];
	    
	    const target = spawn.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function(object) {
                return object.hits < object.hitsMax;
            }
        });
        if (target && _.filter(Game.creeps, (creep) => creep.memory.role == 'healer') == 0) {
            console.log('Spawn Healer for ' + target.name);
            var spawnHealers = spawnHealer.spawnHealer.run(spawn, 1);
        }
        
		
		else if (spawn.room.energyAvailable >= 200 && !spawn.spawning) {
			var spawnHarvesters = spawnHarvester.spawnHarvester.run(spawn, spawn.memory.OSlevel);
			
			if(spawnHarvesters == -99){
			    var spawnHaulers = spawnHauler.spawnHauler.run(spawn, spawn.memory.OSlevel);
				
				if(spawnHaulers == -99){
				    var spawnBuilders = spawnBuilder.spawnBuilder.run(spawn, spawn.memory.OSlevel);
					
					if(spawnBuilders == -99){
					    var spawnRepairers = spawnRepairer.spawnRepairer.run(spawn, spawn.memory.OSlevel);
						
						if(spawnRepairers == -99){
						    var spawnUpgraders = spawnUpgrader.spawnUpgrader.run(spawn, spawn.memory.OSlevel);
							
							if(spawnUpgraders == -99){
							    var spawnRangedDefenders = spawnRangedDefender.spawnRangedDefender.run(spawn, spawn.memory.OSlevel);
						    }
						}
					}
				}
			}
		}
		
		if(spawn.spawning) { 
            var spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
                spawningCreep.memory.role,
                spawn.pos.x + 1, 
                spawn.pos.y, 
                {align: 'left', opacity: 0.8});
                spawn.spawning.setDirections([TOP_RIGHT, RIGHT, BOTTOM_RIGHT, BOTTOM, BOTTOM_LEFT, LEFT, TOP_LEFT, TOP]);
        }
	}
	
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        //var controllerlevel = creep.room.controller.level;
        
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if(creep.memory.role == 'charvester') {
            roleCHarvester.run(creep);
        }
        else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
		else if(creep.memory.role == 'builder') {
            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
            if(harvesters.length == 0){
                roleHarvester.run(creep);
            }
            else {
                roleBuilder.run(creep);
            }
        }
		else if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
		else if(creep.memory.role == 'rangedDefender') {
            roleRangedDefender.run(creep);
        }
        else if(creep.memory.role == 'hauler') {
            roleHauler.run(creep);
        }
        else if(creep.memory.role == 'healer') {
            roleHealer.run(creep);
        }
        else if(creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        else if(creep.memory.role == 'scout') {
            roleScout.run(creep);
        }
        else if(creep.memory.role == 'targetAttacker') {
            roleTargetAttacker.run(creep);
        }
        else if(creep.memory.role == 'drainer') {
            roleDrainer.run(creep);
        }
        else if(creep.memory.role == 'recycle') {
            roleRecycled.run(creep);
        }
		else {
			console.log("ERR_ROLE_NOT_FOUND  " + name);
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
    
    //Attack Rooms
    for(var i in Memory.targetRooms) {
        var targetRoom = Memory.targetRooms[i];
        if (targetRoom.activeTarget) {
            if (Game.time - targetRoom.lastScan > 500) {//Spawn Scouts
                //console.log(targetRoom.name);
                var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');
                if(scouts.length == 0 && !spawn.spawning){
                    var spawnScouts = spawnScout.spawnScout.run(spawn, targetRoom);
                }
            }
            
            switch (targetRoom.enemyState) {//targetRoom.enemyState
                case -1:
                    break;
                    
                case 0:
                    var claimers = _.filter(Game.creeps, (creep) => (creep.memory.role == 'claimer' && creep.memory.target == targetRoom.name && creep.ticksToLive > 50));
                    if(claimers.length == 0 && !spawn.spawning){// && Game.rooms[targetRoom.name].controller.reservation.ticksToEnd < 100
                        if (!targetRoom.reserved || targetRoom.reserved.ticksToEnd - (Game.time - targetRoom.lastScan) < 3000) {//2000
                            var spawnClaimers = spawnClaimer.spawnClaimer.run(spawn, 4, targetRoom.name);
                        }
                    }
                    break;
                    
                case 1:
                case 2:
                    var targetAttackers = _.filter(Game.creeps, (creep) => (creep.memory.role == 'targetAttacker' && creep.memory.target == targetRoom.name && creep.ticksToLive > 100));
                    if(targetAttackers.length < targetRoom.attackers && !spawn.spawning){
                        var spawnTargetAttackers = spawnTargetAttacker.spawnTargetAttacker.run(spawn, 5, targetRoom.name);
                    }
                    break;

                case 3:
                    var drainers = _.filter(Game.creeps, (creep) => (creep.memory.role == 'drainer' && creep.memory.target == targetRoom.name));
                    if(drainers.length < 2 && !spawn.spawning){
                        var spawnDrainers = spawnDrainer.spawnDrainer.run(spawn, 4, targetRoom.name);
                    }
                    break;
            }
        }
    }






    //startTick = 20032995;
    //startLaunch = 41565;
    //timeRemaining = startLaunch - (Game.time - startTick);
    //console.log('Nuke landing in ' + timeRemaining + '   ' + (timeRemaining * 3.1) + 's');
}

/**
Trail Colors
Red (ff0000) Destroy Structure
Orange (ff8000) Withdraw
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