class Player extends Actor {
  constructor(position, speedd) {
    super(position, speedd);
    this.collide = new Rect (0,0,10,20);
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

  display() {
    push();
      translate(this.position.x, this.position.y);
      rotate(this.angle);
      triangle(0, -20, 10, 15, -10, 15);
      rectMode(RADIUS);
      rect(0,0,10,20);
    pop();

    text(this.angle, 10, 20);
    text(this.acceleration, 10, 40);
    text(this.velocity, 10, 60);

    text(this.position, 10, 80);
  }
}
