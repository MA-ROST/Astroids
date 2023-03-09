class Saucer extends Actor {
  constructor(position, speedd, bulletManager, player) {
    super(position, speedd);

    this.player = player;
    this.bulletManager = bulletManager;

    this.isShipSpawned = false;
    this.shootingMode = false;
    this.shouldDespawn = false;

    this.hasShot = false;
    this.bulletCooldown = 40;
    this.timeBetweenSpawn = 200; // change to 9 seconds

    this.direction = [0, 1];
    this.isMovingLeft = false;

    this.idleLocation = createVector(-40, -40);
  }

  spawn() {
    let dir = random(this.direction);

    let x = 0;
    if (dir == 0) {
      console.log("Left");
      this.isMovingLeft = true;
    } else {
      console.log("Right");
      x = width;
      this.isMovingLeft = false;
    }

    // sets x and y
    this.position = createVector(x, random(20, height - 20));

    this.isShipSpawned = true;
    this.shootingMode = true;
  }

  move() {
    this.debugShoot();

    if (this.isMovingLeft) {
      if (this.position.x > width) {
        this.shootingMode = false;
        this.shouldDespawn = true;
      } else {
        this.position.x += this.thrustLimit;
      }
    } else {
      if (this.position.x < 0) {
        this.shootingMode = false;
        this.shouldDespawn = true;
      } else {
        this.position.x -= this.thrustLimit;
      }
    }

    this.bulletCooldown = max(this.bulletCooldown - 1, 0);
    if (this.bulletCooldown == 0 && !this.hasShot) {
      this.shoot();
    }

    //console.log(this.position);
  }

  debugShoot(){
    let l = p5.Vector.lerp(this.position, this.player.position, 0.5);
    push();
    fill("blue");
    circle(l.x, l.y, 10);
    pop();
    
  }

  shoot() {
    console.log("Shoot");
    let l = p5.Vector.lerp(this.position, this.player.position, 0.5);
    l.setMag(1);

    console.log(l);
    push();
    fill("red");
    circle(l.x, l.y, 10);
    pop();

    this.bulletManager.addBullet(this.position, l, "red", 400, true);

    this.hasShot = true;
  }

  deSpawn() {
    this.position = this.idleLocation;
    this.bulletCooldown = 40;
    this.timeBetweenSpawn = 200;
    this.shootingMode = false;
    this.isShipSpawned = false;
    this.shouldDespawn = false;
    this.hasShot = false;
  }

  update() {
    this.timeBetweenSpawn = max(this.timeBetweenSpawn - 1, 0);
    if (this.timeBetweenSpawn == 0) {
      if (!this.isShipSpawned) {
        this.spawn();
      } else if (this.shootingMode) {
        this.move();
      } else if (this.shouldDespawn) {
        this.deSpawn();
      }
    } else {
      this.position = this.idleLocation;
    }
  }

  display() {
    push();
    fill("green");
    circle(this.position.x, this.position.y, 10);
    pop();
  }
}
