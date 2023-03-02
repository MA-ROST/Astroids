class BulletManager {
  constructor() {
    this.bullets = [];
  }

  addBullet(position, velocity, color, ttl) {
    console.log("adding bullet");
    this.bullets.push(new Bullet(position.copy(), velocity.copy(), color, ttl));
  }

  update() {
    for (let bullet of this.bullets) {
      bullet.update();
    }

    this.bullets = this.bullets.filter((bullet) => bullet.alive());
  }

  draw() {
    for (const bullet of this.bullets) {
      bullet.draw();
    }
  }

  checkIfHitAsteroid(astroidManager, astroids) {
    for (const bullet of this.bullets) {
      for (const astroid of astroids) {
        var d = dist(
          bullet.position.x,
          bullet.position.y,
          astroid.position.y,
          astroid.position.x
        );

        if (d < astroid.radius - 5) {
          console.log("HIT");
          astroid.break();
        }
      }
    }
  }
}
