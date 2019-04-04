function Car(dna, x){

  // Position, velocity, acceleration
  this.pos = createVector(spawnX, spawnY)
  this.vel = createVector()
  this.acc = createVector()
  this.lastPos = createVector()
    // Car status
  this.finished = false
  this.crashed = false
  this.fitness = 0
  this.penalty = 0 // Addition after crashing
  this.color = color(random(255), random(255), random(255), 255)

  if(dna){
    this.dna = dna
    this.color = color(0, 0, 0, 0)
  }
  else{
    this.dna = new DNA()
  }
  if(x){
    this.color = color(0, 0, 0, 255)
  }
  else{
    this.color = color(0, 255, 0, 255)
  }

  // Starting position
  this.beginPos = function(){
    this.pos.x = spawnX
    this.pos.y = spawnY
  }

  // Calculate fitness
  this.calcFitness = function(){
    if(this.crashes)
      this.fitness += penalty
    else
      this.fitness = distances[floor(this.lastPos.x)][floor(this.lastPos.y)]
  }
  // Applying force to a car
  this.applyForce = function(force){
    this.acc.add(force)
  }
  // Update
  // Posunut sa na dalsi CP ked uz viac generacii nebol ziadny progress
  this.update = function(){
    // Check distance from finish
    var finishDist = distances[floor(this.pos.x)][floor(this.pos.y)]
    if(finishDist < 5 && finishDist != -3){
      this.finished = true
    }
    else if(finishDist == -2 || finishDist == -3){
      this.crashed = true
    }

    //else if(finishDist <= checkpoints[cpcounter]){
      //this.finished = true
    //  done++
    //}
    if(!this.finished && !this.crashed){
      if(distances[floor(this.pos.x)][floor(this.pos.y)] > 0){
        this.lastPos = createVector(floor(this.pos.x), floor(this.pos.y))
        this.penalty = this.lastPos
      }
      this.applyForce(this.dna.genes[cnt])
      this.vel.add(this.acc)
      this.pos.add(this.vel)
      this.acc.mult(0)
      this.vel.limit(4)
    }
  }
  // Show
  this.show = function(){
    push()
    fill(this.color)
    translate(this.pos.x, this.pos.y);
    ellipse(0, 0, 10)
    pop()
  }
}
