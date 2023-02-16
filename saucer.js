class Saucer extends Actor {
  constructor(position, speedd) {
    super(position, speedd);
  }

  move() {
    this.position.x += 1;

    if ( this.position.x > width){
        this.position.x = 0;
    }
  }

  display() {
    fill("red");
    circle(this.position.x, this.position.y, 10);
  }
}
