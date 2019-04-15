function showBlocks(){
  if(editor){
    fill(255, 0, 255)
    strokeWeight(3)
    stroke(0)
  }
  else {
    fill(255)
    noStroke()
  }
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

  fill(255, 0, 255, 255)
  rect(menuPos, menuTop, menuWidth, menuHeight)
  rect(menuPos, menuTop+80, menuWidth, menuHeight)
  rect(menuPos, menuTop+160, menuWidth, menuHeight)
  rect(menuPos, menuTop+240, menuWidth, menuHeight)
  rect(menuPos, menuTop+320, menuWidth, menuHeight)
  fill(0)
  noStroke()
  text('Road', menuPos+25, menuTop+25)
  text('Start', menuPos+25, menuTop+105)
  text('Finish', menuPos+25, menuTop+185)
  text('Run', menuPos+25, menuTop+265)
  text('Clear', menuPos+25, menuTop+345)
  text(bestTime, windowWidth - 200, menuTop+25)
  }
