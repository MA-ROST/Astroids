class Bullet extends Actor {
  constructor(position, speedd, angle) {
    super(position, speedd);
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
