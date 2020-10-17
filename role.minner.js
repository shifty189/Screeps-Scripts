module.exports = {
    run: function(creep) {
        var spawn = creep.room.find(FIND_MY_SPAWNS);
        var hold = _.sum(creep.carry);
        var cap = creep.carryCapacity;
        // var target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE); //energy source
        var targetBuild = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        var targetFil = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: (b) => (b.structureType == STRUCTURE_EXTENSION)
        } && {
            filter: (c) => c.energy < c.energyCapacity
        });

        // var test = creep.harvest(target) == ERR_NOT_IN_RANGE
        // console.log(test);
        //   console.log(creep.harvest(target));
        // }
        // creep.say('harv');

      //if the local spawn doesn't know all its energy sources, find them all.
              if(spawn[0].memory.energySupply == undefined){
                spawn[0].memory.energySupply = creep.room.find(FIND_SOURCES_ACTIVE);
            }

        if (creep.memory.role == 'harvester') {
          var target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE, {
            filter: (a) => a.id == spawn[0].memory.energySupply[0].id});

            if (creep.harvest(target) < 0) {
                creep.moveTo(target);
            }
        } else if (creep.memory.role == 'harvester2') {
          var target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE, {
            filter: (a) => a.id == spawn[0].memory.energySupply[1].id});

            if (creep.harvest(target) < 0) {
                creep.moveTo(target);
            }
        }
        if (hold > 0) {
            creep.drop(RESOURCE_ENERGY);
        }
    }

};
