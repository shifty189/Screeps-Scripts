require('Utility');
var makeCreep = require('function.creepSpawner');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairar = require('role.repairar');
var roleRunner = require('role.runner');
var roleRunner2 = require('role.runner2');
var roleMinner = require('role.minner');
var roleTower = require('role.tower');
var roleTRunner = require('role.trunner');
var roleramprepairer = require('role.ramprepair');
var roleScout = require('role.scout');
var roleSlave = require('role.slave');
var roleErunner = require('role.Erunner');

const spawn = Game.spawns['Spawn1'];
// var creepBuild = [];
var creepBuild = creepCounter(spawn);
var minHarv = creepBuild[0];
var harvNum = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
var minRamp = creepBuild[1];
var rampNum = _.sum(Game.creeps, (c) => c.memory.role == 'rampRepairar');
var minHarv2 = creepBuild[2];
var harvNum2 = _.sum(Game.creeps, (c) => c.memory.role == 'harvester2');
var minUp = creepBuild[3];
var upNum = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
var minBuild = creepBuild[4];
var buildNum = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
var minRep = creepBuild[5];
var repNum = _.sum(Game.creeps, (c) => c.memory.role == 'repairar');
var minRun = creepBuild[6];
var runNum = _.sum(Game.creeps, (c) => c.memory.role == 'runner');
var minRun2 = creepBuild[7];
var runNum2 = _.sum(Game.creeps, (c) => c.memory.role == 'runner2');
var minScout = creepBuild[8];
var scoutNum = _.sum(Game.creeps, (c) => c.memory.role == 'scout');
var minSlave = creepBuild[9];
var slaveNum = _.sum(Game.creeps, (c) => c.memory.role == 'slave');
var minErun = creepBuild[10];
var erunNum = _.sum(Game.creeps, (c) => c.memory.role == 'erunner');
var emc = _.sum(Game.creeps, (c) => c.memory.role == 'emc');

var creepToMake = undefined;
var towerNeedFilling = false;
var rampart = Game.spawns.Spawn1.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: (a) => a.structureType == STRUCTURE_RAMPART && a.hits < a.hitsMax
});

const room = spawn.room.name;
var storage = spawn.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: (a) => a.structureType == STRUCTURE_STORAGE});

    // console.log('test');

/////if creep count is low, activate safe mode
// var creepNum = harvNum + buildNum + repNum + upNum;
if(spawn.hits < 4000){
  if(Game.rooms[room].controller.safeModeAvailable > 0){
      Game.rooms[room].controller.activateSafeMode()
  }
}
// console.log('test');

//memory cleanup
for (let name in Memory.creeps){
  if (Game.creeps[name] == undefined)
  {
    delete Memory.creeps[name];
  }
}
// spawn.memory = undefined;


//Call Tower function
var towers = Game.rooms[room].find(FIND_MY_STRUCTURES, {
    filter: (a) => a.structureType == STRUCTURE_TOWER
});
if(towers != undefined){
  for (let tower of towers) {
      roleTower.run(tower);
      if(tower.energy < 900){
        towerNeedFilling = true;
      }
  }
  var minTRun = 1
  var trunNum = _.sum(Game.creeps, (c) => c.memory.role == 'trunner');
} else if(towers == undefined){
  var minTRun = 0
  var trunNum = _.sum(Game.creeps, (c) => c.memory.role == 'trunner');
}

//find if any creeps need to be spawned
// console.log(Game.rooms[room].controller.level);
if(Game.rooms[room].controller.level > 3 && harvNum < 1 && emc < 1 && runNum < 1){
  // console.log('testing');
  creepToMake = 'emc';
} else if (erunNum < minErun){
  creepToMake = 'erunner';
}else if (harvNum < minHarv){
    creepToMake = 'harvester';
} else if (runNum < minRun){
  creepToMake = 'runner';
} else if (harvNum2 < minHarv2){
  creepToMake = 'harvester2';
} else if (runNum2 < minRun2){
  creepToMake = 'runner2';
} else if (trunNum < minTRun && towerNeedFilling == true){
  creepToMake = 'trunner';
} else if (repNum < minRep){
  creepToMake = 'repairar';
} else if (upNum< minUp){
  creepToMake = 'upgrader';
} else if (buildNum < minBuild){
  creepToMake = 'builder';
} else if (rampNum < minRamp && rampart != undefined) {
  creepToMake = 'rampRepairar';
} else if (slaveNum < minSlave) {
  creepToMake = 'slave';
} else if (scoutNum < minScout){
  creepToMake = 'scout';
}

//spawn a creep if needed
if(creepToMake != undefined){
   console.log(creepToMake + ' will be spawned next');
  makeCreep.run(creepToMake, spawn);
}

//assign each creep there role
for (let name in Game.creeps){
  var creep = Game.creeps[name];

  let possition = creep.room.lookAt(creep.pos);
  if(possition[1].terrain == 'swamp'){
    if(creep.room.createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_ROAD) == 0){
      console.log(creep.name + ' is building a road at ' + creep.pos.x + ' ' + creep.pos.y);
    };
  }

  if (creep.memory.role == 'upgrader'){
  roleUpgrader.run(creep);
  }
  else if (creep.memory.role == 'harvester' || creep.memory.role == 'harvester2'){
    if(storage != undefined){
      roleMinner.run(creep);
    } else if (storage == undefined){
      roleHarvester.run(creep);
    }
  } else if (creep.memory.role == 'emc'){
      roleHarvester.run(creep)
  }
  else if (creep.memory.role == 'builder'){
  roleBuilder.run(creep);
  }
  else if (creep.memory.role == 'repairar'){
      roleRepairar.run(creep);
  } else if (creep.memory.role == 'slave' || creep.memory.role == 'slave2' || creep.memory.role == 'slave3' || creep.memory.role == 'slave4' || creep.memory.role == 'slave5') {
      roleSlave.run(creep);
  } else if (creep.memory.role == 'erunner'){
      roleErunner.run(creep);
  } else if (creep.memory.role == 'runner'){
      roleRunner.run(creep);
  } else if (creep.memory.role == 'runner2'){
      roleRunner.run(creep);
  } else if (creep.memory.role == 'runner2'){
      roleRunner2.run(creep);
  } else if (creep.memory.role == 'trunner'){
      roleTRunner.run(creep);
  } else if (creep.memory.role == 'rampRepairar') {
      roleramprepairer.run(creep);
  } else if (creep.memory.role == 'scout'){
  roleScout.run(creep);
  }
}
