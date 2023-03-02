class AstroidManager {
  constructor() {
    this.asteroids = [];
  }

  update() {
    for (let astroid of this.asteroids) {
      astroid.update();
    }

    //this.asteroids = this.asteroids.filter((astroid) => astroid.alive());
  }

  draw() {
    for (const astroid of this.asteroids) {
      astroid.draw();
    }
  }
}
