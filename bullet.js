class Bullet extends Actor {
  constructor(position, velocity, color, ttl) {
    super(position, 3);

    this.acceleration.set(velocity);

    this.color = color;
    this.ttl = ttl;
    this.isHit = false;
  }

  update() {
    this.ttl = max(this.ttl - 1, 0);
    console.log(this.position);
    super.update();
  }

  alive() {
    return this.ttl != 0;
  }

  draw() {
    push();
    fill(this.color);
    stroke(this.color);
    strokeWeight(4);
    point(this.position.x, this.position.y);
    pop();
  }
}
