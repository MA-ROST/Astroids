class Bullet extends Actor {
  constructor(position, thrustValue, angle) {
    super(position, thrustValue);
  }

  updatePosition(x, y, angle) {
    this.position.x = x;
    this.position.y = y;
    this.angle = angle;
  }

  display() {
    circle(this.position.x, this.position.y, 10);
  }
}
