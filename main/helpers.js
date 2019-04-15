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
  if(mouseX > menuPos && mouseX < menuPos + menuWidth
    && mouseY > menuTop && mouseY < menuHeight+menuTop){
    modeNum = 0;
    return true;
  }
  if(mouseX > menuPos && mouseX < menuPos + menuWidth
    && mouseY > menuTop+80 && mouseY < menuHeight+menuTop+80){
    modeNum = 1;
    return true;
  }
  if(mouseX > menuPos && mouseX < menuPos + menuWidth
    && mouseY > menuTop+160 && mouseY < menuHeight+menuTop+160){
    modeNum = 2;
    return true;
  }
  if(mouseX > menuPos && mouseX < menuPos + menuWidth
    && mouseY > menuTop+240 && mouseY < menuHeight+menuTop+240){
    editor = false
    starter = true
    bfs();
    return true;
  }
  if(mouseX > menuPos && mouseX < menuPos + menuWidth
    && mouseY > menuTop+320 && mouseY < menuHeight+menuTop+320){
    background(230);
  }
  if(distances.length > 0){
    console.log(distances[mouseX][mouseY]);
  }
  return false;
}

function keyPressed(){
  if(key == 'e')
    editor = true;
  if(key == 'q')
    editor = false;
  if(key == 'p'){
    if(!pause)
      pause = true;
    else {
      pause = false
    }
  }
  if(key == 's'){
    trace = []
  }
}
