var cube = function(xCoord, yCoord) {
	var tetrisBackground = document.getElementById("tetris");
	var tetrisBackgroundContext = tetrisBackground.getContext("2d");

	tetrisBackgroundContext.fillStyle = "red"; //top left
	tetrisBackgroundContext.fillRect(xCoord, yCoord, 50, 50);

	tetrisBackgroundContext.fillStyle = "green";  //top right
	tetrisBackgroundContext.fillRect(xCoord + 50, yCoord, 50, 50);

	tetrisBackgroundContext.fillStyle = "blue"; //bottom left
	tetrisBackgroundContext.fillRect(xCoord, yCoord + 50, 50, 50);

	tetrisBackgroundContext.fillStyle = "orange"; //bottom right
	tetrisBackgroundContext.fillRect(xCoord + 50, yCoord + 50, 50, 50);
}

var stick = function(xCoord, yCoord) {
	var tetrisBackground = document.getElementById("tetris");
	var tetrisBackgroundContext = tetrisBackground.getContext("2d");

	tetrisBackgroundContext.fillStyle = "red"; //top
	tetrisBackgroundContext.fillRect(xCoord - 50, yCoord, 50, 50);

	tetrisBackgroundContext.fillStyle = "green";  //middle
	tetrisBackgroundContext.fillRect(xCoord, yCoord, 50, 50);

	tetrisBackgroundContext.fillStyle = "blue"; //middle
	tetrisBackgroundContext.fillRect(xCoord + 50, yCoord, 50, 50);

	tetrisBackgroundContext.fillStyle = "orange"; //bottom
	tetrisBackgroundContext.fillRect(xCoord + 100, yCoord, 50, 50);
}

var cross = function(xCoord, yCoord) {
	var tetrisBackground = document.getElementById("tetris");
	var tetrisBackgroundContext = tetrisBackground.getContext("2d");

	tetrisBackgroundContext.fillStyle = "red"; //top left
	tetrisBackgroundContext.fillRect(xCoord, yCoord, 50, 50);

	tetrisBackgroundContext.fillStyle = "green";  //top middle
	tetrisBackgroundContext.fillRect(xCoord + 50, yCoord, 50, 50);

	tetrisBackgroundContext.fillStyle = "blue"; //top right
	tetrisBackgroundContext.fillRect(xCoord + 100, yCoord, 50, 50);

	tetrisBackgroundContext.fillStyle = "orange"; //bottom
	tetrisBackgroundContext.fillRect(xCoord + 50, yCoord + 50, 50, 50);
}

var jay = function(xCoord, yCoord) {
	var tetrisBackground = document.getElementById("tetris");
	var tetrisBackgroundContext = tetrisBackground.getContext("2d");

	tetrisBackgroundContext.fillStyle = "red"; //top left
	tetrisBackgroundContext.fillRect(xCoord, yCoord, 50, 50);

	tetrisBackgroundContext.fillStyle = "green";  //top middle
	tetrisBackgroundContext.fillRect(xCoord + 50, yCoord, 50, 50);

	tetrisBackgroundContext.fillStyle = "blue"; //top right
	tetrisBackgroundContext.fillRect(xCoord + 100, yCoord, 50, 50);

	tetrisBackgroundContext.fillStyle = "orange"; //bottom
	tetrisBackgroundContext.fillRect(xCoord, yCoord + 50, 50, 50);
}

var el = function(xCoord, yCoord) {
	var tetrisBackground = document.getElementById("tetris");
	var tetrisBackgroundContext = tetrisBackground.getContext("2d");

	tetrisBackgroundContext.fillStyle = "red"; //top left
	tetrisBackgroundContext.fillRect(xCoord, yCoord, 50, 50);

	tetrisBackgroundContext.fillStyle = "green";  //top middle
	tetrisBackgroundContext.fillRect(xCoord + 50, yCoord, 50, 50);

	tetrisBackgroundContext.fillStyle = "blue"; //top right
	tetrisBackgroundContext.fillRect(xCoord + 100, yCoord, 50, 50);

	tetrisBackgroundContext.fillStyle = "orange"; //bottom
	tetrisBackgroundContext.fillRect(xCoord + 100, yCoord + 50, 50, 50);
}

var es = function(xCoord, yCoord) {
	var tetrisBackground = document.getElementById("tetris");
	var tetrisBackgroundContext = tetrisBackground.getContext("2d");

	tetrisBackgroundContext.fillStyle = "red"; //top center
	tetrisBackgroundContext.fillRect(xCoord + 50, yCoord, 50, 50);

	tetrisBackgroundContext.fillStyle = "green";  //top right
	tetrisBackgroundContext.fillRect(xCoord + 100, yCoord, 50, 50);

	tetrisBackgroundContext.fillStyle = "blue"; //bottom right
	tetrisBackgroundContext.fillRect(xCoord + 50, yCoord + 50, 50, 50);

	tetrisBackgroundContext.fillStyle = "orange"; //bottom left
	tetrisBackgroundContext.fillRect(xCoord, yCoord + 50, 50, 50);
}

var zed = function(xCoord, yCoord) {
	var tetrisBackground = document.getElementById("tetris");
	var tetrisBackgroundContext = tetrisBackground.getContext("2d");

	tetrisBackgroundContext.fillStyle = "red"; //top left
	tetrisBackgroundContext.fillRect(xCoord, yCoord, 50, 50);

	tetrisBackgroundContext.fillStyle = "green";  //top right
	tetrisBackgroundContext.fillRect(xCoord + 50, yCoord, 50, 50);

	tetrisBackgroundContext.fillStyle = "blue"; //bottom left
	tetrisBackgroundContext.fillRect(xCoord + 50, yCoord + 50, 50, 50);

	tetrisBackgroundContext.fillStyle = "orange"; //bottom right
	tetrisBackgroundContext.fillRect(xCoord + 100, yCoord + 50, 50, 50);
}