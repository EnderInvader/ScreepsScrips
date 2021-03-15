var buildingSpawner = {

    run: function(spawner) {
        var room = spawner.room;
		var controller = room.controller;
		var controllerLevel = controller.level;
		
		var extensionLevels = [0, 0, 5, 10, 20, 30, 40, 50, 60];
		
		if (spawner.memory.OSlevel == null) {
		    spawner.memory.OSlevel = 1;
		    
		    this.refitRoom(spawner);
		}

        for(var name in Game.creeps) {
			var creep = Game.creeps[name];
			if(creep.my == true && creep.memory.level >= spawner.memory.OSlevel) {
				if(creep.ticksToLive <= 1500) {
				    spawner.renewCreep(creep);
				}
			}
			
		    if(creep.memory.role == 'recycle')
		    {
		        spawner.recycleCreep(creep);
		    }
		}
		
		if (spawner.room.controller.level > spawner.memory.OSlevel) {
		    var extensions = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_EXTENSION
                }
            });
            var constructions = creep.room.find(FIND_MY_CONSTRUCTION_SITES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_EXTENSION
                }
            });
            
            if ((extensions.length + constructions.length) < extensionLevels[spawner.room.controller.level]) {
                console.log("trying to build");
                if ((extensions.length + constructions.length) < 12) {
                    var circle = [
                        {x:spawner.pos.x+1,y:spawner.pos.y+2},
                        {x:spawner.pos.x,y:spawner.pos.y+2},
                        {x:spawner.pos.x-1,y:spawner.pos.y+2},

                        {x:spawner.pos.x+2,y:spawner.pos.y+1},
                        {x:spawner.pos.x+2,y:spawner.pos.y},
                        {x:spawner.pos.x+2,y:spawner.pos.y-1},

                        {x:spawner.pos.x-2,y:spawner.pos.y+1},
                        {x:spawner.pos.x-2,y:spawner.pos.y},
                        {x:spawner.pos.x-2,y:spawner.pos.y-1},

                        {x:spawner.pos.x+1,y:spawner.pos.y-2},
                        {x:spawner.pos.x,y:spawner.pos.y-2},
                        {x:spawner.pos.x-1,y:spawner.pos.y-2}
                    ];
                
                    var num = 0;
                    for (var i = 0; i < circle.length; i++)
                    {
                        var site = spawner.room.createConstructionSite(circle[i].x,circle[i].y, STRUCTURE_EXTENSION);
                        if (site == 0) {
                            num++;
                        }

                        if (extensions.length + num == extensionLevels[spawner.room.controller.level]) {
                            break;
                        }
                    }
                }
                else {
                    console.log("circle full");
                }
            }
            else if (constructions.length == 0)
            {
                spawner.memory.OSlevel++;
                    
                this.refitRoom(spawner);
            }
		}
	},
	
	refitRoom: function(spawner) {
        switch(spawner.memory.OSlevel) {
            case 1:
                console.log("REFIT ROOM, 1");

                var goals = [{pos:spawner.pos,range:5}];

                //roads from spawn to sources
                var sources = spawner.room.find(FIND_SOURCES);
                for (var j = 0; j < sources.length; j++)
                {
                    var path = spawner.pos.findPathTo(sources[j].pos);
                    for (var i = 2; i < (path.length - 2); i++)
                    {
                        spawner.room.createConstructionSite(path[i].x,path[i].y, STRUCTURE_ROAD);
                    }
                    //spawner.room.createConstructionSite(path[path.length - 2].x,path[path.length - 2].y, STRUCTURE_CONTAINER);

                    goals.push({pos:sources[j].pos,range:4});
                }
                
                //place idle creeps flag
                var path = PathFinder.search(spawner.pos, goals,{flee:true}).path;
                spawner.room.memory.IdleCreeps = path[path.length - 1];

                goals.push({pos:path[path.length - 1],range:3});

                var path = PathFinder.search(spawner.pos, goals,{flee:true}).path;
                spawner.room.memory.IdleDefenders = path[path.length - 1];

                //roads around spawn
                var circle = [
                    {x:spawner.pos.x+1,y:spawner.pos.y+1},
                    {x:spawner.pos.x,y:spawner.pos.y+1},
                    {x:spawner.pos.x-1,y:spawner.pos.y+1},

                    {x:spawner.pos.x+1,y:spawner.pos.y},
                    {x:spawner.pos.x-1,y:spawner.pos.y},

                    {x:spawner.pos.x+1,y:spawner.pos.y-1},
                    {x:spawner.pos.x,y:spawner.pos.y-1},
                    {x:spawner.pos.x-1,y:spawner.pos.y-1}
                ];

                for (var i = 0; i < circle.length; i++)
                {
                    spawner.room.createConstructionSite(circle[i].x,circle[i].y, STRUCTURE_ROAD);
                }
              break;

            case 2:
                //roads around spawn
                circle = [
                    {x:spawner.pos.x+2,y:spawner.pos.y+2},
                    {x:spawner.pos.x-2,y:spawner.pos.y+2},
                    {x:spawner.pos.x+2,y:spawner.pos.y-2},
                    {x:spawner.pos.x-2,y:spawner.pos.y-2}
                ];

                for (var i = 0; i < circle.length; i++)
                {
                    spawner.room.createConstructionSite(circle[i].x,circle[i].y, STRUCTURE_ROAD);
                }

                //roads to controller
                var path = spawner.pos.findPathTo(spawner.room.controller.pos);
                for (var i = 2; i < (path.length - 1); i++)
                {
                    spawner.room.createConstructionSite(path[i].x,path[i].y, STRUCTURE_ROAD);
                }

                //roads to IdleCreeps flag
                var path = spawner.pos.findPathTo(new RoomPosition(spawner.room.memory.IdleCreeps.x,spawner.room.memory.IdleCreeps.y,spawner.room.memory.IdleCreeps.roomName));
                for (var i = 2; i < (path.length - 1); i++)
                {
                    spawner.room.createConstructionSite(path[i].x,path[i].y, STRUCTURE_ROAD);
                }

                //roads to IdleDefenders flag
                var path = spawner.pos.findPathTo(new RoomPosition(spawner.room.memory.IdleDefenders.x,spawner.room.memory.IdleDefenders.y,spawner.room.memory.IdleDefenders.roomName));
                for (var i = 2; i < (path.length - 1); i++)
                {
                    spawner.room.createConstructionSite(path[i].x,path[i].y, STRUCTURE_ROAD);
                }
                
                //containers in front of sources
                var sources = spawner.room.find(FIND_SOURCES);
                for (var j = 0; j < sources.length; j++)
                {
                    var path = spawner.pos.findPathTo(sources[j].pos);
                    spawner.room.createConstructionSite(path[path.length - 2].x,path[path.length - 2].y, STRUCTURE_CONTAINER);
                }
              break;
              
            case 3:
                //building towers
                var goals = [{pos:spawner.pos,range:4}];

                var sources = spawner.room.find(FIND_SOURCES);
                for (var j = 0; j < sources.length; j++)
                {
                    goals.push({pos:sources[j].pos,range:4});
                }

                //goals.push({pos:spawner.memory.IdleCreeps,range:3});
                //goals.push({pos:spawner.memory.IdleDefenders,range:3});

                var path = PathFinder.search(spawner.pos, goals,{flee:true}).path;
                spawner.room.createConstructionSite(path[path.length - 1].x,path[path.length - 1].y, STRUCTURE_TOWER);

                //ramparts around spawner
                var circle = [
                    {x:spawner.pos.x+1,y:spawner.pos.y+1},
                    {x:spawner.pos.x,y:spawner.pos.y+1},
                    {x:spawner.pos.x-1,y:spawner.pos.y+1},

                    {x:spawner.pos.x+1,y:spawner.pos.y},
                    {x:spawner.pos.x-1,y:spawner.pos.y},

                    {x:spawner.pos.x+1,y:spawner.pos.y-1},
                    {x:spawner.pos.x,y:spawner.pos.y-1},
                    {x:spawner.pos.x-1,y:spawner.pos.y-1},

                    {x:spawner.pos.x+2,y:spawner.pos.y+2},
                    {x:spawner.pos.x-2,y:spawner.pos.y+2},
                    {x:spawner.pos.x+2,y:spawner.pos.y-2},
                    {x:spawner.pos.x-2,y:spawner.pos.y-2}
                ];

                for (var i = 0; i < circle.length; i++)
                {
                    spawner.room.createConstructionSite(circle[i].x,circle[i].y, STRUCTURE_RAMPART);
                }

                //ramparts around controller
                var circle = [
                    {x:spawner.room.controller.pos.x+1,y:spawner.room.controller.pos.y+1},
                    {x:spawner.room.controller.pos.x,y:spawner.room.controller.pos.y+1},
                    {x:spawner.room.controller.pos.x-1,y:spawner.room.controller.pos.y+1},

                    {x:spawner.room.controller.pos.x+1,y:spawner.room.controller.pos.y},
                    {x:spawner.room.controller.pos.x-1,y:spawner.room.controller.pos.y},

                    {x:spawner.room.controller.pos.x+1,y:spawner.room.controller.pos.y-1},
                    {x:spawner.room.controller.pos.x,y:spawner.room.controller.pos.y-1},
                    {x:spawner.room.controller.pos.x-1,y:spawner.room.controller.pos.y-1}
                ];

                for (var i = 0; i < circle.length; i++)
                {
                    spawner.room.createConstructionSite(circle[i].x,circle[i].y, STRUCTURE_RAMPART);
                }

                //walls and ramparts on outside
              break;
            

            default:
                console.log("Error OSlevel not found " + spawner.memory.OSlevel);
              break;
        }
    }
};

module.exports = buildingSpawner;