module.exports = {
    run: function(creep) {
        var mat = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
            filter: (a) => a.resourceType == RESOURCE_ENERGY
        });
        var hold = _.sum(creep.carry);
        // var cont = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        //     filter: (a) => a.structureType == STRUCTURE_CONTAINER && a.store[RESOURCE_ENERGY] < a.storeCapacity
        // })
        var storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (a) => a.structureType == STRUCTURE_STORAGE});

        var targetFil = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: (c) => c.energy < c.energyCapacity
        });


        if (creep.carry.energy == 0 && creep.memory.working == true) {
            creep.memory.working = false
        }

        if (creep.memory.working == false && hold == creep.carryCapacity) {
            creep.memory.working = true;
        }
        if (mat == undefined) {
            creep.memory.working = true;
        } else if (creep.memory.working == false && creep.memory.role == 'runner2' && creep.pickup(mat) < 0) {
            // creep.say('looking for Energy')
            creep.moveTo(30, 11);
        } else if (creep.memory.working == true && creep.memory.role == 'runner2') {
            if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //creep.say('storage');
                creep.moveTo(storage);
            } else if (storage == undefined) {
                if (creep.transfer(targetFil, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetFil);
                }
            }
        } else if (creep.memory.working == true && creep.memory.role == 'runner4') {
            if (creep.transfer(Slink2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //creep.say('storage');
                creep.moveTo(Slink2);
            } else if (storage == undefined) {
                if (creep.transfer(targetFil, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetFil);
                }
            }
        } else if (creep.memory.working == true && creep.memory.role == 'runner6') {
            if (creep.transfer(Slink3, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Slink3);
            } else if (storage == undefined) {
                if (creep.transfer(targetFil, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetFil);
                }
            }
        } else if (creep.memory.working == true && creep.memory.role == 'runner8') {
            if (creep.transfer(Slink4, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Slink4);
            } else if (storage == undefined) {
                if (creep.transfer(targetFil, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetFil);
                }
            }
        } else if (creep.memory.working == true && creep.memory.role == 'runner10') {
            if (creep.transfer(Slink5, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Slink5);
            } else if (storage == undefined) {
                if (creep.transfer(targetFil, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetFil);
                }
            }
        }
        // else {
        //   creep.moveTo(19,23);
        // }


    }
};
