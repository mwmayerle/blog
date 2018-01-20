const boardWidth = 350; // make sure these two match the hardcoded values in the canvas tag view file!
const boardHeight = 700;

var getContext = function(context) {
	var tetrisCanvas = document.getElementById(context);
	var context = tetrisCanvas.getContext("2d");
	return context;
};

var drawBackground = function(context, dimensions, object) {
	var context = getContext(context);
	context.fillStyle = "black";
	context.fillRect(dimensions[0], dimensions[1], dimensions[2], dimensions[3]);
};

var drawStatsPieces = function() {
	//loop through shapes array and draw each shape, have this redraw when the level changes
	var shape = selectShape(shapes[0]);
}

var redrawBackground = function(object, tetrominoPositions) {
	var context = getContext("tetris");
	tetrominoPositions.forEach(function(position) {
		if (object instanceof Game) {
			position = position[0];
		}
		context.clearRect(position[0], position[1], boardIncrement, boardIncrement);
		context.fillStyle = 'black';
		context.fillRect(position[0], position[1], boardIncrement, boardIncrement);
	});
};

var drawTetromino = function(object, tetrominoPositions) {
	var context = getContext("tetris");
	tetrominoPositions.forEach(function(coords) {
		var color = '';
		var outlineColor = '';
		var solid = '';

		if (object instanceof Game) {
			position = coords[0]; //currentGame.occupiedPositions array contains position array AND attributes
			color = coords[1];
			outlineColor = coords[2];
			solid = coords[3];
		} else {
			position = coords;
			color = object.color;
			outlineColor = object.outlineColor
			solid = object.solid;
		}

		context.fillStyle = outlineColor;
		context.fillRect(position[0] + boardIncrement / 10, position[1] + boardIncrement / 10, boardIncrement / 1.1111, boardIncrement / 1.1111);
		context.fillStyle = color;
		context.fillRect(position[0] + boardIncrement / 5, position[1] + boardIncrement / 5, boardIncrement / 1.4286, boardIncrement / 1.4286);

		context.fillStyle = 'white'; // sparkle in top left corner
		context.fillRect(position[0] + boardIncrement / 10, position[1] + boardIncrement / 10, boardIncrement / 10, boardIncrement / 10);
		if (solid) { // makes the shine on solid tetrominos
			context.fillRect(position[0] + boardIncrement / 5, position[1] + boardIncrement / 5, boardIncrement / 5, boardIncrement / 10);
			context.fillRect(position[0] + boardIncrement / 5, position[1] + boardIncrement / 3.3333, boardIncrement / 10, boardIncrement / 10);
		}
	});
};