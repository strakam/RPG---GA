function Car(dna){

  // Position, velocity, acceleration
  this.pos = createVector(spawnX, spawnY)
  this.vel = createVector()
  this.acc = createVector()
    // Car status
  this.finished = false
  this.crashed = false
  if(dna)
    this.dna = dna
  else
    this.dna = new DNA()

  this.beginPos = function(){
    this.pos.x = spawnX
    this.pos.y = spawnY
    console.log(floor(this.pos.x))
  }
  // Calculate fitness

  // Applying force to a car
  this.applyForce = function(force){
    this.acc.add(force)
  }
  // Update
  this.update = function(){
    var finishDist = distances[floor(this.pos.x)][floor(this.pos.y)]
    if(finishDist < 30)
      this.finished = true
    else if(finishDist == -2 || finishDist == -1)
      this.crashed = true

    if(!this.finished || !this.crashed){
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
    fill(0, 100, 255, 255)
    translate(this.pos.x, this.pos.y);
    ellipse(0, 0, 6)

    pop()
  }
}
