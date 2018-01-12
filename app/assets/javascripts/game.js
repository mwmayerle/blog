var Game = function() {
	this.occupiedPositions = [];
	this.deletedPositions = [];
	this.score = 0;
	this.lines = 0;
	this.level = 0;
	this.nextShape = '';
};

Game.prototype.amountInRows = function(rowYCoords, multiplier) {
	var result = this.occupiedPositions.filter(function(occupiedPosition){
		return rowYCoords === occupiedPosition[0][1] + multiplier;
	});
	return result;
}

Game.prototype.checkForCompleteRow = function() {
	for (var rowYCoords = 950; rowYCoords >= 0; rowYCoords -= 50) {
		var rowsBeingCleared = 0;
		var possibleRows = {
			amtInRow1: this.amountInRows(rowYCoords, 0),
			amtInRow2: this.amountInRows(rowYCoords, 50),
			amtInRow3: this.amountInRows(rowYCoords, 100),
			amtInRow4: this.amountInRows(rowYCoords, 150)
		}
	//I am not proud of the nested ifs. I screwed up iterating thru the possibleRows object keys somehow
		if (possibleRows.amtInRow1.length === 10) {
			rowsBeingCleared = 1;
			this.deleteRow(rowYCoords);
			if (possibleRows.amtInRow2.length === 10) {
				rowsBeingCleared = 2;
				this.deleteRow(rowYCoords);
				if (possibleRows.amtInRow3.length === 10) {
					rowsBeingCleared = 3;
					this.deleteRow(rowYCoords);
					if (possibleRows.amtInRow4.length === 10) {
						rowsBeingCleared = 4;
						this.deleteRow(rowYCoords);
					}
				}
			}
		}
		if (rowsBeingCleared !== 0) {
			this.clearingRowsSelector();
			this.deletedPositions = [];
			break;
		}
	}
	this.redrawTetrominos();
};

Game.prototype.clearingRowsSelector = function() {
	var toClear = [];
	var counter = 200;

	for (var x = 250; x < 500; x += 50) {
		toClear = this.deletedPositions.filter(function(position) {
			return (position[0] === x || position[0] === counter);
		});

		counter -= 50;

		if (toClear !== []) {
			this.animateRowClear(toClear);
		}
	}
}


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
	this.moveDownEverything(rowYCoord);
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

Game.prototype.moveDownEverything = function(rowYCoord) {
	this.occupiedPositions.forEach(function(position) {
		if (position[0][1] <= rowYCoord) {
			position[0][1] += 50;
		}
	});
}

Game.prototype.redrawBackground = function() {
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

Game.prototype.animateRowClear = function(toClear) {
	var context = getContext();
	setInterval(function() {
		toClear.forEach(function(position) {
			context.clearRect(position[0], position[1], 50, 50);
			context.fillStyle = 'black';
			context.fillRect(position[0], position[1], 50, 50);
		});
	}, 50);
}