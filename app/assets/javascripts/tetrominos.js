var Tetromino = function(shape, xCoord, yCoord) {
	this.shape = drawShape(shape);
}

Tetromino.prototype.rotateShape = function() {
// code here
};

var drawTetromino = function(positions, context, color, outlineColor, solid) {
	positions.forEach(function(position) {

		context.fillStyle = 'black';
		context.fillRect(position[0], position[1], 50, 50);

		context.fillStyle = outlineColor;
		context.fillRect(position[0] + 5, position[1] + 5, 45, 45);

		context.fillStyle = color;
		context.fillRect(position[0] + 10, position[1] + 10, 35, 35);

		context.fillStyle = 'white';
		context.fillRect(position[0] + 5, position[1] + 5, 5, 5); // sparkle in top left corner

		if (solid == true) { // makes the shine on solid tetrominos
			context.fillRect(position[0] + 10, position[1] + 10, 10, 5);
			context.fillRect(position[0] + 10, position[1] + 15, 5, 5);
		}
	});
}

var getContext = function() {
	var tetrisBackground = document.getElementById("tetris");
	var context = tetrisBackground.getContext("2d");
	return context;
}

var cube = function(positions) {
	var context = getContext();
	var color = 'white';
	var outlineColor = 'blue';
	var solid = false;
	drawTetromino(positions, context, color, outlineColor, solid);
}

var stick = function(positions) {
	var context = getContext();
	var color = 'white';
	var outlineColor = 'blue';
	var solid = false;
	drawTetromino(positions, context, color, outlineColor, solid);
}

var cross = function(positions) {
	var context = getContext();
	var color = 'white';
	var outlineColor = 'blue';
	var solid = false;
	drawTetromino(positions, context, color, outlineColor, solid);
}

var jay = function(positions) {
	var context = getContext();
	var color = 'red';
	var outlineColor = 'red';
	var solid = true;
	drawTetromino(positions, context, color, outlineColor, solid);
}

var el = function(positions) {
	var context = getContext();
	var color = 'blue';
	var outlineColor = 'blue';
	var solid = true;
	drawTetromino(positions, context, color, outlineColor, solid);
}

var es = function(positions) {
	var context = getContext();
	var color = 'blue';
	var outlineColor = 'blue';
	var solid = true;
	drawTetromino(positions, context, color, outlineColor, solid);
}

var zed = function(positions) {
	var context = getContext();
	var color = 'red';
	var outlineColor = 'red';
	var solid = true;
	drawTetromino(positions, context, color, outlineColor, solid);
}