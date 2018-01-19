const boardWidth = 350; // make sure these two match the specified widths in the view file's canvas tag
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

var getPieceContext = function() {
	var pieceCanvas = document.getElementById("next_piece");
	pieceContext = pieceCanvas.getContext("2d");
	return pieceContext;
};

var drawNextPieceBackground = function() {
	var pieceContext = getPieceContext();
	pieceContext.fillStyle = "black";
	pieceContext.fillRect(0, 0, boardWidth / 2, boardHeight / 2);
};

var getStatsContext = function() {
	var statsCanvas = document.getElementById("stats");
	statsContext = statsCanvas.getContext("2d");
	return statsContext;
};

var drawStatsBackground = function() {
	var statsContext = getStatsContext();
	statsContext.fillStyle = "black";
	statsContext.fillRect(0, 0, boardWidth, boardHeight);
};