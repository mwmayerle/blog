/*
	This game initially started with a 500 x 1000 sized board, which is way too large when Chrome is set to 100%. The boardIncrement variables and the weird fractions in some of the drawing functions (boardIncement / 1.482676 or whatever) were created with the initial 500 x 1000 board dimensions in mind.
*/

window.onload = function() {
	drawInitialSetup();
	startGame();
};

var currentTetromino = {};
var currentInterval = '';
var currentGame = {};
var completeRow = [];
var completeColumn = [];
var maxVal = 0;
var rowClearAnimationTime = 60;
var nextPieceXCoords = 0;
var nextPieceYCoords = 0;

const boardIncrement = boardWidth / 10;
const shapes = ["jay", "el", "cube", "stick", "zed", "cross", "es"];
const negBoardIncrement = -(boardWidth / 10);

function generateCompleteRow() {
	for (var i = 0; i < boardWidth; i += boardWidth / 10) {
		completeRow.push(i);
	}
};

function generateCompleteColumn() {
	for (var i = 0; i < boardHeight; i += boardHeight / 20) {
		completeColumn.push(i);
	}
	maxVal = completeColumn[20] + completeColumn[1]
};

function generateNextPieceCoords() {
	nextPieceYCoords = completeColumn[2];
	nextPieceXCoords = completeRow[1] / 2;
};

function drawInitialSetup() {
	generateCompleteRow();
	generateCompleteColumn();
	generateNextPieceCoords();
	drawBackground();
	drawStatsBackground();
	drawNextPieceBackground();
};

var startGame = function() {
	currentGame = new Game();
	var previousShape = getNewTetromino();
	currentGame.previousShape = previousShape.shape;
	currentGame.nextShape = getNewTetromino();
	currentGame.drawNextTetromino();
	currentTetromino = getNewTetromino();
	currentTetromino.drawTetromino();
	currentTetromino.autoMove();
	currentTetromino.getKeyboardInput();
};

var spawnTetromino = function() {
	var newTetromino = currentGame.nextShape;
	drawNextPieceBackground();
	currentGame.nextShape = getNewTetromino();
	currentGame.drawNextTetromino();
	newTetromino.drawTetromino();
	return newTetromino;
};

var generateRandomShape = function() {
	return shapes[Math.floor(Math.random() * (7))]; // look at randomizer logic again later...
};

var getNewTetromino = function() {
	choosenShape = generateRandomShape();
	if (choosenShape === currentGame.previousShape) {
		choosenShape = generateRandomShape();
	}
	return new Tetromino(selectShape(choosenShape));
};

var selectShape = function(choosenShape) {
	switch (choosenShape) {
		case "el":
			var attributes = {
					cubePositions: [[completeRow[4], 0], [completeRow[4], completeRow[1]], [completeRow[5], 0], [completeRow[6], 0]],
					color: 'red',
					outlineColor: 'red',
					solid: true,
					shape: 'el'
			};
			break;
		case "jay":
			var attributes = {
					cubePositions: [[completeRow[4], 0], [completeRow[6], completeRow[1]], [completeRow[5], 0], [completeRow[6], 0]],
					color: 'blue',
					outlineColor: 'blue',
					solid: true,
					shape: 'jay'
			};
			break;
		case "cube":
			var attributes = {
					cubePositions: [[completeRow[4], 0], [completeRow[5], 0], [completeRow[4], completeRow[1]], [completeRow[5], completeRow[1]]],
					color: 'white',
					outlineColor: 'blue',
					solid: false,
					shape: 'cube'
			};
			break;
		case "stick":
			var attributes = {
					cubePositions: [[completeRow[3], 0], [completeRow[4], 0], [completeRow[5], 0], [completeRow[6], 0]],
					color: 'white',
					outlineColor: 'blue',
					solid: false,
					shape: 'stick'
			};
			break;
		case "zed":
			var attributes = {
					cubePositions: [[completeRow[4], 0], [completeRow[5], 0], [completeRow[5], completeRow[1]], [completeRow[6], completeRow[1]]],
					color: 'red',
					outlineColor: 'red',
					solid: true,
					shape: 'zed'
			};
			break;
		case "cross":
			var attributes = {
					cubePositions: [[completeRow[4], 0], [completeRow[5], completeRow[1]], [completeRow[5], 0], [completeRow[6], 0]],
					color: 'white',
					outlineColor: 'blue',
					solid: false,
					shape: 'cross'
			};
			break;
		case "es":
			var attributes = {
					cubePositions: [[completeRow[4], completeRow[1]], [completeRow[5], completeRow[1]], [completeRow[5], 0], [completeRow[6], 0]],
					color: 'blue',
					outlineColor: 'blue',
					solid: true,
					shape: 'es'
			};
			break;
	}
	return attributes;
};