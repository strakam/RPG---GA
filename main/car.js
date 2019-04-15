function Car(dna, x){

  // Position, velocity, acceleration
  this.vel = createVector()
  this.pos = createVector(spawnX,spawnY)
  this.acc = createVector()
  this.lastPos = createVector()
    // Car status
  this.nextStart = 0
  this.finished = false
  this.crashed = false
  this.fitness = 0
  this.penalty = 0 // Addition after crashing
  this.nextvelx = 0
  this.nextvely = 0
  this.nextDna = []
  this.color = color(random(255), random(255), random(255), 255)

  if(dna){
    this.dna = dna
    this.color = color(0, 0, 0, 0)
  }
  else
    this.dna = new DNA()
  if(x)
    this.color = color(0, 0, 0, 255)
  else
    this.color = color(0, 255, 0, 255)

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
    force.limit(0.4)
    this.acc.add(force)
  }

  this.update = function(){
    // Check distance from finish
    if(!this.finished && !this.crashed){
      if(distances[floor(this.pos.x)][floor(this.pos.y)] > 0){
        this.lastPos = createVector(floor(this.pos.x), floor(this.pos.y))
        this.penalty = distances[this.lastPos.x][this.lastPos.y]
      }
      if(!donezo)
        this.applyForce(this.dna.genes[cnt])
      else
        this.applyForce(finalGenes[cnt])
      this.vel.add(this.acc)
      this.vel.limit(6)
      this.pos.add(this.vel)
      if(!thisframe && currentStart > cnt){
        trace.push([this.pos.x, this.pos.y, mag(this.vel.x, this.vel.y)])
        thisframe = true
      }
      this.acc.mult(0)
    }
    var finishDist = distances[floor(this.pos.x)][floor(this.pos.y)]
    if(finishDist < 5 && finishDist != -3 && finishDist != -2){
      this.finished = true
    }
    else if(finishDist == -2 || finishDist == -3){
      this.crashed = true
    }
    else if(finishDist <= checkpoints[cpcounter] && finishDist != -3){
      bestNow = min(bestNow, cnt)
      this.finished = true
    }
    if(finishDist <= checkpoints[cpcounter-cpdifference] && this.nextStart == 0 && finishDist != -3){
      //console.log('toto sa stane')
      this.nextPosition = createVector(this.pos.x, this.pos.y)
      this.nextStart = cnt
      this.nextvelx = this.vel.x
      this.nextvely = this.vel.y
      this.nextDna = this.dna.genes
    }
  }
  // Show
  this.show = function(){
    var angle = this.vel.heading() + PI / 2
    push()
    translate(this.pos.x, this.pos.y)
    rotate(angle)
    fill(this.color)
    beginShape()

    vertex(0, -4 * 2)
    vertex(-4, 4 * 2)
    vertex(4, 4 * 2)
    endShape(CLOSE)
    pop()
  }
}
