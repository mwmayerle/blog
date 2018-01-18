const boardWidth = 350; // make sure these two match the specified widths in the view file's canvas tag
const boardHeight = 700;

var getContext = function() {
	var tetrisBackground = document.getElementById("tetris");
	var context = tetrisBackground.getContext("2d");
	return context;
}

var drawBackground = function() {
	var context = getContext();
	context.fillStyle = "black";
	context.fillRect(0, 0, boardWidth, boardHeight);
}