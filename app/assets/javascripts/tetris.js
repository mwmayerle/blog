/*
The tetris NES window is 10 blocks wide and 20 blocks tall

fillRect(x coordinate, y coordinate, width, height)

Current plan:
	Each shape will be an object composed of blocks made with a constructor function
	Each shape has an arrangement of blocks (their coordinates) and a color as inputs
	Draw 200 cubes and keep changing colors as time goes on
*/

window.onload = function() {
	drawBackground();
};


/* Background consists of 10 x 20 cubes colored black. Each row is generated within the
	drawRow() function. drawRow() increments x coordinates while holding y coordinates steady
*/
var drawBackground = function() {
	var tetrisMain = document.getElementById("tetris");
	var tetrisMainContext = tetrisMain.getContext("2d");

	var rowNum;
	var cubeY = 0;

	for (rowNum = 0; rowNum < 20; rowNum++) {
		drawRow(tetrisMain, tetrisMainContext, rowNum);
	}
}

var drawRow = function(tetrisMain, tetrisMainContext, rowNum) {
	rowNum *= 50; 
	var cubeX = 0;
	var currentBlock;

	for (currentBlock = 0; currentBlock < 10; currentBlock++) {
		tetrisMainContext.fillStyle = "black";
		tetrisMainContext.fillRect(cubeX, rowNum, 50, 50);
		cubeX += 50;
	}
}