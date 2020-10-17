module.exports = {
    run: function(creep) {
      var spawn = creep.room.find(FIND_MY_SPAWNS);
      const room = spawn[0].room.name;
        var hold = _.sum(creep.carry);
        var mat = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
            filter: (a) => a.resourceType == RESOURCE_ENERGY
        });
        var cap = creep.carryCapacity;
        var target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
        var targetBuild = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        var targetRep = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (a) => a.hits < a.hitsMax && a.structureType == STRUCTURE_RAMPART
        });
        var storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (a) => a.structureType == STRUCTURE_STORAGE
        })

        //create and prepare wall variable
        var wall = creep.room.find(FIND_STRUCTURES, {
            filter: (a) => a.structureType == STRUCTURE_RAMPART
        });
        wall.sort(function(a, b) {
            return a.hits - b.hits
        });

        //if the local spawn doesn't know all its energy sources, find them all.
                if(spawn[0].memory.energySupply == undefined){
                  spawn[0].memory.energySupply = creep.room.find(FIND_SOURCES_ACTIVE);
              }
        //Pick an active source to harvest from depending on howmany are in the room

                var target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE, {
                  filter: (a) => a.id == spawn[0].memory.energySupply[0].id});

        // creep.say('ramp');
        // console.log(wall[0]);
        if (creep.carry.energy == 0 && creep.memory.working == true) {
            creep.memory.working = false
        } else if (creep.memory.working == false && hold == creep.carryCapacity) {
            creep.memory.working = true;
            creep.memory.target = wall[0].id
        }

        //use when no stroage is availbe
        else if (storage == undefined && creep.memory.working == false) {
            if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        //use when storage is availbe
        else if (storage != undefined && creep.memory.working == false) {
            if (storage.store[RESOURCE_ENERGY] == 0) {
                creep.moveTo(25, 25);
            } else if (creep.memory.working == false && creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage);
            }
        }

        //tell the creep to repair the ramparts
        else if (creep.memory.working == true) {
            if (creep.repair(creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (a) => a.id == creep.memory.target
                })) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (a) => a.id == creep.memory.target
                }));
            }
        }

        // if(creep.memory.target == undefined && creep.memeory.working == true){
        //   creep.memeory.working = false;
        // }

    }
};
