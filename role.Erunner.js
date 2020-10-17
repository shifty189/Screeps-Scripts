module.exports = {
    run: function(creep) {
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

        // var lab3 = Game.spawns.Spawn1.pos.findClosestByRange (FIND_STRUCTURES, {filter: (a) => a.structureType == STRUCTURE_LAB && a.id == '6c0845b5dcbe3e4'})
        advancedMat.sort(function(a, b) {
            return b.amount - a.amount
        });

        // creep.say('runner');
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

        if (creep.memory.working == false){
            if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage);
            }
        } else if (creep.memory.working == true) {
          if (targetFil !== null){
            // creep.say('testing');
              if (creep.transfer(targetFil, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(targetFil);
              }
            } else {
              // creep.say('testing');
            creep.moveTo(37,6)
            }
        }

    }
};
