class Player extends Actor {
  constructor(position, speedd) {
    super(position, speedd);
    this.collide = new Rect(0, 0, 20, 40);
    this.lives = 5;
  }

  hasCollided(outcome) {
    this.isHit = outcome;

    if (this.isHit && !this.increment) {
      this.lives -= 1;
      this.increment = true;
    }
  }

  setAngle(key) {
    this.angle += key;
  }

  thrust(key) {
    let thrust = createVector(0, 1);
    thrust.setHeading(this.angle - HALF_PI);
    this.acceleration.add(thrust);
  }

  engineOff() {
    if (this.velocity.mag() < 0.01) {
      // Stops infinite numbers
      this.velocity.set(0);
    } else {
      this.velocity.lerp(0, 0, 0, 0.02);
    }
  }

  keyRelease(isVert) {
    if (isVert) {
      this.velocity.y = 0;
    } else {
      this.velocity.x = 0;
    }
  }

  respawn() {
    this.position = createVector(
      random(100, width - 100),
      random(100, height - 100)
    );
  }

  display() {
    push();
    fill("white");
    if (this.isHit == true) fill("red");
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    triangle(0, -20, 10, 15, -10, 15);
    pop();

    this.collide.updatePosition(
      this.position.x - this.collide.w / 2,
      this.position.y - this.collide.h / 2
    );

    text(this.angle, 10, 20);
    text(this.acceleration, 10, 40);
    text(this.velocity, 10, 60);
    text(this.position, 10, 80);
    text(this.isHit, 10, 100);
    text(this.lives, 10, height - 20);
  }
}
