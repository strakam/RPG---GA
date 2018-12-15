function Population(){
  // Array of cars
  this.cars = []
  this.matingPool = []
  //Population size
  this.popSize = 50

  for(var i = 0; i < this.popSize; i++){
    this.cars[i] = new Car()
  }

  this.getStarted = function(){
    for(var i = 0; i < this.popSize; i++){
      this.cars[i].beginPos()
    }
  }
  this.evaluate = function(){

  }

  this.selection = function(){

  }

  // Function that updates position and displays all cars
  this.run = function(){
    for(var i = 0; i < this.cars.length; i++){
      this.cars[i].update()
      this.cars[i].show()
    }
  }
}
