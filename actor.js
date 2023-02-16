class Actor {
  constructor(position, speedd){
    this.position = position;
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    
    this.speed = speedd;
  }
  
  update(){
    this.velocity.limit(this.speed);
    
    // Acceleration changes the mover's velocity.
    this.velocity.add(this.acceleration);
    
    // Velocity changes the mover's position.
    this.position.add(this.velocity);
    text(this.velocity.mag(), 10, 40);
    
    this.acceleration.set(0, 0);
  }
  
  display(){
    circle(this.position.x, this.position.y, 10);
  }
}  