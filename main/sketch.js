var x = 0;
function setup() {
  createCanvas(500, 500);
  background(255, 255, 0);
}
function draw() {
	background(255, 255, 0);
  fill(255, 0, 0);
  noStroke();
  ellipse(x,250,20);
  x += 0.5;
}
