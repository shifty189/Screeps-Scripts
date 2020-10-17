module.exports = {
  run: function (creep){
    var roleUpgrader = require('role.upgrader');

    var hold = _.sum(creep.carry);
    var cap = creep.carryCapacity;
    var spawn = creep.room.find(FIND_MY_SPAWNS);
    var advancedTarget = creep.room.find(FIND_CONSTRUCTION_SITES)
    var storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (a) => a.structureType == STRUCTURE_STORAGE});

        // console.log(storage.store[RESOURCE_ENERGY] !== 0);
        // creep.say(creep.memory.working);

    advancedTarget.sort(function(a, b) {
        return b.progress - a.progress
    });

    //if the local spawn doesn't know all its energy sources, find them all.
            if(spawn[0].memory.energySupply == undefined){
              spawn[0].memory.energySupply = creep.room.find(FIND_SOURCES_ACTIVE);
          }
    //Pick an active source to harvest from depending on howmany are in the room

            var target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE, {
              filter: (a) => a.id == spawn[0].memory.energySupply[0].id});


    if (creep.carry.energy == 0 && creep.memory.working == true)
    {
        creep.memory.working = false
        // creep.say('to work!');
    }

    if (hold == creep.carryCapacity && creep.memory.working == false)
    {
        creep.memory.working = true;
    }

    if(creep.memory.working == false){
      if(storage == undefined){
        if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
      } else if(storage != undefined){
        if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && storage.store[RESOURCE_ENERGY] !== 0) {
            creep.moveTo(storage);
        } else if (storage.store[RESOURCE_ENERGY] == 0){
          // creep.say('working');
          creep.moveTo(25,25);
        }
      }
    } else if(creep.memory.working == true){
        if(advancedTarget != undefined && creep.memory.working == true){
          if(creep.build(advancedTarget[0]) == ERR_NOT_IN_RANGE){
              creep.moveTo(advancedTarget[0]);
          } else {
            roleUpgrader.run(creep);
          }
        }
    }


  }

};
