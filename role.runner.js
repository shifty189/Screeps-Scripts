module.exports = {
    run: function(creep) {
      // const spawn = Game.spawns['Spawn1'];
      var spawn = creep.room.find(FIND_MY_SPAWNS);
      const room = spawn[0].room.name;
      var storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: (a) => a.structureType == STRUCTURE_STORAGE});
        var simpleMat = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
            filter: (a) => a.resourceType == RESOURCE_ENERGY
        });
        var advancedMat = creep.room.find(FIND_DROPPED_RESOURCES, {
            filter: (a) => a.resourceType == RESOURCE_ENERGY
        });
        var hold = _.sum(creep.carry);
        var cap = creep.carryCapacity;
        // var targetFil = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {filter: (c) => c.energy < c.energyCapacity && c.structureType != STRUCTURE_TOWER});
        var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        var targetFil = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: (c) => c.energy < c.energyCapacity && c.structureType !== STRUCTURE_STORAGE && c.structureType !== STRUCTURE_LINK && c.structureType !== STRUCTURE_TOWER
        });
        var towerFil = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: (c) => c.energy < c.energyCapacity && c.structureType == STRUCTURE_TOWER
        });
        var targetMat = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (c) => c.structureType == STRUCTURE_CONTAINER});

        var storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (a) => a.structureType == STRUCTURE_STORAGE})

            var targetHarv = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE, {
              filter: (a) => a.id == spawn[0].memory.energySupply[0].id});

        // var lab3 = Game.spawns.Spawn1.pos.findClosestByRange (FIND_STRUCTURES, {filter: (a) => a.structureType == STRUCTURE_LAB && a.id == '6c0845b5dcbe3e4'})
        advancedMat.sort(function(a, b) {
            return b.amount - a.amount
        });

        // console.log(creep.pickup(simpleMat));
        var mat = advancedMat.sort(function(a, b) {
            return a - b
        });
        var matLen = (mat.length - 1);
        // var test = hold;
        // console.log(hold);
        // creep.say('runner');

        if (creep.carry.energy == 0 && creep.memory.working == true) {
            creep.memory.working = false
        }

        if (creep.memory.working == false && hold == creep.carryCapacity) {
            creep.memory.working = true;
        }
        if (creep.memory.working == false && advancedMat[0] == undefined && hold > 0) {
            creep.memory.working == true;
        }

         if (creep.memory.role == 'runner' && creep.room != Game.rooms[room]) {
            creep.say('creep not in correct room');
            creep.moveTo(new RoomPosition(5, 15, room));
        } else if (creep.memory.working == false) {
          // creep.say(simpleMat);
            if(creep.pickup(simpleMat) == ERR_NOT_IN_RANGE){
              if (creep.memory.role == 'runner') {
                // console.log(advancedMat[0]);
                  creep.moveTo(creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE, {
                    filter: (a) => a.id == spawn[0].memory.energySupply[0].id}));
              } else if (creep.memory.role == 'runner2') {
                // console.log(advancedMat[0]);
                  creep.moveTo(creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE, {
                    filter: (a) => a.id == spawn[0].memory.energySupply[1].id}));
              }
            }
           /*else if (_.sum(Game.creeps, (c) => c.memory.role == 'harvester') < 1 && creep.memory.working == false){
            if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage);
            }
          }*/
        } else if (creep.memory.working == true) {
          // creep.say('targetFil');
          // console.log(targetFil == null);
          if(storage != undefined){
              if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  //creep.say('storage');
                  creep.moveTo(storage);
              }
            } else if (storage == undefined){
              if (targetFil !== null){
                // creep.say('testing');
                  if (creep.transfer(targetFil, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                      creep.moveTo(targetFil);
                  }
                }
            }
        }
    }
};
