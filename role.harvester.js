module.exports = {
  run: function (creep){
    var roleBuilder = require('role.builder');
    var hold = _.sum(creep.carry);
    var cap = creep.carryCapacity;
    // var target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
    var targetFil = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {filter: (c) => c.energy < c.energyCapacity && c.structureType != STRUCTURE_TOWER});
    var harvNum = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var runNum = _.sum(Game.creeps, (c) => c.memory.role == 'runner');
    var spawn = creep.room.find(FIND_MY_SPAWNS);

//if the local spawn doesn't know all its energy sources, find them all.
    if(spawn[0].memory.energySupply == undefined){
      spawn[0].memory.energySupply = creep.room.find(FIND_SOURCES_ACTIVE);
  }
//Pick an active source to harvest from depending on howmany are in the room
  if(creep.memory.role == 'harvester2'){
    var target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE, {filter: (a) => a.id == spawn[0].memory.energySupply[0].id
    });
} else {
  var target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE, {filter: (a) => a.id == spawn[0].memory.energySupply[1].id
  });
}

    // console.log(target.id);
    // console.log(creep.harvest(target));

    if (creep.carry.energy == 0 && creep.memory.working == true)
    {
        creep.memory.working = false
    }

    if (hold == creep.carryCapacity && creep.memory.working == false)
    {
        creep.memory.working = true;
    }

    // if(creep.memory.role == 'emc' && _.sum(Game.creeps, (c) => c.memory.role == 'harvester') > 0){
    //   creep.memory.role = 'runner';
    //   creep.say('switching to runner role');
    // }

    if (creep.memory.role == 'emc' && harvNum > 0 && runNum > 0){
      creep.suicide();
    }

    if (creep.memory.working == false && creep.harvest(target) == ERR_NOT_IN_RANGE)
    {
      creep.moveTo(target)
    }
    else if(creep.memory.working == true){
      if(targetFil != undefined){
        if(creep.transfer(targetFil, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(targetFil);
        }
      } else {
        roleBuilder.run(creep);
      }
    }

  }

};
