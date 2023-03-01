class Astroid extends Actor {
  constructor(position, speedd, size, manager) {
    super(position, speedd);

    // 3 = large
    // 2 = med
    // 1 = small
    this.size = size; 
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
    circle(this.position.x, this.position.y, 10 * this.size);
  }
}
