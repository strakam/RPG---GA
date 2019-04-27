// Editor mode variables
var editor = true, turbo = false
// Parameters of blocks
var modeNum = 0
var blockType, blockSize = [50, 15, 5]
// Starting position of racers
var spawnX, spawnY, starter = false, cango = false
// Checkpoint variables
var cnt = 0, cpfreq = 100, cpdifference = 1, cpcounter = 1, successions = 3
var bestTime = 100000000, bestNow = 100000000, showcps = false
var successCounter = 0, newtime = 0
var checkpoints = [], trace = [], cplines = []
// Map grid
var pix = [], distances = [], track = []
var trackLength = 0
var d = [-1, 0, 1, 0, 0, 1, 0, -1, -1, -1, 1, 1, -1, 1, 1, -1]
// Colors
var bg, road, finish
var thisframe = false, learningTime, minutes = 0, seconds = 0, mfInput, msInput
function setup() {
  createCanvas(1300, 680);
  bg = [230, 230, 230, 255]; road = [128, 128, 128, 255]; finish = [255, 0, 0, 255]; cp = [255, 153, 255, 255];
  background(makeColor(bg))
  frameRate(10000)
  population = new Population()
  blockType = [road, finish, cp]
  inputs()
}

function draw() {
  if(!turbo){
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
          mfInput.input(setmaxforce)
          msInput.input(setmaxspeed)
          learningTime = millis()
        }
      }
    }
    showBlocks()
    hovering()
    thisframe = false
  }
  if(cango){
    population.run()
    cnt++
  }
  // Check whether its time to restart
  if(cnt == lifespan || population.checkStatus()){
    population.evaluate()
    population.selection()
    cnt = newtime
    trace = []
  }
}
