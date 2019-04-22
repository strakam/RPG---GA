// Position and dimensions of menu tabs
var menuWidth = 150, menuHeight = 40, menuPos = 50, menuTop = 50
var roadHover = -15, lineHover = -15, runHover = -15
var rHoverin = false, lHoverin = false, runHoverin = false
function showBlocks(){
  for(var i = 0; i < track.length; i++){
    noStroke()
    fill(blockType[track[i][2]])
    ellipse(track[i][0],track[i][1],blockSize[track[i][2]])
  }
  if(!pause)
  for(var i = 0; i < cplines.length; i++){
    noStroke()
    fill(blockType[2])
    ellipse(cplines[i][0], cplines[i][1], blockSize[2])
  }
  for(var i = 0; i < trace.length; i++){
    noStroke()
    var cc = map(trace[i][2], maxspeed/2, maxspeed, 0, 1)
    fill(lerpColor(color(255, 0, 0), color(0, 255, 0), cc))
    ellipse(trace[i][0],trace[i][1], 5)
  }
  stroke(1)
  fill(194, 8, 20, 255)
  quad(0, menuTop, menuWidth+50, menuTop, menuWidth+10, menuTop+40, 0, menuTop+60)
  quad(0, menuTop+40, menuWidth+50, menuTop+40, menuWidth+10, menuTop+80, 0, menuTop+80)
  quad(0, menuTop+80, menuWidth+50, menuTop+80, menuWidth+10, menuTop+120, 0, menuTop+120)
  fill(255)
  quad(0, menuTop, roadHover+40, menuTop, roadHover, menuTop+40, -30, menuTop+40)
  quad(0, menuTop+40, lineHover+40, menuTop+40, lineHover, menuTop+80, 0, menuTop+80)
  quad(0, menuTop+80, runHover+40, menuTop+80, runHover, menuTop+120, 0, menuTop+120)
  noStroke()
  fill(0)
  textSize(15)
  text('Road', menuPos+25, menuTop+25)
  text('Line', menuPos+25, menuTop+65)
  text('Run', menuPos+25, menuTop+105)
  strokeWeight(3)
  text('Best time', menuPos, menuTop+180)
  if(bestTime == 100000000)
    text('No success yet', menuPos, menuTop+210)
  else
    text(bestTime, menuPos, menuTop+210)
  text('Learning time', menuPos, menuTop+270)
  if((millis() - learningTime) > 60000){
    minutes++
    learningTime = millis()
  }
  if(learningTime != undefined)
    seconds = round((millis() - learningTime) / 1000)
  text(minutes + ' min ' + seconds + ' sec', menuPos, menuTop + 300)
}
