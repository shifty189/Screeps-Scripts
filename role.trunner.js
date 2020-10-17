module.exports = {
    run: function(creep) {
      var spawn = creep.room.find(FIND_MY_SPAWNS);
      // const room = spawn.room.name;
      var storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: (a) => a.structureType == STRUCTURE_STORAGE});
        var simpleMat = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
            filter: (a) => a.resourceType == RESOURCE_ENERGY
        });

        // var target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
        var hold = _.sum(creep.carry);
        var cap = creep.carryCapacity;
        var targetTower = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (a) => a.id == creep.memory.target});
        // var targetFil = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {filter: (c) => c.energy < c.energyCapacity && c.structureType != STRUCTURE_TOWER});

        // var lab3 = Game.spawns.Spawn1.pos.findClosestByRange (FIND_STRUCTURES, {filter: (a) => a.structureType == STRUCTURE_LAB && a.id == '6c0845b5dcbe3e4'})

        // creep.say('runner');
        // var matLen = (mat.length - 1);
        // var test = hold;
        // console.log(hold);
        // creep.say('runner');

        //if the local spawn doesn't know all its energy sources, find them all.
                if(spawn[0].memory.energySupply == undefined){
                  spawn[0].memory.energySupply = creep.room.find(FIND_SOURCES_ACTIVE);
              }
        //Pick an active source to harvest from depending on howmany are in the room
                var target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE, {filter: (a) => a.id == spawn[0].memory.energySupply[0].id
                });

        if (creep.carry.energy == 0 && creep.memory.working == true) {
            creep.memory.working = false
            // creep.memory.target = undefined
        }

        if (creep.memory.working == false && hold == creep.carryCapacity) {
            creep.memory.working = true;

            var towerFil = creep.room.find(FIND_MY_STRUCTURES, {
                filter: (c) => c.energy < c.energyCapacity && c.structureType == STRUCTURE_TOWER
            });

            towerFil.sort(function(a, b) {
            return a.energy - b.energy
            });
            creep.memory.target = towerFil[0].id;
        }

        // if(towerFil[0] == undefined){
        //   creep.memory.target = undefined;
        //   if(creep.memory.working == true){
        //     if(hold == cap){
        //       creep.moveTo(22,8);
        //     }
        //   }
        // }

        // console.log(towerFil);
        // if (targetTower == undefined && creep.memory.working == true){
        //   creep.memory.target = undefined;
        // }

        /*if (creep.memory.role == 'trunner' && creep.room != Game.rooms[room]) {
            creep.say('creep not in correct room');
            creep.moveTo(new RoomPosition(5, 15, room));
        } else*/ if (creep.memory.working == false) {
          if(storage != undefined){
            if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && storage.store[RESOURCE_ENERGY] !== 0) {
                creep.moveTo(storage);
            } else if (storage.store[RESOURCE_ENERGY] == 0){
              // creep.say('working');
              creep.moveTo(25,25);
            }
          } else if(storage == undefined){
            // creep.say(target);
            // console.log(creep.harvest(target));
            if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
          }
        }
        else if (creep.memory.working == true) {
          // creep.say('targetFil');
          // console.log(targetFil == null);
            // creep.say('testing');
              if (creep.transfer(targetTower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(targetTower);
              } /*else if(creep.transfer(targetTower, RESOURCE_ENERGY) < 0){
                creep.moveTo(22,8);
              }*/
            }
    }
};
