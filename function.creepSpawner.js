module.exports = {
    run: function(role, spawn) {

        let room = spawn.room.name;
        let hiEnergy, hurting;
        let creeps = Game.creeps;
        let harvesters = 0;
        let runners = 0;
        let score = 0;
        let body;
        let rand = Math.floor(Math.random() * 1000);
        let creepName = role + ' ' + rand;
        let storage = Game.rooms[room].storage;

        // console.log(storage);
//Find if room is in bad shape or "hurting" if you will.
        for(let name in creeps){
          var creep = Game.creeps[name];
          if(creep.room.name == room){
            if(creep.memory.role.match(/harv/i)){
              harvesters++;
              score = score + 5
            }
            if(creep.memory.role.match(/runn/i)){
              runners++;
              score = score + 5
            }
          }
        }
      if(storage != undefined){
        if(score < 15 || runners < 1 || harvesters < 1 || storage.store[RESOURCE_ENERGY] < 5000){
          hurting = true;
        } else {
          hurting = false;
        }
      } else if(storage == undefined){
        if(score < 15 || runners < 1 || harvesters < 1){
          hurting = true;
        } else {
          hurting = false;
        }
      }


//Find if the room is considered to be large or not
          if(room.energyCapacityAvailable >= 1000){
            hiEnergy = true;
          } else if(room.energyCapacityAvailable < 1000){
            hiEnergy = false;
          }

          // hurting = true;

        if(role != 'harvester2' && role != 'harvester' && hurting == true){
          bodyBuilder(role, Game.rooms[room].energyAvailable, spawn)
          body = [];

          body[0] = MOVE;
          body[1] = WORK;
          body[2] = CARRY;
          body[3] = MOVE;

        if(Game.spawns[spawn.name].spawnCreep(body, creepName, {memory: {role: role, working: false}}) == 0){
            console.log(creepName + ' spawned');
        }

      } else if(hurting == true && role == 'harvester'){
        if(Game.rooms[room].energyAvailable < 700){
          body = bodyBuilder(role, Game.rooms[room].energyAvailable, spawn);
        } else if(Game.rooms[room].energyAvailable > 699){
          body = bodyBuilder(role, 700, spawn);
        }
        //   console.log(body);
          if(body == undefined){
            console.log('problem building body');
          }
        //   console.log(body);
        //   console.log(Game.spawns[spawn.name].spawnCreep(body, creepName, {memory: {role: role, working: false}}));
          if(Game.spawns[spawn.name].spawnCreep(body, creepName, {memory: {role: role, working: false}}) == 0){
              console.log(creepName + ' spawned');
          }
      } else if(hurting == true && role == 'harvester2'){
        if(Game.rooms[room].energyAvailable < 700){
          body = bodyBuilder(role, Game.rooms[room].energyAvailable, spawn);
        } else if(Game.rooms[room].energyAvailable > 699){
          body = bodyBuilder(role, 700, spawn);
        }
          // console.log(body);
          if(body == undefined){
            console.log('problem building body');
          }
          if(Game.spawns[spawn.name].spawnCreep(body, creepName, {memory: {role: role, working: false}}) == 0){
              console.log(creepName + ' spawned');
          }
      } else if(hurting == false){
        // console.log('default profile used');
        body = bodyBuilder(role, Game.rooms[room].energyCapacityAvailable * .5, spawn);
        // console.log(body);
        if(body == undefined){
          console.log('problem building body');
        }
        if(Game.spawns[spawn.name].spawnCreep(body, creepName, {memory: {role: role, working: false}}) == 0){
            console.log(creepName + ' spawned');
        }
      }

    }

};
