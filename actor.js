class Actor {
  constructor(position, speedd) {
    this.position = position;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

    this.speed = speedd;

    this.angle = 0;

    this.collide = new Rect (0,0,0,0);
  }

  update() {
    this.velocity.limit(this.speed);
    // Acceleration changes the mover's velocity.
    this.velocity.add(this.acceleration);
    // Velocity changes the mover's position.
    this.position.add(this.velocity);
    this.acceleration.set(0, 0);

    if (this.isOnEdge()){
      this.loopEdge();
    }
  }

  isCollide(actor){
    
  }

  isOnEdge(){
    if (this.position.x - 30 > width){
      return true;
    }
    if(this.position.x + 30 < 0){
      return true;
    }

    if(this.position.y - 30 > height){
      return true;
    }
    if(this.position.y + 30 < 0){
      return true;
    }
    return false;
  }

  loopEdge(){
    if (this.position.x - 30 > width){
      this.position.x = 0;
    }
    if(this.position.x + 30 < 0){
      this.position.x = width;
    }

    if(this.position.y - 30 > height){
      this.position.y = 0;
    }
    if(this.position.y + 30 < 0){
      this.position.y = height;
    }
  }

  display() {
    circle(this.position.x, this.position.y, 10);
  }
}
