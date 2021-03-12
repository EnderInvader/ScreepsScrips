var buildingTower = {

    //TOWER CODE
    run: function(tower) {

        //Attack Code
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined) {
            tower.attack(target);
        }

        //Heal
        else if (tower.store[RESOURCE_ENERGY] > 500) {
            var creeps = tower.room.find(FIND_MY_CREEPS, {
                filter: (s) => {
                    return (s.hits < s.hitsMax)
                }
            });
            if (creeps.length > 0) {
                creeps.sort((a, b) => (a.hits/a.hitsMax) - (b.hits/b.hitsMax));
                tower.heal(creeps[0]);
            }

            //Repair Code
            else if (tower.store[RESOURCE_ENERGY] > 750) {
                var targets = tower.room.find(FIND_STRUCTURES, {
                    filter: (s) => {
                        if (s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART) {
                            return (s.hits < 1000000)
                        }
                        else {
                            return (s.hits < s.hitsMax)
                        }
                    }
                });
                if (targets.length > 0) {
                    targets.sort((a, b) => (a.hits - b.hits));
                    tower.repair(targets[0]);
                }
            }
        }
    }
};

module.exports = buildingTower;