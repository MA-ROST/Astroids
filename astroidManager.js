class AstroidManager {
  constructor() {
    this.astroids = [];
  }

  addAstroid(manager){
    this.astroids.push(new Astroid(2, 3, manager));
  }

  addAstroids(amount, manager){
    for (let i = 0; i < amount; i++) {
      this.astroids[i] = new Astroid(2, 3, manager);
    }
  }

  update() {
    for (let astroid of this.astroids) {
      astroid.update();
    }

    //this.asteroids = this.asteroids.filter((astroid) => astroid.alive());
  }

  draw() {
    for (let astroid of this.astroids) {
      astroid.draw();
    }
  }
}
