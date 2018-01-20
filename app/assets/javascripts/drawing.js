const boardWidth = 350; // make sure these two match the hardcoded values in the canvas tag view file!
const boardHeight = 700;

var getContext = function(context) {
	var tetrisCanvas = document.getElementById(context);
	var context = tetrisCanvas.getContext("2d");
	return context;
};

var drawBackground = function(context, dimensions) {
	var context = getContext(context);
	context.fillStyle = "black";
	context.fillRect(dimensions[0], dimensions[1], dimensions[2], dimensions[3]);
};

var drawStatsPieces = function() {
	//loop through shapes array and draw each shape, have this redraw when the level changes
	var shape = selectShape(shapes[0]);
}

var drawTetromino = function(object, tetrominoPositions) {
	var context = getContext("tetris");
	tetrominoPositions.forEach(function(position) {
		context.fillStyle = object.outlineColor;
		context.fillRect(position[0] + boardIncrement / 10, position[1] + boardIncrement / 10, boardIncrement / 1.1111, boardIncrement / 1.1111);
		context.fillStyle = object.color;
		context.fillRect(position[0] + boardIncrement / 5, position[1] + boardIncrement / 5, boardIncrement / 1.4286, boardIncrement / 1.4286);

		context.fillStyle = 'white'; // sparkle in top left corner
		context.fillRect(position[0] + boardIncrement / 10, position[1] + boardIncrement / 10, boardIncrement / 10, boardIncrement / 10);

		if (object.solid) { // makes the shine on solid tetrominos
			context.fillRect(position[0] + boardIncrement / 5, position[1] + boardIncrement / 5, boardIncrement / 5, boardIncrement / 10);
			context.fillRect(position[0] + boardIncrement / 5, position[1] + boardIncrement / 3.3333, boardIncrement / 10, boardIncrement / 10);
		}
	});
};
