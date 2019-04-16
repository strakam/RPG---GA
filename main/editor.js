// Position and dimensions of menu tabs
var menuWidth = 150, menuHeight = 40, menuPos = 40, menuTop = 50
var roadHover = -15, lineHover = -15, runHover = -15
var rHoverin = false, lHoverin = false, runHoverin = false
function showBlocks(){
  for(var i = 0; i < track.length; i++){
    noStroke()
    fill(blockType[track[i][2]])
    ellipse(track[i][0],track[i][1],blockSize[track[i][2]])
  }
  for(var i = 0; i < trace.length; i++){
    noStroke()
    var cc = map(trace[i][2], 3, 6, 0, 1)
    //console.log(cc);
    fill(lerpColor(color(255, 0, 0), color(0, 255, 0), cc))
    ellipse(trace[i][0],trace[i][1], 5)
  }
  stroke(1)
  fill(255, 0, 255, 255)
  quad(0, menuTop, menuWidth+50, menuTop, menuWidth+10, menuTop+40, 0, menuTop+60)
  quad(0, menuTop+40, menuWidth+50, menuTop+40, menuWidth+10, menuTop+80, 0, menuTop+80)
  quad(0, menuTop+80, menuWidth+50, menuTop+80, menuWidth+10, menuTop+120, 0, menuTop+120)
  fill(255)
  quad(0, menuTop, roadHover+40, menuTop, roadHover, menuTop+40, -30, menuTop+40)
  quad(0, menuTop+40, lineHover+40, menuTop+40, lineHover, menuTop+80, 0, menuTop+80)
  quad(0, menuTop+80, runHover+40, menuTop+80, runHover, menuTop+120, 0, menuTop+120)
  noStroke()
  fill(0)
  text('Road', menuPos+25, menuTop+25)
  text('Line', menuPos+25, menuTop+65)
  text('Run', menuPos+25, menuTop+105)
  text(frameRate(), windowWidth - 200, menuTop+25)
}

function hovering(){
  if(mouseX > 0 && mouseX < menuPos + menuWidth+40){
    if(mouseY > menuTop && mouseY < menuTop+40){
      if(roadHover < 150)
        roadHover += 20
      rHoverin = true
    }
    if(mouseY > menuTop+40 && mouseY < menuTop+80){
      if(lineHover < 150)
        lineHover += 20
      lHoverin = true
    }
    if(mouseY > menuTop+80 && mouseY < menuTop+120){
      if(runHover < 150)
        runHover += 20
      runHoverin = true
    }
  }
  if(roadHover > -15 && !rHoverin)
    roadHover -= 20
  if(lineHover > -15 && !lHoverin)
    lineHover -= 20
  if(runHover > -15 && !runHoverin)
    runHover -= 20
  rHoverin = false
  lHoverin = false
  runHoverin = false
}
