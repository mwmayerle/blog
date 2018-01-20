const boardWidth = 350; // make sure these two match the hardcoded values in the canvas tag view file!
const boardHeight = 700;

var getContext = function(element) {
	var tetrisCanvas = document.getElementById(element);
	var context = tetrisCanvas.getContext("2d");
	return context;
};

var drawBackground = function() {
	var context = getContext("tetris");
	context.fillStyle = "black";
	context.fillRect(0, 0, boardWidth, boardHeight);
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
	var statsContext = getContext("stats");
}