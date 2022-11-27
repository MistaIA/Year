console.log(`I ran`);

const
	rotationAngle	= .75,
	edgeReduction	= .49,
	widthReduction	= .45
;

function setup() 
{
	createCanvas(500, 500);
	background(0, 0, 30);
	drawEdge(width / 2, height - 50, 0, 150, 75);
}

function drawEdge(x, y, angle, height, width)
{
	if(height < 2) return;

	noFill();
	stroke(255);
	strokeWeight(width);

	let vector	= createVector(0, -height);

	vector.rotate(angle);
	line(x, y, x + vector.x, y + vector.y);

	drawEdge(x + vector.x, y + vector.y, angle + rotationAngle, height * edgeReduction, width * widthReduction);
	drawEdge(x + vector.x, y + vector.y, angle - rotationAngle, height * edgeReduction, width * widthReduction);
}