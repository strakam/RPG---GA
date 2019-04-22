var currentStart = 0, highMutation = 0.5, lowMutation = 0.15
var donezo = false
var finalGenes = []
// Population & lifespan
var population, newBorns = 1500, lifespan = 500
function Population(){
  // Array of cars
  this.cars = []
  // Create new Cars
  for(var i = 0; i < newBorns; i++)
    this.cars[i] = new Car()

  // Set starting position for every car
  this.getStarted = function(){
    for(var i = 0; i < this.cars.length; i++)
      this.cars[i].beginposition()
  }
  // Evaluate fitness of every car
  this.evaluate = function(){
    this.cars.sort(function(a, b){
      return a.fitness - b.fitness
    })
  }
//FIXNUT SOOOOOOOOOOOOOORTTTTTTTTTTTTT LEBO TO BLBNEEE
  // Create a new generation of cars
  this.selection = function(){
    if(successCounter == successions){
      currentStart = this.cars[0].nextStart
      if(cpcounter == checkpoints.length-1){
        finalGenes = this.cars[0].dna.genes
        donezo = true
        currentStart = bestTime
      }
      else{
        successCounter = 0
        cpcounter++
        bestNow = 100000000
        bestTime = 100000000
      }
    }
    var nextGen = []
    var nc = this.cars[0].dna, scout = false
    nextGen.push(new Car(nc, scout))
    for(var x = 0; x < newBorns; x++){
      if(x < 150){
        mutationRate = highMutation
        scout = true
      }
      else{
        mutationRate = lowMutation
        scout = false
      }
      var nnc = nc.mutate(currentStart, mutationRate)
      nextGen.push(new Car(nnc, scout))
    }
    this.cars = nextGen
  }
  // Check status of cars
  this.checkStatus = function(){
    var sum = 0, success = 0
    for(var i = 0; i < this.cars.length; i++){
      if(this.cars[i].crashed || this.cars[i].finished)
        sum++
      if(this.cars[i].finished)
        success++
    }
    if(success >= 6 || sum == this.cars.length){
      if(success >= 6)
        if(bestNow < bestTime)
          bestTime = min(bestTime, bestNow)
        else
          successCounter++;
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
