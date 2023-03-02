class Astroid extends Actor {
  constructor(thrustValue, size, manager) {
    super(createVector(random(0, width), random(0, height)), thrustValue);

    // 3 = large
    // 2 = med
    // 1 = small
    this.size = size; 
    this.radius = this.size * 10;
    this.manager = manager;

    let speed = 1* (size/1.5);

    this.angle = random(10);

    let thrust = createVector(0,1);
    thrust.setHeading(this.angle - HALF_PI);
    this.velocity.add(thrust);

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
    this.loopEdge(this.radius+10);
  }

  draw() {
    push();
      translate(this.position.x, this.position.y);
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
