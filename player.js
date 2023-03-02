class Player extends Actor {
  constructor(bulletManager) {
    super(createVector(width/2, height/2), 3);
    this.collide = new Rect(0, 0, 20, 40);
    this.lives = 3;

    this.bulletManager = bulletManager;

    this.bulletPosition = createVector(0, -30);
  }

  hasCollided(outcome) {
    this.isHit = outcome;

    if (this.isHit && !this.increment) {
      this.lives -= 1;
      this.increment = true;
      this.respawn();
    }
  }

  turnShip(key) {
    this.angle += key;
  }

  thrust(isOn) {
    if (isOn) {
      let thrust = createVector(0, 1);
      thrust.setHeading(this.angle - HALF_PI);
      this.acceleration.add(thrust);
    } else {
      // Stops infinite numbers
      if (this.velocity.mag() < 0.05) {
        this.acceleration.set(0, 0);
        this.velocity.set(0);
      } else {
        this.velocity.lerp(0, 0, 0, 0.03);
      }
    }
  }

  update(){
    this.velocity.limit(this.thrustLimit);
    // Acceleration changes the mover's velocity.
    this.velocity.add(this.acceleration);
    // Velocity changes the mover's position.
    this.position.add(this.velocity);
    this.acceleration.set(0, 0);

    this.loopEdge();
  }

  shoot(){
    let forwardVector = p5.Vector.fromAngle(this.angle - PI / 2, 30)
    this.bulletManager.addBullet(this.position, forwardVector, "red", 80);
  }

  engineOff() {
    // Stops infinite numbers
    if (this.velocity.mag() < 0.05) {
      this.acceleration.set(0, 0);
      this.velocity.set(0);
    } else {
      this.velocity.lerp(0, 0, 0, 0.03);
    }
  }

  keyRelease(isVert) {
    if (isVert) {
      this.velocity.y = 0;
    } else {
      this.velocity.x = 0;
    }
  }

  hyperspace() {
    this.position = createVector(
      random(100, width - 100),
      random(100, height - 100)
    );

    this.angle = random(0, 359);

    this.velocity.set(0);
  }

  respawn() {
    this.position = createVector(width / 2, height / 2);
    this.angle = 0;

    this.velocity.set(0);
  }

  drawShip(){
    push();
      if (this.isHit == true) fill("red");
      else fill("white");
      translate(this.position.x, this.position.y);
      rotate(this.angle);
      triangle(0, -20, 10, 20, -10, 20);
    pop();
  }

  drawDebugText(){
    text(this.angle, 10, 20);
    text(this.acceleration, 10, 40);
    text(this.velocity, 10, 60);
    text(this.position, 10, 80);
    text(this.isHit, 10, 100);
    text(this.test, 10, 120);
    text(this.lives, 10, height - 20);
    text(this.tip, 10, 140);
  }

  display() {
    this.drawShip();
    
    // this.bullet.display();
    // if(!this.bullet.isShot){
    //   this.bullet.updatePosition(this.position.x,this.position.y,this.angle);
    // }
    // else {
    //   this.bullet.update();
    // }

    this.collide.updatePosition(
      this.position.x - this.collide.w / 2,
      this.position.y - this.collide.h / 2
    );

    // const tip = createVector(0, -30);

    // push();
    //   translate(this.position.x, this.position.y);
    //   rotate(this.angle);
    //   let that = p5.Vector.add(tip, this.position);
    //   let those = that.rotate(this.angle);
    //   //circle(tip.x, tip.y, 10);
    // pop();

    this.drawDebugText();
  }
}
