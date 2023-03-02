class Bullet extends Actor {
  constructor(position, velocity, color, ttl) {
    super(position, 2);

    this.acceleration.set(velocity);

    //this.angle = angle;
    //this.isShot = false;
    
    this.color = color;
    this.ttl = ttl;
  }

  update(){
    this.ttl = max(this.ttl - 1, 0);
    super.update();
  }

  alive(){
    return this.ttl != 0;
  }

  draw(){
    push();
      fill(this.color);
      circle(this.position.x, this.position.y, 10);
    pop();

  }

  fire(){
    let thrust = createVector(0, 1);
    thrust.setHeading(this.angle - HALF_PI);
    this.acceleration.add(thrust);

    this.isShot = true;
  }

  updatePosition(x, y, angle) {
    this.position.x = x;
    this.position.y = y;
    this.angle = angle;
  }

  display() {
    

    
    if (this.isShot){
      text(this.position, 10, 160);   
      circle(this.position.x, this.position.y, 10);
      let onEdge = this.isOnEdge(this.position);
      if(onEdge){
        this.isShot = false;
      }
    }
    else{
      this.angle-=HALF_PI
      let a = 40 * cos(this.angle);
      let b = 40 * sin(this.angle);
  
      circle(a + this.position.x, b + this.position.y, 10);
      
    }
  }

  
}
