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

Game.prototype.amountInRows = function(rowYCoords, multiplier) {
	var rowAmount = this.occupiedPositions.filter(function(occupiedPosition){
		return rowYCoords === occupiedPosition[0][1] - multiplier;
	});
	return rowAmount;
}

Game.prototype.deleteFromOccupiedPositions = function(possibleRows, rowYCoords, deletedRows) {
	var that = this;
	Object.keys(possibleRows).forEach(function(key) {
		if (possibleRows[key].length === 10) {
			that.deleteRow(rowYCoords);
			that.deletedRows.push(rowYCoords);
		}
	});
}

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
	var context = getContext();
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
	var context = getContext();
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
}

Game.prototype.moveDownEverything = function(yCoord) {
	this.occupiedPositions.forEach(function(position) {
		if (position[0][1] <= yCoord) {
			position[0][1] += boardIncrement;
		}
	});
}

Game.prototype.blackoutBackground = function() {
	var context = getContext();
	this.occupiedPositions.forEach(function(position) {
		context.clearRect(position[0][0], position[0][1], boardIncrement, boardIncrement);
		context.fillStyle = 'black';
		context.fillRect(position[0][0], position[0][1], boardIncrement, boardIncrement);
	});
};

Game.prototype.redrawTetrominos = function() {
	var context = getContext();
	this.occupiedPositions.forEach(function(position) {
		context.fillStyle = position[2];
		context.fillRect(position[0][0] + boardIncrement / 10, position[0][1] + boardIncrement / 10, boardIncrement / 1.1111, boardIncrement / 1.1111);

		context.fillStyle = position[1];
		context.fillRect(position[0][0] + boardIncrement / 5, position[0][1] + boardIncrement / 5, boardIncrement / 1.4286, boardIncrement / 1.4286);

		context.fillStyle = 'white';
		context.fillRect(position[0][0] + boardIncrement / 10, position[0][1] + boardIncrement / 10, boardIncrement / 10, boardIncrement / 10); // sparkle in top left corner
		if (position[3] === true) { // makes the shine on solid tetrominos
			context.fillRect(position[0][0] + boardIncrement / 5, position[0][1] + boardIncrement / 5, boardIncrement / 5, boardIncrement / 10);
			context.fillRect(position[0][0] + boardIncrement / 5, position[0][1] + boardIncrement / 3.3333, boardIncrement / 10, boardIncrement / 10);
		}
	});
};

Game.prototype.drawNextTetromino = function() {
	var pieceContext = getNextPieceContext();
	var that = this.nextShape;
	if (this.nextShape.shape === 'stick' || this.nextShape.shape === 'cube') {
		nextPieceXCoords = boardIncrement;
	}
	this.nextShape.cubePositions.forEach(function(position) {
		pieceContext.fillStyle = that.outlineColor;
		pieceContext.fillRect(position[0] + boardIncrement / 10 - completeRow[4] + nextPieceXCoords, position[1] + boardIncrement / 10 + nextPieceYCoords, boardIncrement / 1.1111, boardIncrement / 1.1111);

		pieceContext.fillStyle = that.color;
		pieceContext.fillRect(position[0] + boardIncrement / 5 - completeRow[4] + nextPieceXCoords, position[1] + boardIncrement / 5 + nextPieceYCoords, boardIncrement / 1.4286, boardIncrement / 1.4286);

		pieceContext.fillStyle = 'white';
		pieceContext.fillRect(position[0] + boardIncrement / 10 - completeRow[4] + nextPieceXCoords, position[1] + boardIncrement / 10 + nextPieceYCoords, boardIncrement / 10, boardIncrement / 10); // sparkle in top left corner

		if (that.solid) { // makes the shine on solid tetrominos
			pieceContext.fillRect(position[0] + boardIncrement / 5 - completeRow[4] + nextPieceXCoords, position[1] + boardIncrement / 5 + nextPieceYCoords, boardIncrement / 5, boardIncrement / 10);
			pieceContext.fillRect(position[0] + boardIncrement / 5 - completeRow[4] + nextPieceXCoords, position[1] + boardIncrement / 3.3333 + nextPieceYCoords, boardIncrement / 10, boardIncrement / 10);
		}
	});
};

// Game.prototype.blackoutNextPieceBackground = function() {
// 	console.log(this.nextShape)
// 	var pieceContext = getNextPieceContext();
// 	this.nextShape.cubePositions.forEach(function(position) {
// 		console.log(position[0])
// 		pieceContext.clearRect(position[0], position[1], boardIncrement, boardIncrement);
// 		pieceContext.fillStyle = 'black';
// 		pieceContext.fillRect(position[0], position[1], boardIncrement, boardIncrement);
// 	});
// };