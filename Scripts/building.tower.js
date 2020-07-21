var buildingTower = {

    //TOWER CODE
    run: function(tower) {
        
        //Attack Code
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined) {
            tower.attack(target);
        }
        
        //Repair Code
        else if (tower.store[RESOURCE_ENERGY] > 500) {
            var targets = tower.room.find(FIND_MY_CREEPS, {
                filter: (s) => {
                    return (s.hits < s.hitsMax)
                }
            });
            if (targets.length > 0) {
                targets.sort((a, b) => (a.hits/a.hitsMax) - (b.hits/b.hitsMax));
                tower.heal(targets[0]);
            }
            
            else {
                var targets = tower.room.find(FIND_STRUCTURES, {
                    filter: (s) => {
                        if (s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART) {
                            return (s.hits < 100000)
                        }
                        else {
                            return (s.hits < s.hitsMax)
                        }
                    }
                });
                if (targets.length > 0) {
                    targets.sort((a, b) => (a.hits/a.hitsMax) - (b.hits/b.hitsMax));
                    tower.repair(targets[0]);
                }
            }
        }
    }
};

module.exports = buildingTower;