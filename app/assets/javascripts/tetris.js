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
var rowClearAnimationTime = 50;
var nextPieceXCoords = 0;
var nextPieceYCoords = 0;

const solidColors = ['#58d854', '#DF5FDF', '#9FDF00', '#7c7c7c', '#a80020', '#1A72FF', '#fdc158', '#3FDF7F', '#F60000', '#fb9b13'];
const outlineColors = ['#0058f8', '#BF00B3', '#00a800', '#f83800', '#4F2BE3', '#0025C5', '#f83800', '#E40058', '#0000FF', '#E40058'];
const boardIncrement = boardWidth / 10;
const shapes = ["cross", "jay", "zed", "cube", "es", "el", "stick"];
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
	nextPieceYCoords = completeColumn[1] / 2;
	nextPieceXCoords = completeRow[1] / 2;
};

function drawInitialSetup() {
	generateCompleteRow();
	generateCompleteColumn();
	generateNextPieceCoords();
	drawBackground("tetris",[0, 0, boardWidth, boardHeight]);
	drawBackground("next_piece", [0, 0, boardWidth * 0.4 + 3, boardHeight * 0.4 + 3]);
};

var startGame = function() {
	currentGame = new Game();
	drawStatsPieces();
	var previousShape = getNewTetromino();
	currentGame.previousShape = previousShape.shape;
	currentGame.nextShape = getNewTetromino();
	drawNextTetromino("next_piece", currentGame.nextShape, 0);
	currentTetromino = getNewTetromino();
	drawTetromino(currentTetromino, currentTetromino.cubePositions);
	currentTetromino.autoMove();
	currentTetromino.getKeyboardInput();
};

var spawnTetromino = function() {
	var newTetromino = currentGame.nextShape;
	drawBackground("next_piece", [0, 0, boardWidth * 0.4 + 3, boardHeight * 0.4 + 3]);
	currentGame.nextShape = getNewTetromino();
	drawNextTetromino("next_piece", currentGame.nextShape, 0);
	drawTetromino(newTetromino, newTetromino.cubePositions);
	return newTetromino;
};

var generateRandomShape = function() {
	return shapes[Math.floor(Math.random() * (7))]; // look at randomizer logic again later...
};

var generateRandomColorScheme = function() {
	return solidColors[Math.floor(Math.random() * (solidColors.length))]
}

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
					color: outlineColors[currentGame.level % 10],
					outlineColor: outlineColors[currentGame.level % 10],
					solid: true,
					shape: 'el'
			};
			break;
		case "jay":
			var attributes = {
					cubePositions: [[completeRow[4], 0], [completeRow[6], completeRow[1]], [completeRow[5], 0], [completeRow[6], 0]],
					color: solidColors[currentGame.level % 10],
					outlineColor: solidColors[currentGame.level % 10],
					solid: true,
					shape: 'jay'
			};
			break;
		case "cube":
			var attributes = {
					cubePositions: [[completeRow[4], 0], [completeRow[5], 0], [completeRow[4], completeRow[1]], [completeRow[5], completeRow[1]]],
					color: 'white',
					outlineColor: outlineColors[currentGame.level % 10],
					solid: false,
					shape: 'cube'
			};
			break;
		case "stick":
			var attributes = {
					cubePositions: [[completeRow[3], 0], [completeRow[4], 0], [completeRow[5], 0], [completeRow[6], 0]],
					color: 'white',
					outlineColor: outlineColors[currentGame.level % 10],
					solid: false,
					shape: 'stick'
			};
			break;
		case "zed":
			var attributes = {
					cubePositions: [[completeRow[4], 0], [completeRow[5], 0], [completeRow[5], completeRow[1]], [completeRow[6], completeRow[1]]],
					color: outlineColors[currentGame.level % 10],
					outlineColor: outlineColors[currentGame.level % 10],
					solid: true,
					shape: 'zed'
			};
			break;
		case "cross":
			var attributes = {
					cubePositions: [[completeRow[4], 0], [completeRow[5], completeRow[1]], [completeRow[5], 0], [completeRow[6], 0]],
					color: 'white',
					outlineColor: outlineColors[currentGame.level % 10],
					solid: false,
					shape: 'cross'
			};
			break;
		case "es":
			var attributes = {
					cubePositions: [[completeRow[4], completeRow[1]], [completeRow[5], completeRow[1]], [completeRow[5], 0], [completeRow[6], 0]],
					color: solidColors[currentGame.level % 10],
					outlineColor: solidColors[currentGame.level % 10],
					solid: true,
					shape: 'es'
			};
			break;
	}
	return attributes;
};