var buildingTower = {

    //TOWER CODE
    run: function(tower) {
        
        /*  
        
        ORIGINAL TOWER CODE

        //TOWER CODE
        var towers = Game.rooms.W61S27.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER});
        for (let tower of towers) {
            var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (target != undefined) {
                tower.attack(target);
            }
        }
        
        */
        
        var targets = tower.room.find(FIND_STRUCTURES, {filter: (s) => s.hits < s.hitsMax});
        if (targets.length > 0) {
            targets.sort((a, b) => (a.hits/a.hitsMax) - (b.hits/b.hitsMax));
            tower.repair(targets[0]);
        }
    }
};

module.exports = buildingTower;