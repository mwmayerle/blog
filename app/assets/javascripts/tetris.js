window.onload = function() {
	drawBackground();
};

var xCoord = 200;
var yCoord = 0;
var offsetLeft = xCoord - 50;
var offsetRight = xCoord + 50;
var offsetFarRight = xCoord + 100;
var offsetDown = yCoord + 50;
var offsetFarDown = yCoord + 100;
var offsetDownMore = yCoord + 150;

var drawBackground = function() {
	var tetrisBackground = document.getElementById("tetris");
	var tetrisBackgroundContext = tetrisBackground.getContext("2d");

	tetrisBackgroundContext.fillStyle = "black";
	tetrisBackgroundContext.fillRect(0, 0, 500, 1000);

	new Tetromino(generateRandomShape(), xCoord, yCoord);
}

var generateRandomShape = function() {
	var shapes = ["jay", "el", "cube", "stick", "zed", "cross", "es"];
	return shapes[Math.floor(Math.random() * (7))];
}

var drawShape = function(shape) {
	switch (shape) {
		case "jay":
			var positions = [[xCoord, yCoord], [offsetRight, yCoord], [offsetFarRight, yCoord], [xCoord, offsetDown]];
			jay(positions);
			break;

		case "el":
			var positions = [[xCoord, yCoord], [offsetRight, yCoord], [offsetFarRight, yCoord], [offsetFarRight, offsetDown]];
			el(positions);
			break;

		case "cube":
			var positions = [[xCoord, yCoord], [offsetRight, yCoord], [xCoord, offsetDown], [offsetRight, offsetDown]];
			cube(positions);
			break;

		case "stick":
			var positions = [[offsetLeft, yCoord], [xCoord, yCoord], [offsetRight, yCoord], [offsetFarRight, yCoord]];
			stick(positions);
			break;

		case "zed":
			var positions = [[xCoord, yCoord], [offsetRight, yCoord], [offsetRight, offsetDown], [offsetFarRight, offsetDown]];
			zed(positions);
			break;

		case "cross":
			var positions = [[xCoord, yCoord], [offsetRight, yCoord], [offsetFarRight, yCoord], [offsetRight, offsetDown]];
			cross(positions);
			break;

		case "es":
			var positions = [[offsetRight, yCoord], [offsetFarRight, yCoord], [offsetRight, offsetDown], [xCoord, offsetDown]];
			es(positions);
			break;
	}
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
