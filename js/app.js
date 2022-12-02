/**
 | @author Ismael
 | @description Growing Baobab within a year
 | @GitHub MistaIA
 | @GitLab MistaIA
 | @version 1.00
 | 
 | @contributors : 
 */


const
	BG_WIDTH		= 1080,
	BG_HEIGHT		= 800,

	arcadeContainer	= document.querySelector(`#arcade-container`),
	growingTimer	= document.querySelector(`#growing-countdown`),

	currentDate		= new Date(),
	goalDate		= new Date(2023, 0, 1),

	DATE_RANGE		= createEnum({
		'START_AGE_GROWTH': 25,
		'MEDIUM_AGE_GROWTH': 15,
		'THIRD_AGE_GROWTH': 7,
	});
;
let
	initialWidth	= 180,
	initialHeight	= 90,
	strokeColor		= 255,
	growthGuard		= 5,
	alphaWidth		= .5,			// width reductor
	betaHeight		= .75,			// height reductor

	rotationAngle	= .7,
	edgeReduction	= .63,
	widthReduction	= .45
;


function setup() 
{
	createCanvas(BG_WIDTH, BG_HEIGHT)
		.parent(`#baobab-canvas`)
	;
	background(0, 0, 30);

	drawRoots(width / 2, height, 0, initialWidth, initialHeight);
	drawRootTrunk(width / 2, height - 10, 0, initialWidth, initialHeight);
	drawEdge(width / 2, height - 120, 0, initialWidth, initialHeight * 2);
}

function drawEdge(x, y, angle, width, height)
{
	if(growthGuard > height) return;

	noFill();
	stroke(strokeColor);
	strokeWeight(width);

	let vector	= createVector(0, -height);

	vector.rotate(angle);
	line(x, y, x + vector.x, y + vector.y);

	drawEdge(x + vector.x, y + vector.y, angle + rotationAngle, width * widthReduction * alphaWidth, height * edgeReduction);
	drawEdge(x + vector.x, y + vector.y, angle - rotationAngle, width * widthReduction, height * edgeReduction * betaHeight);
}

function drawRootTrunk(x, y, angle, width, height)
{
	noFill();
	stroke(strokeColor);
	strokeWeight(width);

	let vector	= createVector(0, -height);

	vector.rotate(angle);
	line(x, y, x + vector.x, y + vector.y);
}

function drawRoots(x, y, angle, width, height)
{
	if(2 > height) return;

	const
		rotationAngle	= .55,
		edgeReduction	= .63,
		widthReduction	= .45
	;

	noFill();
	stroke(strokeColor);
	strokeWeight(width);

	let vector	= createVector(0, height);

	vector.rotate(angle);
	line(x, y, x + vector.x, y + vector.y);

	drawRoots(x + vector.x, y + vector.y, angle + rotationAngle, width % widthReduction, height * edgeReduction);
	drawRoots(x + vector.x, y + vector.y, angle - rotationAngle, width % widthReduction, height * edgeReduction);
}

const Countdown	= {
	instance: undefined,

	getTimeLimit: function getTimeLimit(forwardDate, backwardDate){
		const timeLimit	= forwardDate - backwardDate;

		return timeLimit;
	},
	createCountModule: function createCountModule(){
		const _this	= this;

		_this.instance	= new JS_COUNT_MODULE({
			date: goalDate,

			onUpdate: function(data){
				let 
					_difference	= data.diffObjParsed,

					_days		= _difference.d,
					_hours		= _difference.h,
					_minutes	= _difference.m,
					_seconds	= _difference.s
				;
				console.log(DATE_RANGE);
				_this.$days.textContent		= zeroPadding(_days);
				_this.$hours.textContent	= zeroPadding(_hours);
				_this.$minutes.textContent	= zeroPadding(_minutes);
				_this.$seconds.textContent	= zeroPadding(_seconds);

				if(DATE_RANGE.START_AGE_GROWTH >= _days && DATE_RANGE.MEDIUM_AGE_GROWTH < _days)
				{
					console.log({'Start Age':25});
					betaHeight	= 1;
				}else if(DATE_RANGE.MEDIUM_AGE_GROWTH >= _days && DATE_RANGE.THIRD_AGE_GROWTH < _days)
				{
					console.log({'Medium Age':15});
					betaHeight		= 1;
					alphaWidth		= 1;
					initialWidth	= 200;
					initialHeight	= 100;
				}else if(DATE_RANGE.THIRD_AGE_GROWTH >= _days && 0 > _this.getTimeLimit(goalDate, currentDate))
				{
					console.log({'Third Age':7});
					betaHeight		= 1;
					alphaWidth		= 1;
					initialWidth	= 220;
					initialHeight	= 110;
					growthGuard		= 2;
				}
			},
			onComplete: function(data){
				document.querySelector(`.iacontent`)
					.style.display	= `grid`
				;

				const jsConfetti	= new JSConfetti();

				jsConfetti.addConfetti({
					emojis: [`⚡️`, `💥`, `✨`, `💫`, `🌸`, `🎊`, `🎐`,],
					confettiNumber: 150,
				});

				console.log({'Completed':0});
				betaHeight		= 1;
				alphaWidth		= 1;
				initialWidth	= 240;
				initialHeight	= 120;
				growthGuard		= 2;
			}
		});
	},
	init: function init(){
		this.$area		= growingTimer;

		this.$days		= growingTimer.querySelector(`.countdown-day`);
		this.$hours		= growingTimer.querySelector(`.countdown-hour`);
		this.$minutes	= growingTimer.querySelector(`.countdown-minute`);
		this.$seconds	= growingTimer.querySelector(`.countdown-second`);

		this.createCountModule();
	}
};

Countdown.init();
console.log(Countdown.getTimeLimit(goalDate, currentDate));
/**
 * Helpers
 */
function zeroPadding(number, fill = `0`) 
{
	return String(number).padStart(2, fill);
}

function createEnum(values)
{
	const enumObject	= {};

	for (const key in values)
		enumObject[key]	= values[key];

	return Object.freeze(enumObject);
}

/**
 * Page content
 */
document.addEventListener(`DOMContentLoaded`, _ => {
	document.querySelector(`#current-year`)
		.textContent	= `${currentDate.getFullYear()}`
	;
});