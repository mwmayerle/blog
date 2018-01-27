const boardWidth = 275; // make sure these two match the hardcoded values in the canvas tag view file!
const boardHeight = 550;

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
	for (var i = 0; i < shapes.length; i++) {
		drawNextTetromino("stats".concat(i), selectShape(shapes[i]), true);
	}
};

var redrawBackground = function(object, tetrominoPositions) {
	var context = getContext("tetris");
	tetrominoPositions.forEach(function(position) {
		if (object instanceof Game) {
			position = position[0];
		}
		context.clearRect(position[0], position[1], boardIncrement + 1, boardIncrement + 1);
		context.fillStyle = 'black';
		context.fillRect(position[0], position[1], boardIncrement + 1, boardIncrement + 1);
	});
};

var drawTetromino = function(object, tetrominoPositions) {
	var color = '';
	var outlineColor = '';
	var solid = '';
	var context = getContext("tetris");

	tetrominoPositions.forEach(function(coords) {
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
		context.fillRect(position[0] + boardIncrement / 10, position[1] + boardIncrement / 10, boardIncrement / 1.11, boardIncrement / 1.11);
		context.fillStyle = color;
		context.fillRect(position[0] + boardIncrement / 5, position[1] + boardIncrement / 5, boardIncrement / 1.43, boardIncrement / 1.43);

		context.fillStyle = 'white'; // sparkle in top left corner
		context.fillRect(position[0] + boardIncrement / 10, position[1] + boardIncrement / 10, boardIncrement / 10, boardIncrement / 10);
		if (solid) { // makes the shine on solid tetrominos
			context.fillRect(position[0] + boardIncrement / 5, position[1] + boardIncrement / 5, boardIncrement / 5, boardIncrement / 10);
			context.fillRect(position[0] + boardIncrement / 5, position[1] + boardIncrement / 3.33, boardIncrement / 10, boardIncrement / 10);
		}
	});
};

var drawNextTetromino = function(context, nextShape, scaleDown) {
	var pieceContext = getContext(context);
	var nextPieceXCoords = boardIncrement / 2;
	var scale = 1
	if (scaleDown) {
		scale = 0.66;
		nextPieceYCoords = boardIncrement / 5;
	}
	if (nextShape.shape === 'stick' || nextShape.shape === 'cube') {
		nextPieceXCoords = boardIncrement;
	}
	nextShape.cubePositions.forEach(function(position) {
		pieceContext.fillStyle = nextShape.outlineColor;
		pieceContext.fillRect((position[0] + boardIncrement / 10 - completeRow[4] + nextPieceXCoords) * scale, (position[1] + boardIncrement / 10 + nextPieceYCoords) * scale, boardIncrement / 1.11 * scale, boardIncrement / 1.11 * scale);

		pieceContext.fillStyle = nextShape.color; // sparkle in top left corner
		pieceContext.fillRect((position[0] + boardIncrement / 5 - completeRow[4] + nextPieceXCoords) * scale, (position[1] + boardIncrement / 5 + nextPieceYCoords) * scale, boardIncrement / 1.43 * scale, boardIncrement / 1.43 * scale);

		pieceContext.fillStyle = 'white';
		pieceContext.fillRect((position[0] + boardIncrement / 10 - completeRow[4] + nextPieceXCoords) * scale, (position[1] + boardIncrement / 10 + nextPieceYCoords) * scale, boardIncrement / 10 * scale, boardIncrement / 10 * scale); 

		if (nextShape.solid) { // makes the shine on solid tetrominos
			pieceContext.fillRect((position[0] + boardIncrement / 5 - completeRow[4] + nextPieceXCoords) * scale, (position[1] + boardIncrement / 5 + nextPieceYCoords) * scale, boardIncrement / 5 * scale, boardIncrement / 10 * scale);
			pieceContext.fillRect((position[0] + boardIncrement / 5 - completeRow[4] + nextPieceXCoords) * scale, (position[1] + boardIncrement / 3.33 + nextPieceYCoords) * scale, boardIncrement / 10 * scale, boardIncrement / 10 * scale);
		}
	});
};