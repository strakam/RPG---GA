function DNA(genes){

  if(genes)
    this.genes = genes
  else {
    this.genes = []
    for(var i = 0; i < lifespan; i++){
      this.genes[i] = p5.Vector.random2D()
      this.genes[i].setMag(0.2)
    }
  }
  // Crossover

  // Mutation
}
