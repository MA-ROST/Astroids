class Actor {
  constructor(position, thrustLimit) {
    this.position = position;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

    this.thrustLimit = thrustLimit;

    this.angle = 0;

    this.collide = new Rect(0, 0, 0, 0);

    this.isHit = false;
    this.increment = false;
  }

  update() {
    this.velocity.limit(this.thrustLimit);
    // Acceleration changes the mover's velocity.
    this.velocity.add(this.acceleration);
    // Velocity changes the mover's position.
    this.position.add(this.velocity);
    this.acceleration.set(0, 0);

    if (this.isOnEdge(this.position)) {
      this.loopEdge();
    }
  }

  isCollide(actor) {
    if (this.position.dist(actor.position) < 20) {
      this.hasCollided(true);
      actor.hasCollided(true);
    } else {
      this.hasCollided(false);
      actor.hasCollided(false);
      this.increment = false;
      actor.increment = false;
    }
  }

  hasCollided(outcome) {
    this.isHit = outcome;
  }

  isOnEdge(vect) {
    if (vect.x - 30 > width) {
      return true;
    }
    if (vect.x + 30 < 0) {
      return true;
    }

    if (vect.y - 30 > height) {
      return true;
    }
    if (vect.y + 30 < 0) {
      return true;
    }
    return false;
  }

  loopEdge() {
    if (this.position.x - 30 > width) {
      this.position.x = 0;
    }
    if (this.position.x + 30 < 0) {
      this.position.x = width;
    }

    if (this.position.y - 30 > height) {
      this.position.y = 0;
    }
    if (this.position.y + 30 < 0) {
      this.position.y = height;
    }
  }

  loopEdge(size) {
    if (this.position.x - size > width) {
      this.position.x = 0 - size;
    }
    if (this.position.x + size < 0) {
      this.position.x = width + size;
    }

    if (this.position.y - size > height) {
      this.position.y = 0 - size;
    }
    if (this.position.y + 30 < 0) {
      this.position.y = height + size;
    }
  }

  display() {
    circle(this.position.x, this.position.y, 10);
  }
}
