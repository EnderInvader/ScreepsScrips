var buildingTower = {
    run: function() 
    {
        var towers = _.filter(Game.structures, (s) => s.structureType == STRUCTURE_TOWER);
        for (i = 0; i < towers.length; i++)
        {
            this.attackHostileCreeps(towers[ i ]);
        }
    },
    attackHostileCreeps: function(tower)
    {
        var enemy = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (enemy)
            tower.attack(enemy);
        else if (tower.energy >= 600)
        {
            var priority = 1;
			var healTargets = this.getHealTargets(tower, priority);
			var repairTargets = this.getRepairTargets(tower, priority);
            
            if (healTargets != []) {
                tower.repair(tower.pos.findClosestByRange(healTargets));
				priority++;
			}
            else if (repairTargets != []) {
                tower.repair(tower.pos.findClosestByRange(repairTargets));
				priority++;
			}
        }
    },
	getHealTargets: function(tower, priority)
    {
        switch (priority)
        {
            case 1: return _.filter(Game.creeps, (creep) => creep.memory.role == 'rangeddefender' && creep.hits < creep.hitsMax);
            case 2: return _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.hits < creep.hitsMax);
            case 3: return _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.hits < creep.hitsMax);
			case 4: return _.filter(Game.creeps, (creep) => creep.hits < creep.hitsMax);
            default: return null;
        }
    },
    getRepairTargets: function(tower, priority)
    {
        switch (priority)
        {
            case 1: return _.filter(tower.room.find(FIND_STRUCTURES), (s) => (s.structureType == STRUCTURE_ROAD || s.structureType == STRUCTURE_CONTAINER) && s.hitsMax - s.hits >= 1500);
            case 2: return _.filter(tower.room.find(FIND_STRUCTURES), (s) => s.structureType == STRUCTURE_RAMPART && s.hits < 300000);
            case 3: return _.filter(tower.room.find(FIND_STRUCTURES), (s) => s.structureType == STRUCTURE_WALL && s.hits < 300000);
            default: return null;
        }
    }
};

module.exports = buildingTower;