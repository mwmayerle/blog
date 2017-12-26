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

Tetromino.prototype.movePositionDown = function() {
	this.cubePositions.map(function(position) {
		position[1] += 50; //adds 50 to the vertical position of all cubes
		return position;
	});
};

Tetromino.prototype.rotateTetromino = function() {
	var context = getContext();
	// this.cubePositions.forEach(function(position) {
	// 	context.clearRect(position[0], position[1], 50, 50);
	// });
	this.redrawBackground();

	switch (this.shape) { //cube omitted b/c it doesn't rotate
		case 'stick':
			if (this.rotations === 1) {
				this.cubePositions = [[offsetRight, offsetUp], [offsetRight, offsetFarUp], [offsetRight, offsetFarUp - 50], [offsetRight, yCoord]];
				this.rotations += 1;
			} else {
				this.cubePositions = [[offsetLeft, offsetUp], [xCoord, offsetUp], [offsetRight, offsetUp], [offsetFarRight, offsetUp]];
				this.rotations -= 1;
			}
			break;
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