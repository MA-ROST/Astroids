class Saucer extends Actor {
  constructor(position, speedd) {
    super(position, speedd);
  }

  update() {
    this.position.x += this.speed;

    if (this.position.x > width) {
      this.position.x = 0;
      this.position.y = random(20, height - 20);
    }
  }

  display() {
    push();
    fill("red");
    circle(this.position.x, this.position.y, 10);
    pop();
  }
}
