function Population(){
  // Array of cars
  this.cars = []
  // Create new Cars
  for(var i = 0; i < newBorns; i++){
    this.cars[i] = new Car()
  }

  // Set starting position to every car
  this.getStarted = function(){
    for(var i = 0; i < this.cars.length; i++){
      this.cars[i].beginPos()
    }
  }
  // Evaluate fitness of every car
  this.evaluate = function(){
    this.cars.sort(function(a, b){
      return a.fitness - b.fitness
    })
  }
  // Create a new generation of cars
  this.selection = function(){

    if(successCounter == successions){
      this.nextCpSelection()
      successCounter = 0
      cpcounter++
      bestNow = 100000000
      bestTime = 100000000
      console.log('this hist');
      return;
    }
    var nextGen = []
    for(var i = 0; i < chosenOnes; i++){
      var nc = this.cars[i].dna
      nextGen.push(new Car(nc))
      for(var x = 0; x < newBorns; x++){
        var nnc = nc.mutate(this.cars[i].dnaMark)
        nextGen.push(new Car(nnc, true))
      }
    }
    this.cars = nextGen
  }

  //Next checkpoint generation
  this.nextCpSelection = function(){
    var nc = this.cars[0].dna
    spawnX = this.cars[0].nextPosition.x
    spawnY = this.cars[0].nextPosition.y
    newtime = this.cars[0].st
    console.log('cords');
    console.log(spawnX)
    console.log(spawnY);
    var nextGen = []
    for(var x = -4; x < newBorns * chosenOnes; x++){
      var nnc = nc.mutate(this.cars[0].dnaMark)
      nextGen.push(new Car(nnc, true))
    }
    this.cars = nextGen
  }

  this.checkRunners = function(){
    var sum = 0, success = 0
    for(var i = 0; i < this.cars.length; i++){
      if(this.cars[i].crashed || this.cars[i].finished)
        sum++
      if(this.cars[i].finished)
        success++
    }
    if(success >= chosenOnes || sum == this.cars.length){
      console.log('success ' + success);
      if(success >= chosenOnes){
        if(bestNow < bestTime){
          bestTime = min(bestTime, bestNow)
          console.log('best time ' + bestTime);
        }
        else {
          successCounter++;
        }
        console.log('bestNow ' + bestNow);
        console.log('successCounter ' + successCounter);
      }
      return true
    }
    else
      return false
  }
  // Function that updates position and displays all cars
  this.run = function(){
    for(var i = 0; i < this.cars.length; i++){
      this.cars[i].update()
      this.cars[i].show()
      this.cars[i].calcFitness()
    }
  }
}
