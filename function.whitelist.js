module.exports = {
    run: function(name) {
if (Game.spawns['Spawn1'].memory.whiteList == name){
  return true;
} else {
  return false;
}

}
};
