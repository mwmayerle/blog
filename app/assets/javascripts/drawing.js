const boardWidth = 350; // make sure these two match the hardcoded values in the canvas tag view file!
const boardHeight = 700;

var getContext = function() {
	var tetrisCanvas = document.getElementById("tetris");
	var context = tetrisCanvas.getContext("2d");
	return context;
};

var drawBackground = function() {
	var context = getContext();
	context.fillStyle = "black";
	context.fillRect(0, 0, boardWidth, boardHeight);
};

var getNextPieceContext = function() {
	var nextPieceCanvas = document.getElementById("next_piece");
	var nextPieceContext = nextPieceCanvas.getContext("2d");
	return nextPieceContext;
};

var drawNextPieceBackground = function() {
	var nextPieceContext = getNextPieceContext();
	nextPieceContext.fillStyle = "black";
	nextPieceContext.fillRect(0, 0, boardWidth * 0.4 + 3, boardHeight * 0.4 + 3);
};

var getScoreContext = function() {
	var scoreCanvas = document.getElementById("score");
	var scoreContext = scoreCanvas.getContext("2d");
	return scoreContext;
};

var drawScoreBackground = function() {
	var scoreContext = getScoreContext();
	scoreContext.fillStyle = "black";
	scoreContext.fillRect(0, 0, boardWidth * 0.6, boardHeight * 0.75);
};

var getStatsContext = function() {
	var statsCanvas = document.getElementById("stats");
	var statsContext = statsCanvas.getContext("2d");
	return statsContext;
};

var drawStatsBackground = function() {
	var statsContext = getStatsContext();
	statsContext.fillStyle = "black";
	statsContext.fillRect(0, 0, boardWidth / 5, boardHeight / 5); //these are larger than the box, fix this
};