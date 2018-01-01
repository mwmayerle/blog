window.onload = function() {
	startGame();
};

var currentTetromino = {};
var currentGame = {};

const left = -50; //
const up = -50;   // I know these repease but making these is far easier for understanding what is happening later
const right = 50; //
const down = 50;  //

var Game = function() {
	this.occupiedPositions = [];
	this.score = 0;
	this.level = 0;
}

var startGame = function() {
	drawBackground();
	currentGame = new Game();
	currentTetromino = spawnTetromino();
	currentTetromino.getKeyboardInput();
}

var spawnTetromino = function() {
	var newTetromino = getNewTetromino();
	newTetromino.drawTetromino();
	return newTetromino;
}

var generateRandomShape = function() { // need to compare this to the offical randomizer
	var shapes = ["jay", "el", "cube", "stick", "zed", "cross", "es"];
	return shapes[Math.floor(Math.random() * (7))];
}

var getNewTetromino = function() {
	shape = generateRandomShape();
	return new Tetromino(selectShape(shape));
}

var selectShape = function(shape) {
	switch (shape) {
		case "el":
			var attributes = {
					cubePositions: [[200, 0], [200, 50], [250, 0], [300, 0]],
					color: 'red',
					outlineColor: 'red',
					solid: true,
					shape: 'el'
			}
			break;
		case "jay":
			var attributes = {
					cubePositions: [[200, 0], [300, 50], [250, 0], [300, 0]],
					color: 'blue',
					outlineColor: 'blue',
					solid: true,
					shape: 'jay'
			}
			break;
		case "cube":
			var attributes = {
					cubePositions: [[200, 0], [250, 0], [200, 50], [250, 50]],
					color: 'white',
					outlineColor: 'blue',
					solid: false,
					shape: 'cube'
			}
			break;
		case "stick":
			var attributes = {
					cubePositions: [[150, 0], [200, 0], [250, 0], [300, 0]],
					color: 'white',
					outlineColor: 'blue',
					solid: false,
					shape: 'stick'
			}
			break;
		case "zed":
			var attributes = {
					cubePositions: [[200, 0], [250, 0], [250, 50], [300, 50]],
					color: 'red',
					outlineColor: 'red',
					solid: true,
					shape: 'zed'
			}
			break;
		case "cross":
			var attributes = {
					cubePositions: [[200, 0], [250, 50], [250, 0], [300, 0]],
					color: 'white',
					outlineColor: 'blue',
					solid: false,
					shape: 'cross'
			}
			break;
		case "es":
			var attributes = {
					cubePositions: [[200, 50], [250, 50], [250, 0], [300, 0]],
					color: 'blue',
					outlineColor: 'blue',
					solid: true,
					shape: 'es'
			}
			break;
	}
	return attributes;
}