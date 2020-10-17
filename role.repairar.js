module.exports = {
  run: function (creep){
      var roleBuilder = require('role.builder');
    var hold = _.sum(creep.carry);
    var cap = creep.carryCapacity;
    var spawn = creep.room.find(FIND_MY_SPAWNS);
    var targetRep = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (a) => a.hits < a.hitsMax && a.structureType !== STRUCTURE_WALL && a.structureType !== STRUCTURE_RAMPART
    });
    var storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (a) => a.structureType == STRUCTURE_STORAGE});

        //if the local spawn doesn't know all its energy sources, find them all.
                if(spawn[0].memory.energySupply == undefined){
                  spawn[0].memory.energySupply = creep.room.find(FIND_SOURCES_ACTIVE);
              }
        //Pick an active source to harvest from depending on howmany are in the room
                var target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE, {
                  filter: (a) => a.id == spawn[0].memory.energySupply[0].id});

    // var targetRep = creep.pos.findClosestByRange(FIND_STRUCTURES,
    //   {filter: (s) => s.hits < s.hitsMax});// {filter: (a) a.structureType != road};
    if (creep.carry.energy == 0 && creep.memory.working == true)
    {
        creep.memory.working = false
    }

    if (hold == creep.carryCapacity && creep.memory.working == false)
    {
        creep.memory.working = true;
    }

  if(storage != undefined && creep.memory.working == false){
    if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && storage.store[RESOURCE_ENERGY] !== 0) {
        creep.moveTo(storage);
    } else if (storage.store[RESOURCE_ENERGY] == 0){
      // creep.say('working');
      creep.moveTo(25,25);
    }
  } else if (creep.memory.working == false && creep.harvest(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
    else if (creep.memory.working == true && targetRep != undefined)
    {
      if (creep.repair(targetRep) == ERR_NOT_IN_RANGE)
      {
          creep.moveTo(targetRep)
      }
    }
    else if (creep.memory.working == true && targetRep == undefined)
    {
      // creep.say('builder');
        roleBuilder.run(creep);
    }
  }

};
