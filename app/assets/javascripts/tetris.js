/*
	This game initially started with a 500 x 1000 sized board, which is way too large when Chrome is set to 100%. The boardIncrement variables and the weird fractions in some of the drawing functions (boardIncement / 1.482676 or whatever) were created with the initial 500 x 1000 board dimensions in mind.
*/
window.onload = function() {
	document.getElementById("music_theme").play();
	drawInitialSetup();
	startGame();
	toggleMusic();
	sendScore();
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

var showSubmissionForm = function() {
	$("#container").css("display", "absolute");
	$("#gameover_form").css("visibility", "visible");
};

var toggleMusic = function() {
	$("#music").on("click", function() { 
		if ($(this).text().includes("MUSIC OFF")) {
			document.getElementById("music_theme").pause();
			$(this).html("<p>" + "MUSIC ON" + "</p>");
		} else {
			document.getElementById("music_theme").play();
			$(this).html("<p>" + "MUSIC OFF" + "</p>");
		}
	});
};

var generateCompleteRow = function() {
	for (var i = 0; i < boardWidth; i += boardWidth / 10) {
		completeRow.push(i);
	}
};

var generateCompleteColumn = function() {
	for (var i = 0; i < boardHeight; i += boardHeight / 20) {
		completeColumn.push(i);
	}
	maxVal = completeColumn[20] + completeColumn[1];
};

var generateNextPieceCoords = function() {
	nextPieceYCoords = completeColumn[1] / 2;
	nextPieceXCoords = completeRow[1] / 2;
};

var drawInitialSetup = function() {
	generateCompleteRow();
	generateCompleteColumn();
	generateNextPieceCoords();
	drawBackground("tetris",[0, 0, boardWidth, boardHeight]);
	drawBackground("next_piece", [0, 0, boardWidth * 0.4 + 3, boardHeight * 0.4 + 3]);
};

var startGame = function() {
	currentGame = new Game();
	drawStatsPieces();
	getNewTetrominoSequence();
	currentGame.previousShape = currentGame.tetrominoBag.shift();
	currentGame.nextShape = currentGame.tetrominoBag.shift();
	currentTetromino = currentGame.tetrominoBag.shift();
	drawNextTetromino("next_piece", currentGame.nextShape, 0);
	drawTetromino(currentTetromino, currentTetromino.cubePositions);
	currentTetromino.autoMove();
	document.addEventListener("keydown", pressingKey);
};

var spawnTetromino = function() {
	var newTetromino = currentGame.nextShape;
	drawBackground("next_piece", [0, 0, boardWidth * 0.4 + 3, boardHeight * 0.4 + 3]);
	currentGame.nextShape = currentGame.tetrominoBag.shift();
	drawNextTetromino("next_piece", currentGame.nextShape, 0);
	drawTetromino(newTetromino, newTetromino.cubePositions);
	return newTetromino;
};

var generateRandomShape = function() {
	return shapes[Math.floor(Math.random() * (7))]; // look at randomizer logic again later...
};

var getNewTetrominoSequence = function() {
	var newShapes = [];
	while (currentGame.tetrominoBag.length < 7) {
		var newShape = generateRandomShape();
		if (!newShapes.includes(newShape)) {
			newShapes.push(newShape);
			currentGame.tetrominoBag.push(new Tetromino(selectShape(newShape)));
		}
	}
};

var removePressingKey = function() {
	document.removeEventListener("keydown", pressingKey);
};

var pressingKey = function() {
	redrawBackground(currentTetromino, currentTetromino.cubePositions);
	switch (event.keyCode) {
		case 65: // A
			currentTetromino.moveLeft();
			break;
		case 83: // S
			if (!currentTetromino.allowedDown()) {
				currentTetromino.moveDown();
			}
			break;
		case 68:// D
			currentTetromino.moveRight();
			break;
		case 32:// Spacebar
			while (!currentTetromino.allowedDown()) {
				currentTetromino.moveDown();
			}
			removePressingKey();
			break;
		default:
			if (!currentTetromino.allowedDown()) {
				currentTetromino.rotateTetromino();
			}
		}
	drawTetromino(currentTetromino, currentTetromino.cubePositions);
};

var sendScore = function() {
	$("#the_form").on("submit", function(event) {
		event.preventDefault();

		var $form = $(this);
		var playerName = $form.find("#player_name").val();
		var playerNameLength = $form.find("#player_name").val().length;
		var playerScore = $("#score_amount").text();

		if (playerNameLength <= 3) {
			var request = $.ajax({
				type: $form.attr("method"),
				url: $form.attr("action"),
				headers: {
					'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
				},
				data: {
					player_name: playerName,
					player_score: playerScore
				}
			});

			request.done(function(response) {
				$("#gameover_form").hide();
				location.reload();
				});

			request.fail(function(response) {
				console.log(response);
			});
		} else {
			$("#three_chars").css("color", "red");
		}
	});
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