/*
The tetris NES window is 10 blocks wide and 20 blocks tall
Current plan:
	Each shape will be an object composed of blocks made with a constructor function
	Each shape has an arrangement of blocks (their coordinates) and a color as inputs
	Draw 200 cubes and keep changing colors as time goes on
*/

window.onload = function() {
	drawBackground();
};

var drawBackground = function() {
	var tetrisBackground = document.getElementById("tetris");
	var tetrisBackgroundContext = tetrisBackground.getContext("2d");

	tetrisBackgroundContext.fillStyle = "black";
	tetrisBackgroundContext.fillRect(0, 0, 500, 1000); //fillRect(x coordinate, y coordinate, width, height)

	// cube(200, 0);
	// stick(200, 0);
	// cross(200, 0);
	// zed(200, 0);
	// jay(200, 0);
	// el(200, 0);
	// ess(200, 0);
	// zed(200, 0);
}

var generateRandomShape = function() {
	var shapes = ["jay", "el", "cube", "stick", "ZED", "cross", "ESS"];
	return shapes[Math.floor(Math.random() * (7))];
}