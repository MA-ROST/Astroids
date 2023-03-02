class AstroidManager {
  constructor() {
    this.astroids = [];
  }

  isEmpty() {
    return this.astroids.length.isEmpty;
  }

  addAstroid(manager, size, position, angle) {
    if (position === undefined) {
      position = createVector(random(0, width), random(0, height));
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

  checkIfPlayerHitsAstroids(player) {
    for (let astroid of this.astroids) {
      var d = dist(
        player.position.x,
        player.position.y,
        astroid.position.x,
        astroid.position.y
      );

      if (d <= astroid.radius + 10) {
        console.log("HIT");
        player.hasCollided();
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
