var maxforce = 0.35, maxspeed = 4
function Car(dna, x){
  // position, velocityo, acceleration
  this.velocity = createVector()
  this.position = createVector(spawnX,spawnY)
  this.acceleration = createVector()
  this.lastposition = createVector()
    // Car status
  this.nextStart = 0
  this.finished = false
  this.crashed = false
  this.fitness = 0
  this.color = color(random(255), random(255), random(255), 255)

  if(dna){
    this.dna = dna
    this.color = color(0, 0, 0, 0)
  }
  else
    this.dna = new DNA()
  if(!x)
    this.color = color(0, 0, 0, 255)
  else
    this.color = color(200, 0, 255, 255)

  // Starting positionition
  this.beginposition = function(){
    this.position.x = spawnX
    this.position.y = spawnY
  }

  // Calculate fitness
  this.calcFitness = function(){
    this.fitness = distances[floor(this.lastposition.x)][floor(this.lastposition.y)]
  }
  // Applying force to a car
  this.applyForce = function(force){
    force.limit(maxforce)
    this.acceleration.add(force)
  }

  this.update = function(){
    // Check distance from finish
    if(!this.finished && !this.crashed){
      if(distances[floor(this.position.x)][floor(this.position.y)] > 0)
        this.lastposition = createVector(floor(this.position.x), floor(this.position.y))
      if(!donezo)
        this.applyForce(this.dna.genes[cnt])
      else
        this.applyForce(finalGenes[cnt])
      this.velocity.add(this.acceleration)
      this.velocity.limit(maxspeed)
      this.position.add(this.velocity)
      if(!thisframe && currentStart > cnt){
        trace.push([this.position.x, this.position.y, mag(this.velocity.x, this.velocity.y)])
        thisframe = true
      }
      this.acceleration.mult(0)
    }
    var finishDist = distances[floor(this.position.x)][floor(this.position.y)]
    if(finishDist == -2 || finishDist == -3)
      this.crashed = true
    else if(finishDist <= checkpoints[cpcounter] && finishDist != -3){
      bestNow = min(bestNow, cnt)
      this.finished = true
    }
    if(finishDist <= checkpoints[cpcounter-cpdifference] && this.nextStart == 0 && finishDist != -3)
      this.nextStart = cnt
  }
  // Show
  this.show = function(){
    var angle = this.velocity.heading() + PI / 2
    push()
    translate(this.position.x, this.position.y)
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
