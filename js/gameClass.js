/**
 * Main class of the game
 * @constructor
 */
function Game(timer){
	this.timer = timer;
}
/**
 * Method which start timer of the game
 */
Game.prototype.start = function(){
	this.timer.start();
};
/**
 * Method which count steps of game
 */
Game.prototype.counter = function(){
	var counter = document.getElementById('counter').innerHTML;
	counter++;
	document.getElementById('counter').innerHTML = counter;
};

