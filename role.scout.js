module.exports = {
    run: function(creep) {
      // creep.suicide();

        // creep.say('scrout');
        if (creep.room != Game.rooms.W2N7) {
            creep.moveTo(new RoomPosition(2, 39, 'W2N7'));
        } else {
          console.log(creep.claimController(creep.room.controller));
            if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller)
            }
        }

    }

};
