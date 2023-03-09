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
    this.noiseScale = 0.02;
    this.timeBetweenSpawn = 200; // change to 9 seconds

    this.radius = 5 * 10;
    this.direction = [0, 1];
    this.isMovingLeft = false;
    this.idleLocation = createVector(-40, -40);

    this.size = 2; // 1 small, 2 large
    const points = [1000, 200];
    this.worth = points[max(this.size - 1, 0)];
  }

  hasCollided() {
    this.deSpawn();
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
  }

  shoot() {
    let a = atan2(
      this.player.position.y - this.position.y,
      this.player.position.x - this.position.x
    );

    let aNoise = noise(this.noiseScale) * a;
    let forwardVector = p5.Vector.fromAngle(aNoise, 30);

    this.bulletManager.addBullet(
      this.position,
      forwardVector,
      "red",
      175,
      false
    );

    this.hasShot = true;
    this.noiseScale += 0.005;
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
    circle(this.position.x, this.position.y, this.radius);
    pop();
  }
}
