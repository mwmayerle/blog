var getContext = function() {
	var tetrisBackground = document.getElementById("tetris");
	var context = tetrisBackground.getContext("2d");
	return context;
}

var drawBackground = function() {
	var context = getContext();
	context.fillStyle = "black";
	context.fillRect(0, 0, 500, 1000);
}

var blackOutCompleteRow = function(deletedIndicies) {
	var context = getContext();
	deletedIndicies.forEach(function(position) {
		context.clearRect(position[0][0], position[0][1], 50, 50);
		context.fillStyle = 'black';
		context.fillRect(position[0][0], position[0][1], 50, 50);
	});
}