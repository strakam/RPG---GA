function DNA(genes){

  if(genes)
    this.genes = genes
  else {
    this.genes = []
    for(var i = 0; i < lifespan; i++){
      this.genes[i] = p5.Vector.random2D()
      this.genes[i].setMag(0.8)
    }
  }
  // Mutation
  this.mutate = function(){
    var pole = []
    for(var i = 0; i < lifespan; i++){
      var prob = 0.01+i/lifespan*0.03
      if(random(1) < prob){
        pole[i] = p5.Vector.random2D()
        pole[i].setMag(0.8)
      }
      else {
        pole[i] = this.genes[i]
      }
    }
    return new DNA(pole)
  }
}
