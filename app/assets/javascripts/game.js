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

Game.prototype.addToTetrominoStatistics = function(shape) {
	var statsUpdateIndex = shapes.indexOf(currentTetromino.shape);
	var $stat = $("#tetromino_stat".concat(statsUpdateIndex));
	var newAmount = parseInt($stat.text()) + 1;
	if (newAmount < 10) {
		$("#tetromino_stat".concat(statsUpdateIndex)).text("00".concat(newAmount));
	} else if (newAmount < 99) {
		$("#tetromino_stat".concat(statsUpdateIndex)).text("0".concat(newAmount));
	} else {
		$("#tetromino_stat".concat(statsUpdateIndex)).text(newAmount);
	}
};

Game.prototype.updateLineStats = function() {
	this.lines = parseInt(this.lines) + 1;
	if (this.lines < 10) {
		this.lines = "0".concat(this.lines);
	}
	$("#lines_div p").text("LINES-".concat(this.lines));
};

Game.prototype.amountInRows = function(rowYCoords, multiplier) {
	var rowAmount = this.occupiedPositions.filter(function(occupiedPosition){
		return rowYCoords === occupiedPosition[0][1] - multiplier;
	});
	return rowAmount;
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