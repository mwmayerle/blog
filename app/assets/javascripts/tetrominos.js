var Tetromino = function(attributes) {
	this.shape = attributes.shape;
	this.cubePositions = attributes.cubePositions;
	this.color = attributes.color;
	this.outlineColor = attributes.outlineColor;
	this.solid = attributes.solid;
	this.rotations = 1;
}

Tetromino.prototype.drawTetromino = function(attributes) {
	var context = getContext();
	var that = this;
	this.cubePositions.forEach(function(position) {
		context.fillStyle = that.outlineColor;
		context.fillRect(position[0] + 5, position[1] + 5, 45, 45);

		context.fillStyle = that.color;
		context.fillRect(position[0] + 10, position[1] + 10, 35, 35);

		context.fillStyle = 'white';
		context.fillRect(position[0] + 5, position[1] + 5, 5, 5); // sparkle in top left corner

		if (that.solid == true) { // makes the shine on solid tetrominos
			context.fillRect(position[0] + 10, position[1] + 10, 10, 5);
			context.fillRect(position[0] + 10, position[1] + 15, 5, 5);
		}
	});
}

Tetromino.prototype.redrawBackground = function() {
	var context = getContext();
	this.cubePositions.forEach(function(position) {
		context.clearRect(position[0], position[1], 50, 50);
		context.fillStyle = 'black';
		context.fillRect(position[0], position[1], 50, 50);
	})
}

Tetromino.prototype.drawTetromino = function() {
	var context = getContext();
	var that = this;
	this.cubePositions.forEach(function(position) {
		context.fillStyle = that.outlineColor;
		context.fillRect(position[0] + 5, position[1] + 5, 45, 45);

		context.fillStyle = that.color;
		context.fillRect(position[0] + 10, position[1] + 10, 35, 35);

		context.fillStyle = 'white';
		context.fillRect(position[0] + 5, position[1] + 5, 5, 5); // sparkle in top left corner

		if (that.solid) { // makes the shine on solid tetrominos
			context.fillRect(position[0] + 10, position[1] + 10, 10, 5);
			context.fillRect(position[0] + 10, position[1] + 15, 5, 5);
		}
	});
}

Tetromino.prototype.getKeyboardInput = function() {
	var that = this;
	document.addEventListener("keypress", function(event) {
		that.redrawBackground();
		if (that.allowedDown() && !tetrominoHere(that.cubePositions)) {
			switch (event.keyCode) { //this refers to the document here
				case 97: // A
					that.moveLeft();
					break;
				case 115: // S
					that.moveDown();
					break;
				case 100:// D
					that.moveRight();
					break;
				default:
					that.rotateTetromino();
					break;
				}
			} else { //THIS BLOCK MAKES A NEW PIECE. IT WILL EVENTUALLY BECOME A KILL FUNCTION
				that.cubePositions.forEach(function(deadTetrominoPosition) {
					currentGame.occupiedPositions.push(deadTetrominoPosition);
				});
				that.drawTetromino();
				that = spawnTetromino();
				return that;
			}
		that.drawTetromino();
	});
}

var tetrominoHere = function(cubePositions) {
	var pieceThere = 0;
	cubePositions.forEach(function(cubePosition) {
		currentGame.occupiedPositions.forEach(function(usedPosition) {
			if (cubePosition[0] === usedPosition[0] && cubePosition[1] + 50 === usedPosition[1]) {
				pieceThere += 1; //down only
			} 
			return pieceThere;
		}); //inner forEach end
	});
	if (pieceThere > 0) {
		return true;
	}
}

// Determine if it's possible to move a piece in a given direction
Tetromino.prototype.allowedDown = function() {
	var yCoords = [];
	this.cubePositions.forEach(function(position) {
		if (position[1] > 900) {
			yCoords.push(position[1]);
		}
	});
	if (yCoords.length === 0) {
		return true;
	} 
}

Tetromino.prototype.allowedLeft = function() {
	var pieceThere = 0;
	var that = this;
	currentGame.occupiedPositions.forEach(function(usedPosition) {
		if (that.cubePositions[0][0] - 50 === usedPosition[0] && that.cubePositions[0][1] === usedPosition[1]) {
			pieceThere += 1;
		}	
	});
	if (this.cubePositions[0][0] < 50) {
		pieceThere += 1;
	}
	if (pieceThere === 0) {
		return true;
	}
}

Tetromino.prototype.allowedRight = function() { // FIX STICK LOGIC
	var pieceThere = 0;
	var that = this;
	currentGame.occupiedPositions.forEach(function(usedPosition) {
		if (that.cubePositions[3][0] + 50 === usedPosition[0] && that.cubePositions[3][1] === usedPosition[1] && that.cubePositions[3][0] > 400) {
			pieceThere += 1;
		}	
	});
	if (this.cubePositions[3][0] > 400) {
		pieceThere += 1;
	}
	if (pieceThere === 0) {
		return true;
	}
}
// All functions starting with "move" only adjust the cubePositions, they do not draw/redraw
Tetromino.prototype.moveLeft = function() {
	if (this.allowedLeft()) {
		this.cubePositions.map(function(position) {
			position[0] -= 50;
		});
	}
}

Tetromino.prototype.moveRight = function() {
	if (this.allowedRight()) {
		this.cubePositions.map(function(position) {
			position[0] += 50;
		});
	}
}

Tetromino.prototype.moveDown = function() {
		this.cubePositions.map(function(position) {
			position[1] += 50;
		});
}

Tetromino.prototype.rotateTetromino = function() {
	if (this.allowedDown()) {
		switch (this.shape) {
			case 'stick':
				this.rotateStick();
				break;
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
		}
	}
}
// Hardcoging bonanza yay!
Tetromino.prototype.rotateStick = function() {
	if (this.rotations === 1) {
		this.cubePositions[0][0] += right * 2;
		this.cubePositions[0][1] += up * 2;
		this.cubePositions[1][0] += right;
		this.cubePositions[1][1] += up;
		this.cubePositions[3][0] += left;
		this.cubePositions[3][1] += down;
		this.rotations += 1;
	} else {
		if (this.allowedRight() && this.allowedLeft()) {
			this.cubePositions[0][0] += up * 2;
			this.cubePositions[0][1] += down * 2;
			this.cubePositions[1][0] += left;
			this.cubePositions[1][1] += down;
			this.cubePositions[3][0] += right;
			this.cubePositions[3][1] += up;
			this.rotations -= 1;
		}
	}
}

Tetromino.prototype.rotateCross = function() {
	if (this.rotations === 1) {
		this.cubePositions[3][0] += left;
		this.cubePositions[3][1] += up;
		this.rotations += 1;
	} else if (this.rotations === 2) {
		if (this.allowedRight()) {
			this.cubePositions[1][1] += up * 2;
			this.cubePositions[3][0] += right;
			this.cubePositions[3][1] += down;
			this.rotations += 1;
		}
	} else if (this.rotations === 3) {
		this.cubePositions[0][0] += right;
		this.cubePositions[0][1] += down;
		this.rotations += 1;
	} else {
		if (this.allowedLeft()) {
			this.cubePositions[0][0] += left;
			this.cubePositions[0][1] += up;
			this.cubePositions[1][1] += down * 2;
			this.rotations = 1;
		}
	}
}

Tetromino.prototype.rotateEs = function() {
	if (this.rotations === 1) {
		this.cubePositions[0][0] += right;
		this.cubePositions[0][1] += up * 2;
		this.cubePositions[1][0] += right;
		this.rotations += 1;
	} else {
		if (this.allowedLeft()) {
			this.cubePositions[0][0] += left;
			this.cubePositions[0][1] += down * 2;
			this.cubePositions[1][0] += left;
			this.rotations -= 1;
		}
	}
}

Tetromino.prototype.rotateZed = function() {
	if (this.rotations === 1) {
		this.cubePositions[0][0] += right;
		this.cubePositions[1][0] += right;
		this.cubePositions[3][1] += up * 2;
		this.rotations += 1;
	} else {
		if (this.allowedLeft()) {
			this.cubePositions[0][0] += left;
			this.cubePositions[1][0] += left;
			this.cubePositions[3][1] += down * 2;
			this.rotations -= 1;
		}
	}
}

Tetromino.prototype.rotateJay = function() {
	if (this.rotations === 1) {
		this.cubePositions[0][1] += down;
		this.cubePositions[1][0] += left;
		this.cubePositions[3][0] += left;
		this.cubePositions[3][1] += up;
		this.rotations += 1;
	} else if (this.rotations === 2) {
		if (this.allowedRight()) {		
			this.cubePositions[0][1] += up * 2;
			this.cubePositions[1][0] += left;
			this.cubePositions[1][1] += up;
			this.cubePositions[3][0] += right;
			this.cubePositions[3][1] += down;
			this.rotations += 1;
		}
	} else if (this.rotations === 3) {
		this.cubePositions[0][0] += right;
		this.cubePositions[1][0] += right;
		this.cubePositions[1][1] += down;
		this.cubePositions[3][1] += up;
		this.rotations += 1;
	} else {
		if (this.allowedLeft()) {
			this.cubePositions[0][0] += left;
			this.cubePositions[0][1] += down;
			this.cubePositions[1][0] += right;
			this.cubePositions[3][1] += down;
			this.rotations = 1;
		}
	}
}

Tetromino.prototype.rotateEl = function() {
	if (this.rotations === 1) {
		this.cubePositions[0][1] += up;
		this.cubePositions[1][0] += right;
		this.cubePositions[3][0] += left;
		this.cubePositions[3][1] += up;
		this.rotations += 1;
	} else if (this.rotations === 2) {
		if (this.allowedRight()) {
			this.cubePositions[0][1] += down;
			this.cubePositions[1][0] += right;
			this.cubePositions[1][1] += up;
			this.cubePositions[3][0] += right;
			this.rotations += 1;
		}
	} else if (this.rotations === 3) {
		this.cubePositions[0][0] += right;
		this.cubePositions[0][1] += up;
		this.cubePositions[1][0] += left;
		this.cubePositions[1][1] += down;
		this.cubePositions[3][1] += down * 2;
		this.rotations += 1;
	} else {
		if (this.allowedLeft()) {
			this.cubePositions[0][0] += left;
			this.cubePositions[0][1] += down;
			this.cubePositions[1][0] += left;
			this.cubePositions[3][1] += up;
			this.rotations = 1;
		}
	}
}