function Population(){
  // Array of cars
  this.cars = []
  // Create new Cars
  for(var i = 0; i < popSize; i++){
    this.cars[i] = new Car()
  }

  // Set starting position to every car
  this.getStarted = function(){
    for(var i = 0; i < popSize; i++){
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
    var nextGen = []
    for(var i = 0; i < chosenOnes; i++){
      var nc = this.cars[i].dna
      nextGen.push(new Car(nc))
      for(var x = 0; x < 400; x++){
        var nnc = nc.mutate()
        nextGen.push(new Car(nnc, true))
      }
    }
    this.cars = nextGen
  }

  this.checkRunners = function(){
    var sum = 0
    for(var i = 0; i < this.cars.length; i++){
      if(this.cars[i].crashed || this.cars[i].finished)
        sum++;
    }
    if(sum == this.cars.length){
      return true
    }
    else {
      return false
    }
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
