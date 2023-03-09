class BulletManager {
  constructor(shoot, destroy1, destroy2) {
    this.shoot = shoot;
    this.destroy1 = destroy1;
    this.destroy2 = destroy2;
    this.bullets = [];
  }

  addBullet(position, velocity, color, ttl, isFromPlayer) {
    this.shoot.play();

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

      if (bullet.isFromPlayer != isPlayer) {
        if (d <= actor.radius && !bullet.isHit) {
          this.determineSFX(isPlayer);

          actor.hasCollided();
          if (bullet.isFromPlayer && !isPlayer) {
            numDestroyed += actor.worth;
          }
          bullet.isHit = true;
        }
      }
    }

    this.bullets = this.bullets.filter((bullet) => bullet.isHit == false);
    return numDestroyed;
  }

  determineSFX(isPlayer){
    if (!this.destroy1.isPlaying() && !isPlayer) {
      this.destroy1.play();
    } else if (isPlayer) {
      this.destroy2.play();
    }
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

        if (d < astroid.radius - 1 && !bullet.isHit) {
          this.destroy1.play();
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
