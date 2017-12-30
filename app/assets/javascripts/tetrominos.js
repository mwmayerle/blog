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

Tetromino.prototype.getDirection = function() {
	var that = this;
	document.addEventListener("keypress", function(event) {
		switch (event.keyCode) { //this is the document here
			case 97: // A
				that.redrawBackground();
				that.moveLeft();
				that.drawTetromino();
				break;
			case 115: // S
				that.redrawBackground();
				that.moveDown()
				that.drawTetromino();
				break;
			case 100:// D
				that.redrawBackground();
				that.moveRight();
				that.drawTetromino();
				break;
			default:
				that.redrawBackground();
				that.rotateTetromino();
				that.drawTetromino();
				break;
			}
	});
}

// All functions starting with "move" ONLY adjust the cubePositions, they do not draw/redraw the altered cubePositions
Tetromino.prototype.moveLeft = function() {
	if (this.cubePositions[0][0] > 0) {
		this.cubePositions.map(function(position) {
			position[0] -= 50;
		});
	}
}

Tetromino.prototype.moveRight = function() {
	if (this.cubePositions[3][0] < 450) {
		this.cubePositions.map(function(position) {
			position[0] += 50;
		});
	}
}

Tetromino.prototype.moveDown = function() {
	if (this.cubePositions[0][1] >= 0) {
		this.cubePositions.map(function(position) {
			position[1] += 50;
		});
	}
}

Tetromino.prototype.rotateTetromino = function() {
	switch (this.shape) {
		case 'stick':
			if (this.rotations === 1) {
				this.cubePositions[0][0] += right * 2;
				this.cubePositions[0][1] += up * 2;
				this.cubePositions[1][0] += right;
				this.cubePositions[1][1] += up;
				this.cubePositions[3][0] += left;
				this.cubePositions[3][1] += down;
				this.rotations += 1;
			} else {
				this.cubePositions[0][0] += up * 2;
				this.cubePositions[0][1] += down * 2;
				this.cubePositions[1][0] += left;
				this.cubePositions[1][1] += down;
				this.cubePositions[3][0] += right;
				this.cubePositions[3][1] += up;
				this.rotations -= 1;
			}
			break;
		case 'es':
			if (this.rotations === 1) {
				this.cubePositions[0][0] += right;
				this.cubePositions[0][1] += up * 2;
				this.cubePositions[1][0] += right;
				this.rotations += 1;
			} else {
				this.cubePositions[0][0] += left;
				this.cubePositions[0][1] += down * 2;
				this.cubePositions[1][0] += left;
				this.rotations -= 1;
			}
			break;
		case 'zed':
			if (this.rotations === 1) {
				this.cubePositions[0][0] += right * 2;
				this.cubePositions[0][1] += up;
				this.cubePositions[3][1] += up;
				this.rotations += 1;
			} else {
				this.cubePositions[0][0] += left * 2;
				this.cubePositions[0][1] += down;
				this.cubePositions[3][1] += down;
				this.rotations -= 1
			}
			break;
// var left = -50;
// var up = -50;
// var right = 50;
// var down = 50;


	}
}







/*////////////////////////////OG Rotate method
Tetromino.prototype.rotateTetromino = function() {
	var context = getContext();
	this.redrawBackground();

	switch (this.shape) { //cube omitted b/c it doesn't rotate
		case 'es':
			if (this.rotations === 1) {
				this.cubePositions = [[offsetFarRight, yCoord], [offsetFarRight, offsetUp], [offsetRight, offsetUp], [offsetRight, offsetFarUp]];
				this.rotations += 1;
			} else {
				this.cubePositions = [[offsetRight, yCoord], [offsetFarRight, yCoord], [offsetRight, offsetDown], [xCoord, offsetDown]];
				this.rotations -= 1;
			}
			break;
		case 'zed':
			if (this.rotations === 1) {
				this.cubePositions = [[offsetRight, offsetUp], [offsetFarRight, offsetUp], [offsetFarRight, offsetFarUp], [offsetRight, yCoord]];
				this.rotations += 1;
			} else {
				this.cubePositions = [[xCoord, yCoord], [offsetRight, yCoord], [offsetRight, offsetDown], [offsetFarRight, offsetDown]];
				this.rotations -= 1;
			}
			break;
		case 'cross':
			if (this.rotations === 1) {
				this.cubePositions = [[xCoord, offsetUp], [offsetRight, offsetUp], [offsetRight, offsetFarUp], [offsetRight, yCoord]];
			} else if (this.rotations === 2) {                
				this.cubePositions = [[xCoord, offsetUp], [offsetRight, offsetUp], [offsetRight, offsetFarUp], [offsetFarRight, offsetUp]];
			} else if (this.rotations === 3) {
				this.cubePositions = [[offsetRight, offsetUp], [offsetFarRight, offsetUp], [offsetRight, offsetFarUp], [offsetRight, yCoord]];
			} else {
				this.cubePositions = [[xCoord, yCoord], [offsetRight, yCoord], [offsetFarRight, yCoord], [offsetRight, offsetDown]];
				this.rotations = 0;
			}
				this.rotations += 1;
			break;
	}
}
*/