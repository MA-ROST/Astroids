class Player extends Actor {
  constructor(position, speedd) {
    super(position, speedd);
    this.angle = 0;
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
    const vMag = this.velocity.mag();

    if (vMag < 0.05) {
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

  display() {
    push();
      translate(this.position.x, this.position.y);
      rotate(this.angle);
      triangle(0, -30, 10, 30, -10, 30);
    pop();

    text(this.angle, 10, 20);
    text(this.acceleration, 10, 40);
    text(this.velocity, 10, 60);
  }
}
