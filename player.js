class Player extends Actor {
  constructor() {
    super(createVector(width/2, height/2), 2);
    this.collide = new Rect(0, 0, 20, 40);
    this.lives = 3;

    let bleh = createVector(0, -30);
    this.bullet = new Bullet(this.position.copy(), 2, this.angle);
  }

  hasCollided(outcome) {
    this.isHit = outcome;

    if (this.isHit && !this.increment) {
      this.lives -= 1;
      this.increment = true;
      this.respawn();
    }
  }

  setAngle(key) {
    this.angle += key;
  }

  thrust(key) {
    let thrust = createVector(0, 1);
    thrust.setHeading(this.angle - HALF_PI);
    this.acceleration.add(thrust);
  }

  engineOff() {
    if (this.velocity.mag() < 0.01) {
      // Stops infinite numbers
      this.velocity.set(0);
    } else {
      this.velocity.lerp(0, 0, 0, 0.02);
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

    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  respawn() {
    this.position = createVector(width / 2, height / 2);
    this.angle = 0;

    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  drawShip(){
    push();
      if (this.isHit == true) fill("red");
      else fill("white");
      translate(this.position.x, this.position.y);
      rotate(this.angle);
      triangle(0, -20, 10, 15, -10, 15);
    pop();
  }

  display() {
    this.drawShip();
    this.collide.updatePosition(
      this.position.x - this.collide.w / 2,
      this.position.y - this.collide.h / 2
    );

    const tip = createVector(0, -30);

    push();
      translate(this.position.x, this.position.y);
      rotate(this.angle);
      let that = p5.Vector.add(tip, this.position);
      let those = that.rotate(this.angle);
      //circle(tip.x, tip.y, 10);

      

    pop();

    text(this.angle, 10, 20);
    text(this.acceleration, 10, 40);
    text(this.velocity, 10, 60);
    text(this.position, 10, 80);
    text(this.isHit, 10, 100);
    text(this.test, 10, 120);
    text(this.lives, 10, height - 20);
    text(this.tip, 10, 140);
  }

  
}
