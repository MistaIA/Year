console.log(`I ran`);

const
	rotationAngle	= .75,
	edgeReduction	= .49,
	widthReduction	= .45,

	arcadeContainer	= document.querySelector(`#arcade-container`)
;

function setup() 
{
	createCanvas(500, 500)
		.parent(`#arcade-container`)
	;
	background(0, 0, 30);
	drawRootTrunk(width / 2, height - 50, 0, 75, 70);
	drawEdge(width / 2, height - 150, 0, 75, 150);
}

function drawEdge(x, y, angle, width, height)
{
	if(height < 2) return;

	noFill();
	stroke(255);
	strokeWeight(width);

	let vector	= createVector(0, -height);

	vector.rotate(angle);
	line(x, y, x + vector.x, y + vector.y);

	drawEdge(x + vector.x, y + vector.y, angle + rotationAngle, width * widthReduction, height * edgeReduction);
	drawEdge(x + vector.x, y + vector.y, angle - rotationAngle, width * widthReduction, height * edgeReduction);
}

function drawRootTrunk(x, y, angle, width, height)
{
	noFill();
	stroke(255);
	strokeWeight(width);

	let vector	= createVector(0, -height);

	vector.rotate(angle);
	line(x, y, x + vector.x, y + vector.y);
}