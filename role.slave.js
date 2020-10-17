module.exports = {
    run: function(creep) {
        var hold = _.sum(creep.carry);
        var extractor = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (a) => a.structureType == STRUCTURE_EXTRACTOR
        })
        var min = creep.pos.findClosestByRange(FIND_MINERALS)
        var terminal = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (a) => a.structureType == STRUCTURE_TERMINAL
        })
        // var lab12 = Game.spawns.Spawn4.pos.findClosestByRange(FIND_STRUCTURES, {
        //     filter: (a) => a.id == '5a9d20c4df47cf0001a19058'
        // })
        // var lab9 = Game.spawns.Spawn3.pos.findClosestByRange(FIND_STRUCTURES, {
        //     filter: (a) => a.id == '5a9c6e28a6367000019b2ecf'
        // })

        // var carrying = _.sum(creep.carry)

        // creep.say('slave');
        //boost creep in main room


        if (hold == 0 && creep.memory.working == true) {
            creep.memory.working = false
        } else if (creep.memory.working == false && hold == creep.carryCapacity) {
            creep.memory.working = true;
        }


        else if (creep.memory.working == false && creep.harvest(min) == ERR_NOT_IN_RANGE) {
            creep.moveTo(min, {
                reusePath: 20
            });
        }
        // var test = creep.transfer(terminal, RESOURCE_HYDROGEN)
        // console.log(test);
        else if (creep.memory.role == 'slave') {
            if (creep.memory.working == true && creep.transfer(terminal, RESOURCE_HYDROGEN) < 0) {
                creep.moveTo(terminal, {
                    reusePath: 20
                })
            }
        } else if (creep.memory.role == 'slave2') {
            if (creep.memory.working == true && creep.transfer(terminal, RESOURCE_CATALYST) < 0) {
                creep.moveTo(terminal, {
                    reusePath: 20
                })
            }
        } else if (creep.memory.role == 'slave3') {
            if (creep.memory.working == true && creep.transfer(terminal, RESOURCE_ZYNTHIUM) < 0) {
                creep.moveTo(terminal, {
                    reusePath: 20
                })
            }
        } else if (creep.memory.role == 'slave4') {
            if (creep.memory.working == true && creep.transfer(terminal, RESOURCE_OXYGEN) < 0) {
                creep.moveTo(terminal, {
                    reusePath: 20
                })
            }
        } else if (creep.memory.role == 'slave5') {
            if (creep.memory.working == true && creep.transfer(terminal, RESOURCE_KEANIUM) < 0) {
                creep.moveTo(terminal, {
                    reusePath: 20
                })
            }
        }

    }
};
