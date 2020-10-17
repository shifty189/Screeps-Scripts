module.exports = {
    run: function(role, energy) {
        var cal = 0;
        var cal2 = 0;
        var cal3 = 0;
        var answer = [];
        var working = 0;

        if (energy < 300 && role !== 'miner') {
            answer[0] = MOVE;
            answer[1] = WORK;
            answer[2] = CARRY;
            answer[3] = MOVE;

            return answer;
        }

        else if(energy < 300 && role == 'miner'){
              answer[0] = MOVE;
              answer[1] = WORK;
              answer[2] = WORK;

              return answer;
        }

        //if miner role, calculate body type
        else if (role == 'miner') {
          cal = energy * 0.333
          cal = Math.floor(cal / 50);
          working = energy - (cal * 50);
          for (var i = 0; i < cal - 1; i++) {
              answer[i] = MOVE;
          }
          cal2 = Math.floor(energy * 0.666);
          cal2 = Math.floor(cal2 / 100);
          working = working - (cal2 * 100);
          for (var i = answer.length; i < cal2 + cal; i++) {
              answer[i] = WORK;
          }
          while(answer.length < 20  && working > 99){
            answer.push(WORK);
            working = working - 99;
          }
          while(answer.length < 50  && working > 49){
            answer.push(MOVE);
            working = working - 49;
          }
          return answer;
        }

        //if runner role, calculate body type
        else if (role == 'runner') {
            cal = energy * 0.5
            cal = Math.floor(cal / 50);
            if (cal > 4) {
                cal = 4;
            }
            for (var i = 0; i < cal; i++) {
                answer[i] = MOVE;
            }
            cal2 = energy * 0.5;
            cal2 = Math.floor(cal2 / 50);
            if (cal2 > 4) {
                cal2 = 4;
            }
            for (var i = answer.length; i < cal2 + cal; i++) {
                answer[i] = CARRY;
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
            for (var i = 0; i < cal; i++) {
                answer[i] = MOVE;
            }
            cal2 = energy * 0.3;
            cal2 = Math.floor(cal2 / 50);
            if (cal2 > 15) {
                cal2 = 15;
            }
            working = working - (cal2 * 50);
            for (var i = answer.length; i < cal2 + cal; i++) {
                answer[i] = CARRY;
            }
            cal3 = energy * 0.4;
            cal3 = Math.floor(cal3 / 100);
            if (cal3 > (50 - answer.length)) {
                cal3 = (50 - answer.length);
            }
            working = working - (cal3 * 100);
            for (var i = answer.length; i < cal2 + cal + cal3; i++) {
                answer[i] = WORK;
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
            for (var i = 0; i < cal; i++) {
                answer[i] = MOVE;
            }
            cal2 = energy * 0.333;
            cal2 = Math.floor(cal2 / 50);
            if (cal2 > 2) {
                cal2 = 2;
            }
            for (var i = answer.length; i < cal2 + cal; i++) {
                answer[i] = CARRY;
            }
            cal3 = energy * 0.333;
            cal3 = Math.floor(cal3 / 100);
            if (cal3 > (50 - answer.length)) {
                cal3 = (50 - answer.length);
            }
            for (var i = answer.length; i < cal2 + cal + cal3; i++) {
                answer[i] = WORK;
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
          cal = energy * 0.3
          cal = Math.floor(cal / 50);
          if (cal > 15) {
              cal = 15;
          }
          working = energy - (cal * 50);
          for (var i = 0; i < cal; i++) {
              answer[i] = MOVE;
          }
          cal2 = energy * 0.3;
          cal2 = Math.floor(cal2 / 50);
          if (cal2 > 15) {
              cal2 = 15;
          }
          working = working - (cal2 * 50);
          for (var i = answer.length; i < cal2 + cal; i++) {
              answer[i] = CARRY;
          }
          cal3 = energy * 0.4;
          cal3 = Math.floor(cal3 / 100);
          if (cal3 > (50 - answer.length)) {
              cal3 = (50 - answer.length);
          }
          working = working - (cal3 * 100);
          for (var i = answer.length; i < cal2 + cal + cal3; i++) {
              answer[i] = WORK;
          }
          while (answer.length < 50 && working > 49){
            answer.push(MOVE);
          }
          return answer;
        } else { //if any other role is given, make it ballanced
          cal = energy * 0.3
          cal = Math.floor(cal / 50);
          if (cal > 15) {
              cal = 15;
          }
          working = energy - (cal * 50);
          for (var i = 0; i < cal; i++) {
              answer[i] = MOVE;
          }
          cal2 = energy * 0.3;
          cal2 = Math.floor(cal2 / 50);
          if (cal2 > 15) {
              cal2 = 15;
          }
          working = working - (cal2 * 50);
          for (var i = answer.length; i < cal2 + cal; i++) {
              answer[i] = CARRY;
          }
          cal3 = energy * 0.4;
          cal3 = Math.floor(cal3 / 100);
          if (cal3 > (50 - answer.length)) {
              cal3 = (50 - answer.length);
          }
          working = working - (cal3 * 100);
          for (var i = answer.length; i < cal2 + cal + cal3; i++) {
              answer[i] = WORK;
          }
          while (answer.length < 50 && working > 49){
            answer.push(MOVE);
          }
          return answer;
        }

    }

};
