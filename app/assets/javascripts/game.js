var Game = function() {
	this.occupiedPositions = [];
	this.score = 0;
	this.lines = 0;
	this.level = 0;
	this.nextShape = '';
};

Game.prototype.checkForCompleteRow = function() {
	for (var rowYCoords = 950; rowYCoords >= 0; rowYCoords -= 50) {
		var amtInRow = [];

		amtInRow1 = this.occupiedPositions.filter(function(occupiedPosition){
			return rowYCoords === occupiedPosition[0][1] + 0;
		});
		amtInRow2 = this.occupiedPositions.filter(function(occupiedPosition){
			return rowYCoords === occupiedPosition[0][1] + 50;
		});
		amtInRow3 = this.occupiedPositions.filter(function(occupiedPosition){
			return rowYCoords === occupiedPosition[0][1] + 100;
		});
		amtInRow4 = this.occupiedPositions.filter(function(occupiedPosition){
			return rowYCoords === occupiedPosition[0][1] + 150;
		});
		if (amtInRow1.length === 10) {
			this.deleteRow(rowYCoords);
			if (amtInRow2.length === 10) {
				this.deleteRow(rowYCoords);
				if (amtInRow3.length === 10) {
					this.deleteRow(rowYCoords);
					if (amtInRow4.length === 10) {
						this.deleteRow(rowYCoords);
					}
				}
			}
		}

	}
	this.redrawTetrominos();
};

Game.prototype.deleteRow = function(rowYCoord) {
	this.redrawBackground();
	var rowIndicies = this.getIndiciesToDelete(rowYCoord);
	var deletedIndicies = [];
	while (rowIndicies.length > 0) {
		var toKill = rowIndicies.reduce(function(a,b) {
			return Math.max(a,b);
		});
		deletedIndicies.push(this.occupiedPositions.splice(toKill, 1));
		var toKillIndex = rowIndicies.indexOf(toKill)
		rowIndicies.splice(toKillIndex, 1);
	}
	this.moveDownEverything(rowYCoord);
};

Game.prototype.getIndiciesToDelete = function(rowYCoord) {
	var that = this;
	var indiciesToDelete = [];
		this.occupiedPositions.forEach(function(position) {
		if (position[0][1] === rowYCoord) {
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