window.onload = function() {
	startGame();
};

var Game = function() { //occupiedCols will start in the top left corner like the canvas grid
	this.score = 0;
	this.speed = 750;
	this.occupiedColumns = {1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '', 10: ''};
}

var left = -50;
var up = -50;
var right = 50;
var down = 50;

var getContext = function() {
	var tetrisBackground = document.getElementById("tetris");
	var context = tetrisBackground.getContext("2d");
	return context;
}

var startGame = function() {
	drawBackground();
	var currentGame = new Game();
	var currentTetromino = getNewTetromino();
	currentTetromino.drawTetromino();
	currentTetromino.getDirection();
}

var drawBackground = function() {
	var context = getContext();
	context.fillStyle = "black";
	context.fillRect(0, 0, 500, 1000);
}

var generateRandomShape = function() {
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