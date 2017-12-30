window.onload = function() {
	startGame();
};

var startGame = function() {
	drawBackground();
	var currentGame = new Game();
	var currentTetromino = getNewTetromino();
	currentTetromino.drawTetromino();
	currentTetromino.getDirection();
}

var getContext = function() {
	var tetrisBackground = document.getElementById("tetris");
	var context = tetrisBackground.getContext("2d");
	return context;
}

var getNewTetromino = function() {
	shape = generateRandomShape();
	return new Tetromino(selectShape(shape));
}
	
var generateRandomShape = function() {
	var shapes = ["jay", "el", "cube", "stick", "zed", "cross", "es"];
	return shapes[Math.floor(Math.random() * (7))];
}

var drawBackground = function() {
	var context = getContext();
	context.fillStyle = "black";
	context.fillRect(0, 0, 500, 1000);
}

var selectShape = function(shape) {
	switch (shape) {
		case "jay":
			var attributes = {
					cubePositions: [[200, 0], [250, 0], [200, 50], [300, 0]],
					color: 'red',
					outlineColor: 'red',
					solid: true,
					shape: 'jay'
			}
			break;
		case "el":
			var attributes = {
					cubePositions: [[200, 0], [250, 0], [300, 0], [300, 50]],
					color: 'blue',
					outlineColor: 'blue',
					solid: true,
					shape: 'el'
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
					cubePositions: [[200, 0], [250, 0], [250, 50], [300, 0]],
					color: 'white',
					outlineColor: 'blue',
					solid: false,
					shape: 'cross'
			}
			break;
		case "es":
			var attributes = {
					cubePositions: [[200, 50], [250, 0], [250, 50], [300, 0]],
					color: 'blue',
					outlineColor: 'blue',
					solid: true,
					shape: 'es'
			}
			break;
	}
	return attributes;
}

/*
The tetris NES window is 10 blocks wide and 20 blocks tall
Current plan:
	Each shape will be an object composed of blocks made with a constructor function
	Each shape has an arrangement of blocks (their coordinates) and a color as inputs
	Draw 200 cubes and keep changing colors as time goes on


	Will have an object representing filled spaces. When a row is complete on that object, it clears the row.
		the object will dictate when the game is over (see if a column is totalled) or when a tetris occurs
*/