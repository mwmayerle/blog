/*

The tetris NES window is 10 blocks wide and 20 blocks tall

fillRect(x coordinate, y coordinate, width, height)

*/

window.onload = function() {
	drawBackground();
};

var drawBackground = function() {
	var tetrisMain = document.getElementById("tetris");
	var tetrisMainContext = tetrisMain.getContext("2d");

	tetrisMainContext.fillStyle = "black";
	tetrisMainContext.fillRect(0,0,500,1000);
}