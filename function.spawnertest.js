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

        // console.log(Game.rooms[room].energyCapacityAvailable);
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
        if(score < 15 || runners < 1 || harvesters < 1){
          hurting = true;
        } else {
          hurting = false;
        }


//Find if the room is considered to be large or not
          if(room.energyCapacityAvailable >= 1000){
            hiEnergy = true;
          } else if(room.energyCapacityAvailable < 1000){
            hiEnergy = false;
          }

          // hurting = true;

      if(hurting == true && role != 'scout'){
        body = [];
        body[0] = MOVE;
        body[1] = WORK;
        body[2] = CARRY;
        body[3] = MOVE;

        if(Game.spawns[spawn.name].spawnCreep(body, creepName, {memory: {role: role, working: false}}) == 0){
            console.log(creepName + ' spawned');
        }

      } else if(hurting == false){
        body = bodyBuilder(role, Game.rooms[room].energyCapacityAvailable * .5);
        // console.log(body);
        if(body == undefined){
          console.log('problem building body');
        }
        if(Game.spawns[spawn.name].spawnCreep(body, creepName, {memory: {role: role, working: false}}) == 0){
            console.log(creepName + ' spawned');
        }
      }


//This is the beginging of the original Document. Ending }} are still down there........................................................
        // if (energy < 300 && role !== 'miner') {
        //     answer[0] = MOVE;
        //     answer[1] = WORK;
        //     answer[2] = CARRY;
        //     answer[3] = MOVE;
        //
        //     return answer;
        // }
        //
        // else if(energy < 300 && role == 'miner'){
        //       answer[0] = MOVE;
        //       answer[1] = WORK;
        //       answer[2] = WORK;
        //
        //       return answer;
        // }
        //
        // //if miner role, calculate body type
        // else if (role == 'miner') {
        //   cal = energy * 0.333
        //   cal = Math.floor(cal / 50);
        //   working = energy - (cal * 50);
        //   for (var i = 0; i < cal - 1; i++) {
        //       answer[i] = MOVE;
        //   }
        //   cal2 = Math.floor(energy * 0.666);
        //   cal2 = Math.floor(cal2 / 100);
        //   working = working - (cal2 * 100);
        //   for (var i = answer.length; i < cal2 + cal; i++) {
        //       answer[i] = WORK;
        //   }
        //   while(answer.length < 20  && working > 99){
        //     answer.push(WORK);
        //     working = working - 99;
        //   }
        //   while(answer.length < 50  && working > 49){
        //     answer.push(MOVE);
        //     working = working - 49;
        //   }
        //   return answer;
        // }
        //
        // //if runner role, calculate body type
        // else if (role == 'runner') {
        //     cal = energy * 0.5
        //     cal = Math.floor(cal / 50);
        //     if (cal > 4) {
        //         cal = 4;
        //     }
        //     for (var i = 0; i < cal; i++) {
        //         answer[i] = MOVE;
        //     }
        //     cal2 = energy * 0.5;
        //     cal2 = Math.floor(cal2 / 50);
        //     if (cal2 > 4) {
        //         cal2 = 4;
        //     }
        //     for (var i = answer.length; i < cal2 + cal; i++) {
        //         answer[i] = CARRY;
        //     }
        //     return answer;
        // }
        //
        // //if Wall repairer role, calculate body type
        // else if (role == 'wrepairer') {
        //     cal = energy * 0.3
        //     cal = Math.floor(cal / 50);
        //     if (cal > 15) {
        //         cal = 15;
        //     }
        //     working = energy - (cal * 50);
        //     for (var i = 0; i < cal; i++) {
        //         answer[i] = MOVE;
        //     }
        //     cal2 = energy * 0.3;
        //     cal2 = Math.floor(cal2 / 50);
        //     if (cal2 > 15) {
        //         cal2 = 15;
        //     }
        //     working = working - (cal2 * 50);
        //     for (var i = answer.length; i < cal2 + cal; i++) {
        //         answer[i] = CARRY;
        //     }
        //     cal3 = energy * 0.4;
        //     cal3 = Math.floor(cal3 / 100);
        //     if (cal3 > (50 - answer.length)) {
        //         cal3 = (50 - answer.length);
        //     }
        //     working = working - (cal3 * 100);
        //     for (var i = answer.length; i < cal2 + cal + cal3; i++) {
        //         answer[i] = WORK;
        //     }
        //     while(answer.length < 50 && working > 49){
        //       answer.push(CARRY);
        //     }
        //     return answer;
        // }
        //
        // //if slave role, calculate body type
        // else if (role == 'slave') {
        //     cal = energy * 0.333
        //     cal = Math.floor(cal / 50);
        //     if (cal > 16) {
        //         cal = 16;
        //     }
        //     for (var i = 0; i < cal; i++) {
        //         answer[i] = MOVE;
        //     }
        //     cal2 = energy * 0.333;
        //     cal2 = Math.floor(cal2 / 50);
        //     if (cal2 > 2) {
        //         cal2 = 2;
        //     }
        //     for (var i = answer.length; i < cal2 + cal; i++) {
        //         answer[i] = CARRY;
        //     }
        //     cal3 = energy * 0.333;
        //     cal3 = Math.floor(cal3 / 100);
        //     if (cal3 > (50 - answer.length)) {
        //         cal3 = (50 - answer.length);
        //     }
        //     for (var i = answer.length; i < cal2 + cal + cal3; i++) {
        //         answer[i] = WORK;
        //     }
        //     return answer;
        // }
        //
        // //if defender role, calculate body type
        // else if (role == 'defender') {
        //     //calculate body part ratio
        //     cal = energy * 0.4
        //     cal = Math.floor(cal / 50);
        //     cal2 = energy * 0.6;
        //     cal2 = Math.floor(cal2 / 80);
        //
        //     // limit move parts to 16 per defender
        //     if (cal > 16) {
        //         cal = 16;
        //     }
        //
        //     //assign move body parts according to above ratio
        //     for (var i = 0; i < cal; i++) {
        //         answer[i] = MOVE;
        //     }
        //
        //     //calculate if total body parts exceds maximum, correct if so
        //     if (cal2 > (50 - answer.length)) {
        //         cal2 = (50 - answer.length);
        //     }
        //     // assign attack body parts according to above ratio
        //     for (var i = answer.length; i < cal2 + cal; i++) {
        //         answer[i] = ATTACK;
        //     }
        //     //output body
        //     return answer;
        // } else if(role == 'test'){ //if any other role is given, make it ballanced
        //   cal = energy * 0.3
        //   cal = Math.floor(cal / 50);
        //   if (cal > 15) {
        //       cal = 15;
        //   }
        //   working = energy - (cal * 50);
        //   for (var i = 0; i < cal; i++) {
        //       answer[i] = MOVE;
        //   }
        //   cal2 = energy * 0.3;
        //   cal2 = Math.floor(cal2 / 50);
        //   if (cal2 > 15) {
        //       cal2 = 15;
        //   }
        //   working = working - (cal2 * 50);
        //   for (var i = answer.length; i < cal2 + cal; i++) {
        //       answer[i] = CARRY;
        //   }
        //   cal3 = energy * 0.4;
        //   cal3 = Math.floor(cal3 / 100);
        //   if (cal3 > (50 - answer.length)) {
        //       cal3 = (50 - answer.length);
        //   }
        //   working = working - (cal3 * 100);
        //   for (var i = answer.length; i < cal2 + cal + cal3; i++) {
        //       answer[i] = WORK;
        //   }
        //   while (answer.length < 50 && working > 49){
        //     answer.push(MOVE);
        //   }
        //   return answer;
        // } else { //if any other role is given, make it ballanced
        //   cal = energy * 0.3
        //   cal = Math.floor(cal / 50);
        //   if (cal > 15) {
        //       cal = 15;
        //   }
        //   working = energy - (cal * 50);
        //   for (var i = 0; i < cal; i++) {
        //       answer[i] = MOVE;
        //   }
        //   cal2 = energy * 0.3;
        //   cal2 = Math.floor(cal2 / 50);
        //   if (cal2 > 15) {
        //       cal2 = 15;
        //   }
        //   working = working - (cal2 * 50);
        //   for (var i = answer.length; i < cal2 + cal; i++) {
        //       answer[i] = CARRY;
        //   }
        //   cal3 = energy * 0.4;
        //   cal3 = Math.floor(cal3 / 100);
        //   if (cal3 > (50 - answer.length)) {
        //       cal3 = (50 - answer.length);
        //   }
        //   working = working - (cal3 * 100);
        //   for (var i = answer.length; i < cal2 + cal + cal3; i++) {
        //       answer[i] = WORK;
        //   }
        //   while (answer.length < 50 && working > 49){
        //     answer.push(MOVE);
        //   }
        //   return answer;
        // }

    }

};
