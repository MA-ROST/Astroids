class Astroid extends Actor {
  constructor(position, speedd, size, manager) {
    super(position, speedd);

    // 3 = large
    // 2 = med
    // 1 = small
    this.size = size; 
    this.radius = this.size * 10;
    this.manager = manager;
  }

  hasCollided(outcome){
    this.isHit = outcome;

    if (this.isHit && !this.increment) {
      this.increment = true;

      this.size -= 1;
      if (this.size <= 0){
        // Die
      }
      else {
        // Break into two
      }
    }
  }

  display() {
    //circle(this.position.x, this.position.y, this.radius);
    push();
      translate(this.position.x, this.position.y);
      beginShape();
      for (let i = 0; i < 10; i++) {
        var angle = map (i, 0, 10, 0, TWO_PI);
        var x = this.radius * cos(angle);
        var y = this.radius * sin(angle);
        vertex(x,y);
      }
      endShape(CLOSE);

    pop();
  }
}
