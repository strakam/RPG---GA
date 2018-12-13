function makeColor(arr){
  return color(arr[0], arr[1], arr[2], arr[3]);
}

function colorAssign(arr){
  if(arr[0] == bg[0] && arr[1] == bg[1] && arr[2] == bg[2] && arr[3] == bg[3])
    return -3;
  if(arr[0] == finish[0] && arr[1] == finish[1] && arr[2] == finish[2] && arr[3] == finish[3])
    return -2;
  if(arr[0] == road[0] && arr[1] == road[1] && arr[2] == road[2] && arr[3] == road[3])
    return -1;
}

function isOut(x, y){
  if(x >= width || x < 0 || y >= height || y < 0)
    return true;
  return false;
}

function isClicked(){
  if(mouseX > mPos && mouseX < mPos + mWidth
    && mouseY > mTop && mouseY < mHeight+mTop){
    modeNum = 0;
    return true;
  }
  if(mouseX > mPos && mouseX < mPos + mWidth
    && mouseY > mTop+80 && mouseY < mHeight+mTop+80){
    modeNum = 1;
    return true;
  }
  if(mouseX > mPos && mouseX < mPos + mWidth
    && mouseY > mTop+160 && mouseY < mHeight+mTop+160){
    modeNum = 2;
    return true;
  }
  if(mouseX > mPos && mouseX < mPos + mWidth
    && mouseY > mTop+240 && mouseY < mHeight+mTop+240){
    editor = false;
    bfs();
    return true;
  }
  if(mouseX > mPos && mouseX < mPos + mWidth
    && mouseY > mTop+320 && mouseY < mHeight+mTop+320){
    background(230);
  }
  return false;
}

function keyPressed(){
  if(key == 'e')
    editor = true;
  if(key == 'q')
    editor = false;
}
