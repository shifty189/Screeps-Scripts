bodyBuilder = function(role, energy, spawn){
  // console.log(energy);
  var cal = 0;
  var cal2 = 0;
  var cal3 = 0;
  var answer = [];
  var working = 0;

  // console.log(energy);

  if (energy < 301 && role !== 'harvester') {
      answer[0] = MOVE;
      answer[1] = WORK;
      answer[2] = CARRY;
      answer[3] = MOVE;

      return answer;
  } else if (role == 'emc') {
      answer[0] = MOVE;
      answer[1] = WORK;
      answer[2] = CARRY;
      answer[3] = MOVE;

      return answer;
  } else if(energy < 301 && role == 'harvester'){
    if(spawn.room.storage == undefined){
        answer[0] = MOVE;
        answer[1] = WORK;
        answer[2] = CARRY;

        return answer;
      } else if(spawn.room.storage != undefined){
          answer[0] = MOVE;
          answer[1] = WORK;
          answer[2] = WORK;

          return answer;
        }
  }

  //if miner role, calculate body type
  else if (role == 'miner' || role == 'harvester' || role == 'harvester2') {
    // console.log(spawn.room.storage);
    if(spawn.room.storage != undefined){
      cal = energy * 0.3
      cal = Math.floor(cal / 50);
      working = energy - (cal * 50);
      // console.log('cal: ' + cal);
      while(cal > 0){
        answer.push(MOVE);
        cal--;
      }
      cal2 = Math.floor(energy * 0.3);
      cal2 = Math.floor(cal2 / 100);
      working = working - (cal2 * 100);
      // console.log('cal2 ' + cal2);
      while(cal2 > 0){
        answer.push(WORK);
        cal2--;
      }
      cal3 = Math.floor(energy * 0.3);
      cal3 = Math.floor(cal3 / 100);
      working = working - (cal3 * 100);
      // console.log('cal3 ' + cal3);
      while(cal3 > 0){
        answer.push(CARRY);
        cal3--;
      }
      while(answer.length < 20  && working > 99){
        answer.push(WORK);
        working = working - 99;
      }
      while(answer.length < 50  && working > 49){
        answer.push(MOVE);
        working = working - 49;
      }
      // console.log(answer);
      return answer;
  } else if(spawn.room.storage == undefined){
    // console.log('working');
    cal = energy * 0.3
    cal = Math.floor(cal / 50);
    working = energy - (cal * 50);
    // console.log(cal);
    while(cal > 0){
      answer.push(MOVE);
      cal--;
    }
    cal2 = Math.floor(energy * 0.3);
    cal2 = Math.floor(cal2 / 100);
    working = working - (cal2 * 100);
    while(cal2 > 0){
      answer.push(WORK);
      cal2--;
    }
    cal3 = Math.floor(energy * 0.3);
    cal3 = Math.floor(cal3 / 100);
    working = working - (cal3 * 100);
    while(cal3 > 0){
      answer.push(CARRY);
      cal3--;
    }
    while(answer.length < 20  && working > 99){
      answer.push(WORK);
      working = working - 99;
    }
    while(answer.length < 50  && working > 49){
      answer.push(MOVE);
      working = working - 49;
    }
    // console.log(answer);
    return answer;
}
  }


  //if runner role, calculate body type
  else if (role == 'runner' || role == 'runner2' || role == 'trunner' || role == 'erunner') {
      cal = energy * 0.5
      cal = Math.floor(cal / 50);
      if (cal > 4) {
          cal = 4;
      }
      while(cal > 0){
        answer.push(MOVE);
        cal--;
      }
      cal2 = energy * 0.5;
      cal2 = Math.floor(cal2 / 50);
      if (cal2 > 4) {
          cal2 = 4;
      }
      while(cal2 > 0){
        answer.push(CARRY);
        cal2--;
      }
      return answer;
  }

  //if Wall repairer role, calculate body type
  else if (role == 'wrepairer') {
      cal = energy * 0.3
      cal = Math.floor(cal / 50);
      if (cal > 15) {
          cal = 15;
      }
      working = energy - (cal * 50);
      while(cal > 0){
        answer.push(MOVE);
        cal--;
      }
      cal2 = energy * 0.3;
      cal2 = Math.floor(cal2 / 50);
      if (cal2 > 15) {
          cal2 = 15;
      }
      working = working - (cal2 * 50);
      while(cal2 > 0){
        answer.push(CARRY);
        cal2--;
      }
      cal3 = energy * 0.4;
      cal3 = Math.floor(cal3 / 100);
      if (cal3 > (50 - answer.length)) {
          cal3 = (50 - answer.length);
      }
      working = working - (cal3 * 100);
      while(cal3 > 0){
        answer.push(WORK);
        cal3--;
      }
      while(answer.length < 50 && working > 49){
        answer.push(CARRY);
      }
      return answer;
  }

  //if slave role, calculate body type
  else if (role == 'slave') {
      cal = energy * 0.333
      cal = Math.floor(cal / 50);
      if (cal > 16) {
          cal = 16;
      }
      while(cal > 0){
        answer.push(MOVE);
        cal--;
      }
      cal2 = energy * 0.333;
      cal2 = Math.floor(cal2 / 50);
      if (cal2 > 2) {
          cal2 = 2;
      }
      while(cal2 > 0){
        answer.push(CARRY);
        cal2--;
      }
      cal3 = energy * 0.333;
      cal3 = Math.floor(cal3 / 100);
      if (cal3 > (50 - answer.length)) {
          cal3 = (50 - answer.length);
      }
      while(cal3 > 0){
        answer.push(WORK);
        cal3--;
      }
      return answer;
  }

  //if defender role, calculate body type
  else if (role == 'defender') {
      //calculate body part ratio
      cal = energy * 0.4
      cal = Math.floor(cal / 50);
      cal2 = energy * 0.6;
      cal2 = Math.floor(cal2 / 80);

      // limit move parts to 16 per defender
      if (cal > 16) {
          cal = 16;
      }

      //assign move body parts according to above ratio
      for (var i = 0; i < cal; i++) {
          answer[i] = MOVE;
      }

      //calculate if total body parts exceds maximum, correct if so
      if (cal2 > (50 - answer.length)) {
          cal2 = (50 - answer.length);
      }
      // assign attack body parts according to above ratio
      for (var i = answer.length; i < cal2 + cal; i++) {
          answer[i] = ATTACK;
      }
      //output body
      return answer;
  } else if(role == 'test'){ //if any other role is given, make it ballanced
    console.log('set up get user in Utility.js')
  } else { //if any other role is given, make it ballanced
    // console.log('testing');
    cal = energy * 0.3
    cal = Math.floor(cal / 50);
    if (cal > 10) {
        cal = 10;
    }
    working = energy - (cal * 50);
    while(cal > 0){
      answer.push(MOVE);
      cal--;
    }
    cal2 = energy * 0.3;
    cal2 = Math.floor(cal2 / 50);
    if (cal2 > 5) {
        cal2 = 5;
    }
    working = working - (cal2 * 50);
    while(cal2 > 0){
      answer.push(CARRY);
      cal2--;
    }
    cal3 = energy * 0.4;
    cal3 = Math.floor(cal3 / 100);
    if (cal3 > (50 - answer.length)) {
        cal3 = (50 - answer.length);
    }
    working = working - (cal3 * 100);
    while(cal3 > 0){
      answer.push(WORK);
      cal3--;
    }

    while (answer.length < 30 && working > 49){
      answer.push(MOVE);
      working = working - 49;
    }
    // console.log(answer.length);
    return answer;
  }
}

//start of creepCounter function///////////////////////////////////////////////////
creepCounter = function(spawn){
  const room = spawn.room.name;
  let answer = [];
  if(Game.rooms[room].controller.level == 1){
   answer[0] = 1 //minHarv
   answer[1] = 0 //minRamp
   answer[2] = 0 //minHarv2
   answer[3] = 1 //minUp
   answer[4] = 1 //minBuild
   answer[5] = 1 //minRep
   answer[6] = 0 //minRun
   answer[7] = 0 //minRun2
   answer[8] = 0 //minScout
   answer[9] = 0 //minSlave
   answer[10] = 0 //minErun

   return answer;
 } else if(Game.rooms[room].controller.level == 2){
  answer[0] = 1 //minHarv
  answer[1] = 0 //minRamp
  if(spawn.memory.energySupply.length > 1){
    answer[2] = 1 //minHarv2
    answer[3] = 2 //minUp
  } else {
    answer[2] = 0 //minHarv2
    answer[3] = 1 //minUp
  }
  answer[4] = 2 //minBuild
  answer[5] = 1 //minRep
  answer[6] = 0 //minRun
  answer[7] = 0 //minRun2
  answer[8] = 0 //minScout
  answer[9] = 0 //minSlave
  answer[10] = 0 //minErun

  return answer;
} else if(Game.rooms[room].controller.level == 3){
 answer[0] = 1 //minHarv
 answer[1] = 1 //minRamp
 if(spawn.memory.energySupply.length > 1){
   answer[2] = 1 //minHarv2
   answer[3] = 2 //minUp
 } else {
   answer[2] = 0 //minHarv2
   answer[3] = 1 //minUp
 }
 answer[4] = 2 //minBuild
 answer[5] = 2 //minRep
 answer[6] = 0 //minRun
 answer[7] = 0 //minRun2
 answer[8] = 0 //minScout
 answer[9] = 0 //minSlave
 answer[10] = 0 //minErun
 // answer[11] = 1 //minTrun

 return answer;
} else if(Game.rooms[room].controller.level == 4){
  // console.log(room);
 answer[0] = 1 //minHarv
 answer[1] = 1 //minRamp
 if(spawn.memory.energySupply.length > 1){
   answer[2] = 1 //minHarv2
   answer[3] = 1 //minUp
 } else {
   answer[2] = 0 //minHarv2
   answer[3] = 1 //minUp
 }
 answer[4] = 1 //minBuild
 answer[5] = 2 //minRep
 answer[6] = 2 //minRun
 if(Game.rooms[room].storage != undefined){
   answer[7] = 2 //minRun2
 } else {
   answer[7] = 0 //minRun2
 }
 answer[8] = 0 //minScout
 answer[9] = 0 //minSlave
 answer[10] = 2 //minErun
 // answer[11] = 1 //minTrun

 return answer;
} else {
  console.log('using default creeps. update creepCounter in Utility.js');
  // console.log(room);
 answer[0] = 1 //minHarv
 answer[1] = 1 //minRamp
 if(spawn.memory.energySupply.length > 1){
   answer[2] = 1 //minHarv2
   answer[3] = 2 //minUp
 } else {
   answer[2] = 0 //minHarv2
   answer[3] = 1 //minUp
 }
 answer[4] = 2 //minBuild
 answer[5] = 2 //minRep
 answer[6] = 2 //minRun
 if(Game.rooms[room].storage != undefined){
   answer[7] = 2 //minRun2
 } else {
   answer[7] = 0 //minRun2
 }
 answer[8] = 0 //minScout
 answer[9] = 0 //minSlave
 answer[10] = 2 //minErun
 // answer[11] = 1 //minTrun

 return answer;
}
}
