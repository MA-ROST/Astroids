class BulletManager {
  constructor() {
    this.bullets = [];
  }

  addBullet(position, velocity, color, ttl, isFromPlayer) {
    //console.log("adding bullet");
    this.bullets.push(
      new Bullet(position.copy(), velocity.copy(), color, ttl, isFromPlayer)
    );
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

  checkIfHitActor(actor, isPlayer) {
    let numDestroyed = 0;
    for (const bullet of this.bullets) {
      var d = dist(
        bullet.position.x,
        bullet.position.y,
        actor.position.x,
        actor.position.y
      );

      if(bullet.isFromPlayer != isPlayer){
        
        if (d <= actor.radius && !bullet.isHit) {
          console.log("HIT");
          actor.hasCollided();
          if(bullet.isFromPlayer && !isPlayer){
            numDestroyed += actor.worth;
          }
          bullet.isHit = true;
        }
      }
    }
    this.bullets = this.bullets.filter((bullet) => bullet.isHit == false);

    return numDestroyed;
  }

  checkIfHitAsteroid(astroids, canBeHit) {
    let numDestroyed = 0;
    for (const bullet of this.bullets) {
      for (const astroid of astroids) {
        var d = dist(
          bullet.position.x,
          bullet.position.y,
          astroid.position.x,
          astroid.position.y
        );

        if (d < astroid.radius - 2 && !bullet.isHit) {
          console.log("HIT");
          astroid.break();
          numDestroyed += astroid.worth;
          bullet.isHit = true;
        }
      }
    }
    this.bullets = this.bullets.filter((bullet) => bullet.isHit == false);
    return numDestroyed;
  }
}
