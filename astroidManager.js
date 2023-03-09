class AstroidManager {
  constructor() {
    this.astroids = [];
  }

  clearAstroids(){
    this.astroids.length = 0;
  }

  isEmpty() {
    if(this.astroids.length != 0){
      return false;
    }
    return true;
  }

  addAstroid(manager, size, position, angle) {
    if (position === undefined) {
      position = p5.Vector.random2D();
      position.x *= width + width/3;
      position.y *= height + height/3;
    }
    if (angle === undefined) {
      angle = random(10);
    }
    this.astroids.push(new Astroid(manager, size, position, angle));
  }

  addAstroids(amount, manager, size, position, angle) {
    for (let i = 0; i < amount; i++) {
      this.addAstroid(manager, size, position, angle);
    }
  }

  update() {
    for (let astroid of this.astroids) {
      astroid.update();
    }

    this.astroids = this.astroids.filter((astroid) => astroid.alive() == false);
    this.astroids = this.astroids.filter((astroid) => astroid.size > 0);
  }

  checkIfActorHitsAstroids(actor) {
    for (let astroid of this.astroids) {
      var d = dist(
        actor.position.x,
        actor.position.y,
        astroid.position.x,
        astroid.position.y
      );

      if (d <= astroid.radius + actor.radius/2) {
        actor.hasCollided();
        astroid.break();
      }
    }
  }

  draw() {
    for (let astroid of this.astroids) {
      astroid.draw();
    }
  }
}
