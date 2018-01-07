var Game = function() {
	this.occupiedPositions = [];
	this.score = 0;
	this.lines = 0;
	this.level = 0;
	this.nextShape = '';
};

Game.prototype.rowToDelete = function(rowYCoord) {
	var indiciesToDelete = [];
	this.occupiedPositions.forEach(function(position) {
		if (position[1] === rowYCoord) {
			indiciesToDelete.push(currentGame.occupiedPositions.indexOf(position));
		}
	});
	while (indiciesToDelete.length > 0) {
		var toKill = Math.max(indiciesToDelete);
		var toKillIndex = indiciesToDelete.indexOf(toKill)
		this.occupiedPositions.splice(toKill, 1);
		indiciesToDelete.splice(toKillIndex, 1);
	}
	console.log('hi');
	this.redrawBackground();
	this.occupiedPositions.forEach(function(position) {
		if (position[0][1] <= rowYCoord) {
			position[0][1] += 50;
		}
	});
	this.redrawTetrominos();
};

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