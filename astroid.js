class Astroid extends Actor {
  constructor(thrustValue, size, manager) {
    super(createVector(0, random(100, height - 100)), thrustValue);

    // 3 = large
    // 2 = med
    // 1 = small
    this.size = size; 
    this.radius = this.size * 10;
    this.manager = manager;

    this.total = floor(random(5,15));
    this.offset = [];
    for (let i = 0; i < this.total; i++) {
      this.offset[i] = random(-5,5);
    }
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

  update(){
    this.position.add(this.velocity);
  }

  draw() {
    //circle(this.position.x, this.position.y, this.radius);
    push();
      translate(width/2, this.position.y);
      beginShape();
      for (let i = 0; i < 10; i++) {
        var angle = map (i, 0, this.total, 0, TWO_PI);
        var r = this.radius+this.offset[i];
        var x = r * cos(angle);
        var y = r * sin(angle);
        vertex(x,y);
      }
      endShape(CLOSE);

    pop();
  }
}
