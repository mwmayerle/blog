const boardWidth = 350; // make sure these two match the hardcoded values in the canvas tag view file!
const boardHeight = 700;

var getContext = function(element) {
	var tetrisCanvas = document.getElementById(element);
	var context = tetrisCanvas.getContext("2d");
	return context;
};

var drawBackground = function(context, dimensions) {
	var context = getContext("tetris");
	context.fillStyle = "black";
	context.fillRect();
};

var drawNextPieceBackground = function() {
	var nextPieceContext = getContext("next_piece");
	nextPieceContext.fillStyle = "black";
	nextPieceContext.fillRect(0, 0, boardWidth * 0.4 + 3, boardHeight * 0.4 + 3);
};

var drawScoreBackground = function() {
	var scoreContext = getContext("score");
	scoreContext.fillStyle = "black";
	scoreContext.fillRect(0, 0, boardWidth * 0.6, boardHeight * 0.75);
};

var drawStatsBackground = function() {
	var statsContext = getContext("stats");
	statsContext.fillStyle = "black";
	statsContext.fillRect(0, 0, boardWidth / 5, boardHeight / 5); //these are larger than the box, fix this
};

var drawStatsPieces = function() {
	//loop through shapes array and draw each shape, have this redraw when the level changes
	var shape = selectShape(shapes[0]);
}


// this.cubePositions.forEach(function(position) {
// 	context.fillStyle = that.outlineColor;
// 	context.fillRect(position[0] + boardIncrement / 10, position[1] + boardIncrement / 10, boardIncrement / 1.1111, boardIncrement / 1.1111);

// 	context.fillStyle = that.color;
// 	context.fillRect(position[0] + boardIncrement / 5, position[1] + boardIncrement / 5, boardIncrement / 1.4286, boardIncrement / 1.4286);

// 	context.fillStyle = 'white';
// 	context.fillRect(position[0] + boardIncrement / 10, position[1] + boardIncrement / 10, boardIncrement / 10, boardIncrement / 10); // sparkle in top left corner

// 	if (that.solid) { // makes the shine on solid tetrominos
// 		context.fillRect(position[0] + boardIncrement / 5, position[1] + boardIncrement / 5, boardIncrement / 5, boardIncrement / 10);
// 		context.fillRect(position[0] + boardIncrement / 5, position[1] + boardIncrement / 3.3333, boardIncrement / 10, boardIncrement / 10);
// 	}
// });
