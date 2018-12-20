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
  fill(255, 0, 255, 255)
  rect(mPos, mTop, mWidth, mHeight)
  rect(mPos, mTop+80, mWidth, mHeight)
  rect(mPos, mTop+160, mWidth, mHeight)
  rect(mPos, mTop+240, mWidth, mHeight)
  rect(mPos, mTop+320, mWidth, mHeight)
  fill(0)
  noStroke()
  text('Road', mPos+25, mTop+25)
  text('Start', mPos+25, mTop+105)
  text('Finish', mPos+25, mTop+185)
  text('Run', mPos+25, mTop+265)
  text('Clear', mPos+25, mTop+345)
  }
