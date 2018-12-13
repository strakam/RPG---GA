// Editor mode variables
var editor = true;
var modeNum = 0;
var blockType;
var blockSize = [40, 15];
// Position and dimensions of menu tabs
var mWidth = 80, mHeight = 40, mPos = 1150, mTop = 50;
// Starting position of racers
var spawnX, spawnY;
// Map grid
var pix = [], distances = [];
var created = false;
var d = [-1, 0, 1, 0, 0, 1, 0, -1, -1, -1, 1, 1, -1, 1, 1, -1];
// Colors
var bg, road, finish;

function setup() {
  createCanvas(1300, 680);
  bg = [230, 230, 230, 255]; road = [128, 128, 128, 255]; finish = [255, 0, 0, 255];
  background(makeColor(bg));
  frameRate(300);
  blockType = [road, finish];
}
function draw() {
	//background(255, 255, 0);
  noStroke();
  if(mouseIsPressed){
    if(!isClicked()){
      if(editor){
        fill(blockType[modeNum]);
        ellipse(mouseX,mouseY,blockSize[modeNum]);
      }
      else if(created){
        fill('green');
        ellipse(mouseX,mouseY,30);
        fill('white');
        text(distances[mouseX][mouseY], mouseX, mouseY);
      }
    }
  }
  if(editor){
    fill(255, 0, 255);
    strokeWeight(3);
    stroke(0);
  }
  else {
    fill(255);
    noStroke();
  }
  rect(mPos, mTop, mWidth, mHeight);
  rect(mPos, mTop+80, mWidth, mHeight);
  rect(mPos, mTop+160, mWidth, mHeight);
  rect(mPos, mTop+240, mWidth, mHeight);
  rect(mPos, mTop+320, mWidth, mHeight);
  fill(0);
  noStroke();
  text('Road', mPos+25, mTop+25);
  text('Start', mPos+25, mTop+105);
  text('Finish', mPos+25, mTop+185);
  text('Run', mPos+25, mTop+265);
  text('Clear', mPos+25, mTop+345);
}

function bfs(){
  loadPixels();
  var redX = -1, redY = -1;
  for(var x = 0; x < width; x++){
    pix[x] = []
    distances[x] = []
    for(var i = 0; i < height; i++){
      pix[x][i] = get(x, i);
      distances[x][i] = colorAssign(pix[x][i]);
      var t = [get(x,i)[0], get(x,i)[1], get(x,i)[2], get(x,i)[3]];
    }
  }
  fill('yellow');
  ellipse(mouseX,mouseY,100);
  created = true;
  var q = []
  var bfsX, bfsY;
  for(var i = 0; i < distances.length; i++){
    for(var x = 0; x < distances[i].length; x++){
      for(var t = 0; t < d.length; t+=2){
        if(!isOut(i+d[t], x+d[t+1]) && distances[i+d[t]][x+d[t+1]] == -2 && distances[i][x] == -1){
          bfsX = i; bfsY = x;
        }
      }
    }
  }
  q.push({bfsX, bfsY});
  console.log(bfsX)
  console.log(bfsY)
}
