var currentStart = 0, mutationRate = 0.15
var nextvelx = 0
var nextvely = 0
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
      this.cars[i].beginPos()
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
      var r = this.nextCpSelection()
      if(r)
        return
      successCounter = 0
      cpcounter++
      bestNow = 100000000
      bestTime = 100000000
      return
    }
    var nextGen = []
    var nc = this.cars[0].dna, scout = false
    for(var x = 0; x < newBorns; x++){
      if(x < 200){
        mutationRate = 0.4
        scout = true
      }
      else{
        mutationRate = 0.15
        scout = false
      }
      var nnc = nc.mutate(currentStart, mutationRate)
      nextGen.push(new Car(nnc, scout))
      nextGen[x].vel.x = nextvelx
      nextGen[x].vel.y = nextvely
    }
    this.cars = nextGen
  }
  //st sa prepisuje na nulu a nove generacie zacinaju zo zleho miesta
  //Next checkpoint generation
  this.nextCpSelection = function(){
    var model = this.cars[0]
    var nc = new DNA(model.nextDna), scout = false
    spawnX = beginX
    spawnY = beginY
    nextvelx = 0
    nextvely = 0
    newtime = 0 // model.nextStart
    currentStart = model.nextStart
    var nextGen = []
    for(var x = 0; x < newBorns; x++){
      if(x < 200){
        mutationRate = 0.4
        scout = true
      }
      else{
        mutationRate = 0.15
        scout = false
      }
      var nnc = nc.mutate(model.nextStart-1, mutationRate)
      nextGen.push(new Car(nnc, scout))
      if(cpcounter != checkpoints.length-1){
        nextGen[x].vel.x = nextvelx
        nextGen[x].vel.y = nextvely
      }
      if(cpcounter == checkpoints.length-1){
        nextGen[x].pos.x = beginX
        nextGen[x].pos.y = beginY
      }
    }
    this.cars = nextGen
    if(cpcounter == checkpoints.length-1){
        successCounter = 0
        nextvelx = 0
        nextvely = 0
        spawnX = beginX
        spawnY = beginY
        currentStart = lifespan
        finalGenes = model.dna.genes
        newtime = 0
        donezo = true
        return true;
    }
    return false;
  }

  // Check status of cars
  this.checkRunners = function(){
    var sum = 0, success = 0
    for(var i = 0; i < this.cars.length; i++){
      if(this.cars[i].crashed || this.cars[i].finished)
        sum++
      if(this.cars[i].finished)
        success++
    }
    if(success >= 1 || sum == this.cars.length){
      if(success >= 1)
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
      this.cars[i].calcFitness() //asi zmazat
    }
  }
}
