var justsaved = 200, justloaded = 200
function makeColor(arr){
  return color(arr[0], arr[1], arr[2], arr[3])
}

function colorAssign(arr){
  if(arr[0] == bg[0] && arr[1] == bg[1] && arr[2] == bg[2] && arr[3] == bg[3])
    return -3
  if(arr[0] == finish[0] && arr[1] == finish[1] && arr[2] == finish[2] && arr[3] == finish[3])
    return -2
  if(arr[0] == road[0] && arr[1] == road[1] && arr[2] == road[2] && arr[3] == road[3])
    return -1
}

function isOut(x, y){
  if(x >= width || x < 0 || y >= height || y < 0)
    return true
  return false
}

function saveData(counter){
  saveStrings(track, 'track'+counter+'.txt')
  //saveStrings([spawnX, spawnY], 'data'+counter+'.txt')
}
function loadData(file){
   loadStrings(file+'.txt', dataloaded);
}
function dataloaded(data){
  track = []
  for(var i = 0; i < data.length-1; i++)
    track.push(data[i].split(','))
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
function isClicked(){
  if(mouseX > 0 && mouseX < menuPos + menuWidth+40){
    if(mouseY > menuTop && mouseY < menuTop+40){
      modeNum = 0;
      return true
    }
    if(mouseY > menuTop+40 && mouseY < menuTop+80){
      modeNum = 1
      return true
    }
    if(mouseY > menuTop+80 && mouseY < menuTop+120){
      if(bfs()){
        starter = true
        editor = false
      }
      return true
    }
  }
  if(distances.length > 0)
    console.log(distances[mouseX][mouseY])
  return false
}

function keyPressed(){
  if(key == 'e')
    editor = true
  if(key == 'q')
    editor = false
  if(key == 'p'){
    if(!pause)
      pause = true
    else
      pause = false
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
