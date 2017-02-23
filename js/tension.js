class Point {
	constructor() {
		this.cx = Math.random() * width;
		this.cy = Math.random() * height;
		this.tx = 0;
		this.ty = 0;
	}
	click() {
		this.tx = Math.random() * width;
		this.ty = Math.random() * height;
	}
	lerp() {
		this.cx += (this.tx - this.cx) * 0.05;
		this.cy += (this.ty - this.cy) * 0.05;
	}
}

// set canvas
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
var width, height;
const points = new Set();

// set new targets
const click = () => {
	ctx.clearRect(0, 0, width, height);
	for (var p of points) p.click();
};

// resize canvas
const resize = () => {
	width = canvas.width = canvas.offsetWidth * 1;
	height = canvas.height = canvas.offsetHeight * 1;
	ctx.strokeStyle = "#222";
	ctx.lineWidth = 0.5;
	click();
};

window.addEventListener('resize', resize, false);
canvas.addEventListener('click', click, false);

// main loop
const run = () => {
	requestAnimationFrame(run);
	ctx.beginPath();
	for (var p of points) {
		p.lerp();
		ctx.lineTo(p.cx, p.cy);
	}
	ctx.stroke();
};

// let's go
resize();
for (var i = 0; i < 4; i++) points.add(new Point());
click();
run();
