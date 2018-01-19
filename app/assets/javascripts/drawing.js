const boardWidth = 350; // make sure these two are 1 or 2 units short of the hardcoded values in the canvas tag view file!
const boardHeight = 700;

var getContext = function() {
	var tetrisCanvas = document.getElementById("tetris");
	context = tetrisCanvas.getContext("2d");
	return context;
};

var drawBackground = function() {
	var context = getContext();
	context.fillStyle = "black";
	context.fillRect(0, 0, boardWidth, boardHeight);
};

var getStatsContext = function() {
	var statsCanvas = document.getElementById("stats");
	statsContext = statsCanvas.getContext("2d");
	return statsContext;
};

var drawStatsBackground = function() {
	var statsContext = getStatsContext();
	statsContext.fillStyle = "black";
	statsContext.fillRect(0, 0, boardWidth, boardHeight); //these are larger than the box, fix this
};

var getNextPieceContext = function() {
	var nextPieceCanvas = document.getElementById("next_piece");
	nextPieceContext = nextPieceCanvas.getContext("2d");
	return nextPieceContext;
};

var drawNextPieceBackground = function() {
	var nextPieceContext = getNextPieceContext();
	nextPieceContext.fillStyle = "black";
	nextPieceContext.fillRect(0, 0, boardWidth * 0.4 + 3, boardHeight * 0.4 + 3);
};
