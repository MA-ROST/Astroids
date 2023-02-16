class Player extends Actor{}class Player extends Actor {
    constructor(position, speedd){
      super(position, speedd);
      
      this.angle = 0;
    }
    
    setAngle(key){
      this.angle += key;
    }
    
    thrust(){
      
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
      let angle = atan2(this.velocity.y/2, this.velocity.x/2);
      push();
        translate (this.position.x, this.position.y);
        rotate(this.angle);
        triangle(0, -30, 10, 30, -10, 30);
      pop();
    }
  }