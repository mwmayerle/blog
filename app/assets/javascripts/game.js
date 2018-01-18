var Game = function() {
	this.occupiedPositions = [];
	this.deletedPositions = [];
	this.deletedRows = [];
	this.score = 0;
	this.lines = 0;
	this.level = 0;
	this.nextShape = '';
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

	for (var rowYCoords = 950; rowYCoords >= 0; rowYCoords -= 50) {
		var possibleRows = {
			amtInRow1: this.amountInRows(rowYCoords, 0),
			amtInRow2: this.amountInRows(rowYCoords, 50),
			amtInRow3: this.amountInRows(rowYCoords, 100),
			amtInRow4: this.amountInRows(rowYCoords, 150)
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
	var xCoordRight = 250;
	var xCoordLeft = 200;
	for (var i = 0; i < 5; i++) {
		setTimeout(function() {
			currentGame.deleteRowAnimationSegment(xCoordRight, xCoordLeft);
			xCoordRight += 50;
			xCoordLeft -= 50;
		}, i * 100);
	}
};

Game.prototype.deleteRowAnimationSegment = function(xCoordRight, xCoordLeft) {
	var context = getContext();
	var coordsToVanish = currentGame.deletedPositions.filter(function(position) {
			return position[0] === xCoordRight || position[0] === xCoordLeft
		});
	coordsToVanish.forEach(function(coordinate) {
		context.clearRect(coordinate[0], coordinate[1], 50, 50);
		context.fillStyle = 'black';
		context.fillRect(coordinate[0], coordinate[1], 50, 50);
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
			position[0][1] += 50;
		}
	});
}

Game.prototype.blackoutBackground = function() {
	var context = getContext();
	this.occupiedPositions.forEach(function(position) {
		context.clearRect(position[0][0], position[0][1], 50, 50);
		context.fillStyle = 'black';
		context.fillRect(position[0][0], position[0][1], 50, 50);
	});
};

Game.prototype.redrawTetrominos = function() {
	var context = getContext();
	this.occupiedPositions.forEach(function(position) {
		context.fillStyle = position[2];
		context.fillRect(position[0][0] + 5, position[0][1] + 5, 45, 45);

		context.fillStyle = position[1];
		context.fillRect(position[0][0] + 10, position[0][1] + 10, 35, 35);

		context.fillStyle = 'white';
		context.fillRect(position[0][0] + 5, position[0][1] + 5, 5, 5); // sparkle in top left corner
		if (position[3] === true) { // makes the shine on solid tetrominos
			context.fillRect(position[0][0] + 10, position[0][1] + 10, 10, 5);
			context.fillRect(position[0][0] + 10, position[0][1] + 15, 5, 5);
		}
	});
};