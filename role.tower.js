module.exports = {
    run: function(tower) {
      var towerLimit = /*10000;*/Infinity;
      var whiteList = require('function.whitelist');

        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var targetRep = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (a) => a.hits < a.hitsMax
        });
        var targetH = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function(a) {
                return a.hits < a.hitsMax
            }
        });

        //find any enemy's that can heal
        var enemy = tower.room.find(FIND_HOSTILE_CREEPS);
        var enemyNumber = enemy.length
        var enemyHealer
        var calc = 0
        for (var i = 0; i < enemyNumber; i++) {
            var bodyNum = enemy[i].body.length
            for (var j = 0; j < bodyNum; j++) {
                if (enemy[i].body[j].type == "heal") {
                    enemyHealer = enemy[i]
                    calc++
                }
            }
        }
        //end of code to find enemy healers

        //if enemy healer is in the room, attack it
        if (enemyHealer != undefined) {
            tower.attack(enemyHealer);
        }
        //if target in room, attack that target
        // else if (target != undefined && whiteList.run(target.owner.username) == false) {
        else if (target != undefined) {
          if(whiteList.run(target.owner.username) == false){
            tower.attack(target);
          }
        }
        //if no enemy, heal creep
        else if (target != undefined) {
          if(whiteList.run() == false){
            tower.attack(target);
          }
        } else if (target == undefined){
          var wall = tower.room.find(FIND_STRUCTURES, {
              filter: (a) => a.structureType == STRUCTURE_WALL
          });
          wall.sort(function(a, b) {
              return a.hits - b.hits
          });
          var ramp = tower.room.find(FIND_STRUCTURES, {
              filter: (a) => a.structureType == STRUCTURE_RAMPART
          });
          wall.sort(function(a, b) {
              return a.hits - b.hits
          });
          ramp.sort(function(a, b) {
              return a.hits - b.hits
          });
          if(ramp[0] !== undefined && ramp[0].hits < 7000 && tower.energy > 500){
            tower.repair(ramp[0]);
          } else if(wall[0] !== undefined && wall[0].hits < towerLimit && tower.energy > 500){
            tower.repair(wall[0]);
          }
        }
    }
};
