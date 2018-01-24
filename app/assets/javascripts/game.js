var Game = function() {
	this.occupiedPositions = [];
	this.deletedPositions = [];
	this.deletedRows = [];
	this.score = 0;
	this.lines = 0;
	this.level = 0;
	this.nextShape = {};
	this.previousShape = {};
};

Game.prototype.determineSpeed = function() {
	var levelSpeed = 1200;
	if (this.level <= 8) {
		levelSpeed -= currentGame.level * 125;
	} else if (this.level === 9) {
		levelSpeed = 180;
	} else if (this.level >= 10 && this.level <= 12) {
		levelSpeed = 150;
	} else if (this.level >= 13 && this.level <= 15) {
		levelSpeed = 120;
	} else if (this.level >= 16 && this.level <= 18) {
		levelSpeed = 90;
	} else {
		levelSpeed = 60;
	}
	return levelSpeed;
};

Game.prototype.gameOver = function() {
	document.getElementById("music_theme").pause();
	document.getElementById("game_over_sound").play();
	showSubmissionForm();
}

Game.prototype.addToTetrominoStatistics = function(shape) {
	var statsUpdateIndex = shapes.indexOf(currentTetromino.shape);
	var $stat = $("#tetromino_stat".concat(statsUpdateIndex));
	var newAmount = parseInt($stat.text()) + 1;
	if (newAmount < 10) {
		newAmount = "00".concat(newAmount);
	} else if (newAmount < 99) {
		newAmount = "0".concat(newAmount);
	}
	$("#tetromino_stat".concat(statsUpdateIndex)).html("<p>" + newAmount + "</p>");
};

Game.prototype.updateLevel = function() {
	this.level += 1;
	if (this.level <= 9) {
		$("#level_div").html("<p>LEVEL</p>" + "<p>" + "0".concat(this.level) + "</p>");
	} else {
		$("#level_div").html("<p>LEVEL</p>" + "<p>" + this.level + "</p>");
	}
};

Game.prototype.updateLineStats = function() {
	this.lines = parseInt(this.lines) + 1;
	if (this.lines < 10) {
		this.lines = "0".concat(this.lines);
	}
	$("#lines_div p").text("LINES-".concat(this.lines));
	if (this.lines % 10 === 0) {
		this.updateLevel();
		this.updateNextShapeColors(); // not in changeColors function b/c the new piece will not be updated in time
	}
};

Game.prototype.updateNextShapeColors = function() {
	if (this.nextShape.shape === 'cube' || this.nextShape.shape === 'stick' || this.nextShape.shape === 'cross') {
		this.nextShape.outlineColor = outlineColors[this.level % 10];
	} else if (this.nextShape.shape === 'jay' || this.nextShape.shape === 'es') {
		this.nextShape.color = solidColors[this.level % 10];
		this.nextShape.outlineColor = solidColors[this.level % 10];
	} else {
		this.nextShape.color = outlineColors[this.level % 10];
		this.nextShape.outlineColor = outlineColors[this.level % 10];
	}
};

Game.prototype.updateOccupiedPositionColors = function() {
	this.occupiedPositions.forEach(function(occupiedPosition) {
		if (occupiedPosition[4] === 'cube' || occupiedPosition[4] === 'stick' || occupiedPosition[4] === 'cross') {
			occupiedPosition[2] = outlineColors[currentGame.level % 10];
		} else if (occupiedPosition[4] === 'jay' || occupiedPosition[4] === 'es') {
			occupiedPosition[1] = solidColors[currentGame.level % 10];
			occupiedPosition[2] = solidColors[currentGame.level % 10];
		} else {
			occupiedPosition[1] = outlineColors[currentGame.level % 10];
			occupiedPosition[2] = outlineColors[currentGame.level % 10];
		}
	});
}

Game.prototype.changeColors = function() {
	this.updateOccupiedPositionColors();
	drawStatsPieces();
	drawNextTetromino("next_piece", currentGame.nextShape, 0);
	redrawBackground(currentGame, currentGame.occupiedPositions);
	drawTetromino(currentGame, currentGame.occupiedPositions);
};

Game.prototype.deleteFromOccupiedPositions = function(possibleRows, rowYCoords, deletedRows) {
	var that = this;
	Object.keys(possibleRows).forEach(function(key) {
		if (possibleRows[key].length === 10) {
			that.updateLineStats();
			that.deleteRow(rowYCoords);
			that.deletedRows.push(rowYCoords);
		}
	});
};

Game.prototype.addToScore = function() {
	switch (this.deletedRows.length) {
		case 1:
			this.score += 40 * (this.level + 1);
			break;
		case 2:
			this.score += 100 * (this.level + 1);
			break;
		case 3:
			this.score += 300 * (this.level + 1);
			break;
		case 4:
			this.score += 1200 * (this.level + 1);
			break;
	}
	this.score += 5;
};

Game.prototype.updateScore = function() {
	var zeros = "SCORE ";
	var zerosToConcat = 6 - this.score.toString().length;
	for (var i = 0; i < zerosToConcat; i++) {
		zeros = zeros.concat("0");
	}
	$("#scores").children().last().html("<p>" + zeros.concat(this.score) + "</p>");
};

Game.prototype.amountInRows = function(rowYCoords, multiplier) {
	var rowAmount = this.occupiedPositions.filter(function(occupiedPosition){
		return rowYCoords === occupiedPosition[0][1] - multiplier;
	});
	return rowAmount;
};

Game.prototype.checkForCompleteRow = function() {
	var playDeleteAnimation = false;

	for (var rowYCoords = completeColumn[19]; rowYCoords >= 0; rowYCoords -= boardIncrement) {
		var possibleRows = {
			amtInRow1: this.amountInRows(rowYCoords, 0),
			amtInRow2: this.amountInRows(rowYCoords, boardIncrement),
			amtInRow3: this.amountInRows(rowYCoords, boardIncrement * 2),
			amtInRow4: this.amountInRows(rowYCoords, boardIncrement * 3)
		}
		this.deleteFromOccupiedPositions(possibleRows, rowYCoords);
	}

	if (this.deletedRows.length > 0) {
		playDeleteAnimation = true;
	}
	this.addToScore();
	this.updateScore();
	return playDeleteAnimation;
};

Game.prototype.slideDownAfterRowDeleted = function() {
	while (this.deletedRows.length > 0) {
		var toMove = this.deletedRows.reduce(function(a,b) {
			return Math.min(a,b);
		});
		this.moveDownEverything(toMove);
		var toMoveIndex = this.deletedRows.indexOf(toMove);
		this.deletedRows.splice(toMoveIndex, 1);
	}
};

Game.prototype.deleteRowAnimation = function() {
	var context = getContext("tetris");
	var xCoordRight = completeRow[5];
	var xCoordLeft = completeRow[4];

	for (var i = 0; i < 5; i++) {
		setTimeout(function() {
			currentGame.deleteRowAnimationSegment(xCoordRight, xCoordLeft);
			xCoordRight += boardIncrement;
			xCoordLeft -= boardIncrement;
		}, i * rowClearAnimationTime);
	}
	document.getElementById("row_clear_sound").play();
};

Game.prototype.deleteRowAnimationSegment = function(xCoordRight, xCoordLeft) {
	var context = getContext("tetris");
	var coordsToVanish = currentGame.deletedPositions.filter(function(position) {
			return position[0] === xCoordRight || position[0] === xCoordLeft
		});
	coordsToVanish.forEach(function(coordinate) {
		context.clearRect(coordinate[0], coordinate[1], boardIncrement, boardIncrement);
		context.fillStyle = 'black';
		context.fillRect(coordinate[0], coordinate[1], boardIncrement, boardIncrement);
	});
};

Game.prototype.deleteRow = function(rowYCoord) {
	var rowIndicies = this.getIndiciesToDelete(rowYCoord);
	var deletedIndicies = [];

	while (rowIndicies.length > 0) {
		var toKill = rowIndicies.reduce(function(a,b) {
			return Math.max(a,b);
		});
		deletedIndicies.push(this.occupiedPositions.splice(toKill, 1));
		var toKillIndex = rowIndicies.indexOf(toKill);
		rowIndicies.splice(toKillIndex, 1);
	}
};

Game.prototype.getIndiciesToDelete = function(rowYCoord) {
	var that = this;
	var indiciesToDelete = [];
		this.occupiedPositions.forEach(function(position) {
		if (position[0][1] === rowYCoord) {
			that.deletedPositions.push(position[0]);
			var positionIndex = that.occupiedPositions.indexOf(position)
			indiciesToDelete.push(positionIndex);
		}
	});
	return indiciesToDelete;
};

Game.prototype.moveDownEverything = function(yCoord) {
	this.occupiedPositions.forEach(function(position) {
		if (position[0][1] <= yCoord) {
			position[0][1] += boardIncrement;
		}
	});
};