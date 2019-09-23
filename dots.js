registerPaint('dots', class {

  // Whether Alpha is allowed - This is set to true by default, if it is set to false all colours used on the canvas will have full opacity, or alpha of 1.0
  static get contextOptions() { return {alpha: true}; }

  // use this function to retrieve any custom props defined for the element, return them in the specified array
  static get inputProperties() { return ['--mainColour']; }

  paint(ctx, size, props) {

  	// set size
  	const bounds = {
  		xBound: size.width/1.5,
  		yBound: size.height/1.5,
  		get x() {return Math.random()*this.xBound},
  		get y() {return Math.random()*this.yBound},
  		get width() {return (Math.random()*this.xBound)+100},
  		get height() {return (Math.random()*this.yBound)+100}
  	};

  	// set colour
  	const colour = props.get('--mainColour');

		dots(ctx, bounds.x, bounds.y, bounds.width, bounds.height, colour)

  }
});

function dots(context, x, y, width, height, colour) {
	const FULLCIRCLE = degToRad(360);
	const GAP = 39;
	const RADIUS = 3.5;


	context.translate(x, y);
	context.beginPath();
	context.fillStyle = colour;
	context.strokeStyle = colour;
	context.lineWidth = 1.0;
	
	// rotate -> degrees to rads
	// const ROTATE = randomInt(1, 3) === 1 ? degToRad(45) : 0;
	const ROTATE = degToRad(Math.random()*45);
	context.rotate(ROTATE);

	for (let y=GAP; y<height; y+=GAP) {
		for (let x=GAP; x<width; x+=GAP) {
			
			context.moveTo(x, y);
			context.arc(x, y, RADIUS, 0, FULLCIRCLE);
			context.fill();
			context.stroke();
			context.closePath();
		}
	}
	
	context.resetTransform();
}

// ================ UTILITY FUNCTIONS
// returns int between and including min & max
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
// returns radians from a degree value
function degToRad(degrees) {
	return degrees*(Math.PI/180);
}