function DNA(genes){

  if(genes)
    this.genes = genes
  else {
    this.genes = []
    for(var i = 0; i < lifespan; i++){
      this.genes[i] = p5.Vector.random2D()
      this.genes[i].setMag(random(1))
    }
  }
  // Mutation
  this.mutate = function(mark){
    var pole = []
    for(var i = 0; i < lifespan; i++){
      var prob = 0.15
      if(i > mark){
        if(random(1) < prob){
          pole[i] = p5.Vector.random2D()
          pole[i].setMag(random(1))
        }
        else {
          pole[i] = this.genes[i]
        }
      }
      else {
        pole[i] = this.genes[i]
      }
    }
    return new DNA(pole)
  }
}
