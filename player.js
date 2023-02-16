class Player extends Actor {
    constructor(position, speedd){
      super(position, speedd);
      
      this.angle = 0;
    }
    
    setAngle(key){
      this.angle += key;
    }
    
    thrust(key){
      let thrust = createVector(0,1);
      thrust.setHeading(this.angle-HALF_PI);
      this.acceleration.add(thrust);
    }
    
    keyRelease(isVert){
      if (isVert){
        this.velocity.y = 0;
      }
      else{
        this.velocity.x = 0;
      }
    }
    
    display(){
      push();
        translate (this.position.x, this.position.y);
        rotate(this.angle);
        triangle(0, -30, 10, 30, -10, 30);
      pop();
    }
  }