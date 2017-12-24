window.onload = function() {
	startGame();
};

var xCoord = 200;
var yCoord = 0;
var offsetLeft = xCoord - 50;
var offsetRight = xCoord + 50;
var offsetFarRight = xCoord + 100;
var offsetDown = yCoord + 50;
var offsetFarDown = yCoord + 100;
var offsetDownMore = yCoord + 150;

var startGame = function() {
	drawBackground();
	var currentTetromino = selectTetromino();
	currentTetromino.drawTetromino();
	createInterval(currentTetromino);
}

var getContext = function() {
	var tetrisBackground = document.getElementById("tetris");
	var context = tetrisBackground.getContext("2d");
	return context;
}

var drawBackground = function() {
	var context = getContext();
	context.fillStyle = "black";
	context.fillRect(0, 0, 500, 1000);
}

var selectTetromino = function() {
	shape = generateRandomShape();
	return new Tetromino(selectShape(shape));
}
	
var generateRandomShape = function() {
	var shapes = ["jay", "el", "cube", "stick", "zed", "cross", "es"];
	return shapes[Math.floor(Math.random() * (7))];
}

var createInterval = function(currentTetromino) {
	var interval = setInterval(moveDownOnce, 1000);
	function moveDownOnce() {
		currentTetromino.redrawBackground();
		currentTetromino.moveShapeDown();
		currentTetromino.drawTetromino();
	}
}

var selectShape = function(shape) {
	switch (shape) {
		case "jay":
			var attributes = {
					cubePositions: [[xCoord, yCoord], [offsetRight, yCoord], [offsetFarRight, yCoord], [xCoord, offsetDown]],
					color: 'red',
					outlineColor: 'red',
					solid: true,
					shape: 'jay'
			}
			break;
		case "el":
			var attributes = {
					cubePositions: [[xCoord, yCoord], [offsetRight, yCoord], [offsetFarRight, yCoord], [offsetFarRight, offsetDown]],
					color: 'blue',
					outlineColor: 'blue',
					solid: true,
					shape: 'el'
			}
			break;
		case "cube":
			var attributes = {
					cubePositions: [[xCoord, yCoord], [offsetRight, yCoord], [xCoord, offsetDown], [offsetRight, offsetDown]],
					color: 'white',
					outlineColor: 'blue',
					solid: false,
					shape: 'cube'
			}
			break;
		case "stick":
			var attributes = {
					cubePositions: [[offsetLeft, yCoord], [xCoord, yCoord], [offsetRight, yCoord], [offsetFarRight, yCoord]],
					color: 'white',
					outlineColor: 'blue',
					solid: false,
					shape: 'stick'
			}
			break;
		case "zed":
			var attributes = {
					cubePositions: [[xCoord, yCoord], [offsetRight, yCoord], [offsetRight, offsetDown], [offsetFarRight, offsetDown]],
					color: 'red',
					outlineColor: 'red',
					solid: true,
					shape: 'zed'
			}
			break;
		case "cross":
			var attributes = {
					cubePositions: [[xCoord, yCoord], [offsetRight, yCoord], [offsetFarRight, yCoord], [offsetRight, offsetDown]],
					color: 'white',
					outlineColor: 'blue',
					solid: false,
					shape: 'cross'
			}
			break;
		case "es":
			var attributes = {
					cubePositions: [[offsetRight, yCoord], [offsetFarRight, yCoord], [offsetRight, offsetDown], [xCoord, offsetDown]],
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
