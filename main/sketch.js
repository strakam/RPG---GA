// Editor mode variables
var editor = true, pause = true
// Parameters of blocks
var modeNum = 0
var blockType
var blockSize = [50, 15, 5]
// Starting position of racers
var spawnX, spawnY, starter = false, cango = false
// Checkpoint variables
var cnt = 0, cpfreq = 75, cpdifference = 1, cpcounter = 1, bestTime = 100000000, bestNow = 100000000
var successCounter = 0, successions = 2, newtime = 0
// Map grid
var pix = [], distances = [], track = [], checkpoints = [], trace = [], cplines = []
var trackLength = 0
var d = [-1, 0, 1, 0, 0, 1, 0, -1, -1, -1, 1, 1, -1, 1, 1, -1]
// Colors
var bg, road, finish
var thisframe = false, learningTime, minutes = 0, seconds = 0

function setup() {
  createCanvas(1300, 680);
  bg = [230, 230, 230, 255]; road = [128, 128, 128, 255]; finish = [255, 0, 0, 255]; cp = [255, 153, 255, 255];
  background(makeColor(bg))
  population = new Population()
  frameRate(60)
  blockType = [road, finish, cp]
}

function draw() {
  //if(pause)
	background(bg);
  if(mouseIsPressed){
    if(!isClicked()){
      if(editor){
        if(mouseX > 220)
          track.push([mouseX,mouseY,modeNum])
      }
      if(starter && cnt == 0){
        spawnX = mouseX
        spawnY = mouseY
        population.getStarted()
        cango = true
        starter = false
        learningTime = millis()
      }
    }
  }
  showBlocks()
  hovering()
  thisframe = false
  if(cango){
    population.run()
    cnt++
  }
  // Check whether its time to restart
  if(cnt == lifespan || population.checkRunners()){
    population.evaluate()
    population.selection()
    cnt = newtime
    trace = []
  }
}

function bfs(){
  showBlocks()
  loadPixels();
  var redX = -1, redY = -1;
  for(var x = 0; x < width; x++){
    pix[x] = []
    distances[x] = []
    for(var i = 0; i < height; i++){
      pix[x][i] = get(x, i)
      distances[x][i] = colorAssign(pix[x][i])
      var t = [get(x,i)[0], get(x,i)[1], get(x,i)[2], get(x,i)[3]]
    }
  }
  var q = []
  var bfsX = undefined, bfsY = undefined
  for(var i = 0; i < distances.length; i++)
    for(var x = 0; x < distances[i].length; x++)
      for(var t = 0; t < d.length; t+=2)
        if(!isOut(i+d[t], x+d[t+1]) && distances[i+d[t]][x+d[t+1]] == -2 && distances[i][x] == -1){
          bfsX = i; bfsY = x
        }
  if(bfsX == undefined && bfsY == undefined){
    return false
  }
  q.push([bfsX, bfsY, 0]);
  distances[bfsX][bfsY] = 0
  while(q.length > 0){
    var r = q.shift()
    var i = r[0], x = r[1]
    trackLength = r[2]
    for(var t = 0; t < d.length; t+=2)
      if(!isOut(i+d[t], x+d[t+1]) && distances[i+d[t]][x+d[t+1]] == -1){
        q.push([i+d[t], x+d[t+1], r[2]+1])
        if((r[2]+1) % cpfreq == 0)
          cplines.push([i, x, 2])
        distances[i+d[t]][x+d[t+1]] = r[2]+1
      }
  }
  for(var i = cpfreq; i < trackLength; i+=cpfreq)
    checkpoints.push(i)
  reverse(checkpoints)
  checkpoints.push(10)
  return true
}
