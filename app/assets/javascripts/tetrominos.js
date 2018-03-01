var Tetromino = function(attributes) {
	this.shape = attributes.shape;
	this.cubePositions = attributes.cubePositions;
	this.color = attributes.color;
	this.outlineColor = attributes.outlineColor;
	this.solid = attributes.solid;
	this.rotations = 1;
};

Tetromino.prototype.autoMove = function(event) {
	currentInterval = setInterval(() => {
		if (!this.allowedDown()) {
			redrawBackground(this, this.cubePositions);
			this.moveDown();
			drawTetromino(this, this.cubePositions);
		} else {
			clearInterval(currentInterval);
			this.deadTetromino(event);
		}
	}, currentGame.determineSpeed());
};

Tetromino.prototype.deadTetromino = function(event) {
	removeKeyboardEvent(event);
	currentGame.checkTetrominoBag();
	currentGame.previousShape = this.shape;
	this.cubePositions.forEach(deadTetrominoPosition => {
		currentGame.occupiedPositions.push([deadTetrominoPosition, this.color, this.outlineColor, this.solid, this.shape]);
	});
	currentGame.addToTetrominoStatistics(this.shape);
	if (currentGame.checkForCompleteRow()) {
			currentGame.deleteRowAnimation();
			setTimeout(() => {
				redrawBackground(currentGame, currentGame.occupiedPositions);
				currentGame.slideDownAfterRowDeleted();
				drawTetromino(currentGame, currentGame.occupiedPositions);
				currentGame.deletedPositions = [];
				currentTetromino.addNewTetromino(event);
				currentGame.changeColors();
			}, (rowClearAnimationTime * 4) + 1);
	} else {
		this.addNewTetromino(event);
	}
};

Tetromino.prototype.addNewTetromino = function(event) {
	clearInterval(currentInterval);
	this.cubePositions = [[maxVal, maxVal], [maxVal, maxVal], [maxVal, maxVal], [maxVal, maxVal]];
	currentTetromino = spawnTetromino();
	if (!currentTetromino.allowedDown()) {
		currentTetromino.autoMove();
	} else {
		currentGame.gameOver(event);
	}
};

Tetromino.prototype.allowedDown = function() {
	var pieceThereDown = 0;
	this.cubePositions.forEach(cubePosition => {
		if (cubePosition[1] > completeColumn[18]) {
			pieceThereDown += 1;
			return true;
		}
		currentGame.occupiedPositions.forEach(usedPosition => {
			if (cubePosition[0] === usedPosition[0][0] && cubePosition[1] + boardIncrement === usedPosition[0][1]) {
				pieceThereDown += 1;
			}
		});
	});
	if (pieceThereDown > 0) {
		return true;
	}
};

Tetromino.prototype.allowedLeft = function() {
	var pieceThere = 0;
	currentGame.occupiedPositions.forEach(usedPosition => {
		this.cubePositions.forEach(cubePosition => {
			if (cubePosition[0] - boardIncrement === usedPosition[0][0] && cubePosition[1] === usedPosition[0][1]) {
				pieceThere += 1;
			} 
		});
	});
	if (this.cubePositions[0][0] < boardIncrement) {
		pieceThere += 1;
	}
	if (pieceThere === 0) {
		return true;
	}
};

Tetromino.prototype.allowedRight = function() {
	var pieceThere = 0;
	currentGame.occupiedPositions.forEach(usedPosition => {
		this.cubePositions.forEach(cubePosition => {
			if (cubePosition[0] + boardIncrement === usedPosition[0][0] && cubePosition[1] === usedPosition[0][1]) {
				pieceThere += 1;
			} 
		});
	});
	if (this.cubePositions[3][0] > completeRow[8]) {
		pieceThere += 1;
	}
	if (pieceThere === 0) {
		return true;
	}
};
// All functions starting with "move" only adjust the cubePositions, they do not draw/redraw
Tetromino.prototype.moveLeft = function() {
	if (this.allowedLeft()) {
		this.cubePositions.forEach(position => {
			position[0] -= boardIncrement;
		});
	}
};

Tetromino.prototype.moveRight = function() {
	if (this.allowedRight()) {
		this.cubePositions.forEach(position => {
			position[0] += boardIncrement;
		});
	}
};

Tetromino.prototype.moveDown = function() {
	this.cubePositions.forEach(position => {
		position[1] += boardIncrement;
	});
};

Tetromino.prototype.rotateTetromino = function() {
	switch (this.shape) {
		case 'cross':
			this.rotateCross();
			break;
		case 'es':
			this.rotateEs();
			break;
		case 'zed':
			this.rotateZed();
			break;
		case 'jay':
			this.rotateJay();
			break;
		case 'el':
			this.rotateEl();
			break;
		case 'stick':
			this.rotateStick();
			break;
	}
};
// Hardcoding bonanza yay!
Tetromino.prototype.rotateStick = function() {
	if (this.rotations === 1) {
		this.cubePositions[0][0] += boardIncrement * 2;
		this.cubePositions[0][1] += negBoardIncrement * 2;
		this.cubePositions[1][0] += boardIncrement;
		this.cubePositions[1][1] += negBoardIncrement;
		this.cubePositions[3][0] += negBoardIncrement;
		this.cubePositions[3][1] += boardIncrement;
		this.rotations += 1;
	} else {
		if (this.allowedRight() && this.allowedLeft() && this.cubePositions[0][0] - boardIncrement !== 0) {
			this.cubePositions[0][0] += negBoardIncrement * 2;
			this.cubePositions[0][1] += boardIncrement * 2;
			this.cubePositions[1][0] += negBoardIncrement;
			this.cubePositions[1][1] += boardIncrement;
			this.cubePositions[3][0] += boardIncrement;
			this.cubePositions[3][1] += negBoardIncrement;
			this.rotations -= 1;
		}
	}
};

Tetromino.prototype.rotateCross = function() {
	if (this.rotations === 1) {
		this.cubePositions[3][0] += negBoardIncrement;
		this.cubePositions[3][1] += negBoardIncrement;
		this.rotations += 1;
	} else if (this.rotations === 2) {
		if (this.allowedRight()) {
			this.cubePositions[1][1] += negBoardIncrement * 2;
			this.cubePositions[3][0] += boardIncrement;
			this.cubePositions[3][1] += boardIncrement;
			this.rotations += 1;
		}
	} else if (this.rotations === 3) {
		this.cubePositions[0][0] += boardIncrement;
		this.cubePositions[0][1] += boardIncrement;
		this.rotations += 1;
	} else {
		if (this.allowedLeft()) {
			this.cubePositions[0][0] += negBoardIncrement;
			this.cubePositions[0][1] += negBoardIncrement;
			this.cubePositions[1][1] += boardIncrement * 2;
			this.rotations = 1;
		}
	}
};

Tetromino.prototype.rotateEs = function() {
	if (this.rotations === 1) {
		this.cubePositions[0][0] += boardIncrement;
		this.cubePositions[0][1] += negBoardIncrement * 2;
		this.cubePositions[1][0] += boardIncrement;
		this.rotations += 1;
	} else {
		if (this.allowedLeft()) {
			this.cubePositions[0][0] += negBoardIncrement;
			this.cubePositions[0][1] += boardIncrement * 2;
			this.cubePositions[1][0] += negBoardIncrement;
			this.rotations -= 1;
		}
	}
};

Tetromino.prototype.rotateZed = function() {
	if (this.rotations === 1) {
		this.cubePositions[0][0] += boardIncrement;
		this.cubePositions[1][0] += boardIncrement;
		this.cubePositions[3][1] += negBoardIncrement * 2;
		this.rotations += 1;
	} else {
		if (this.allowedLeft()) {
			this.cubePositions[0][0] += negBoardIncrement;
			this.cubePositions[1][0] += negBoardIncrement;
			this.cubePositions[3][1] += boardIncrement * 2;
			this.rotations -= 1;
		}
	}
};

Tetromino.prototype.rotateJay = function() {
	if (this.rotations === 1) {
		this.cubePositions[0][1] += boardIncrement;
		this.cubePositions[1][0] += negBoardIncrement;
		this.cubePositions[3][0] += negBoardIncrement;
		this.cubePositions[3][1] += negBoardIncrement;
		this.rotations += 1;
	} else if (this.rotations === 2) {
		if (this.allowedRight()) {		
			this.cubePositions[0][1] += negBoardIncrement * 2;
			this.cubePositions[1][0] += negBoardIncrement;
			this.cubePositions[1][1] += negBoardIncrement;
			this.cubePositions[3][0] += boardIncrement;
			this.cubePositions[3][1] += boardIncrement;
			this.rotations += 1;
		}
	} else if (this.rotations === 3) {
		this.cubePositions[0][0] += boardIncrement;
		this.cubePositions[1][0] += boardIncrement;
		this.cubePositions[1][1] += boardIncrement;
		this.cubePositions[3][1] += negBoardIncrement;
		this.rotations += 1;
	} else {
		if (this.allowedLeft()) {
			this.cubePositions[0][0] += negBoardIncrement;
			this.cubePositions[0][1] += boardIncrement;
			this.cubePositions[1][0] += boardIncrement;
			this.cubePositions[3][1] += boardIncrement;
			this.rotations = 1;
		}
	}
};

Tetromino.prototype.rotateEl = function() {
	if (this.rotations === 1) {
		this.cubePositions[0][1] += negBoardIncrement;
		this.cubePositions[1][0] += boardIncrement;
		this.cubePositions[3][0] += negBoardIncrement;
		this.cubePositions[3][1] += negBoardIncrement;
		this.rotations += 1;
	} else if (this.rotations === 2) {
		if (this.allowedRight()) {
			this.cubePositions[0][1] += boardIncrement;
			this.cubePositions[1][0] += boardIncrement;
			this.cubePositions[1][1] += negBoardIncrement;
			this.cubePositions[3][0] += boardIncrement;
			this.rotations += 1;
		}
	} else if (this.rotations === 3) {
		this.cubePositions[0][0] += boardIncrement;
		this.cubePositions[0][1] += negBoardIncrement;
		this.cubePositions[1][0] += negBoardIncrement;
		this.cubePositions[1][1] += boardIncrement;
		this.cubePositions[3][1] += boardIncrement * 2;
		this.rotations += 1;
	} else {
		if (this.allowedLeft()) {
			this.cubePositions[0][0] += negBoardIncrement;
			this.cubePositions[0][1] += boardIncrement;
			this.cubePositions[1][0] += negBoardIncrement;
			this.cubePositions[3][1] += negBoardIncrement;
			this.rotations = 1;
		}
	}
};