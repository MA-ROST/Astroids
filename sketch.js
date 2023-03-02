let ship;
let enemy;
let astroids = [];

let bulletManager;
let asteroidManager;

let thrustValue = 2;

function setup() {
  createCanvas(400, 400);

  bulletManager = new BulletManager();
  asteroidManager = new AstroidManager();

  let enemyLocat = createVector(0, height / 2);

  ship = new Player(bulletManager);
  //enemy = new Saucer(enemyLocat, 2.5);
  for (let i = 0; i < 10; i++) {
    astroids.push(new Astroid(2, 3));
  }
}

function draw() {
  background(220);

  ship.display();
  ship.update();

  if (keyIsDown(UP_ARROW)) {
    ship.thrust(1);
  } else {
    ship.engineOff();
  }

  if (keyIsDown(LEFT_ARROW)) {
    ship.turnShip(-0.05);
  }

  if (keyIsDown(RIGHT_ARROW)) {
    ship.turnShip(0.05);
  }

  //enemy.display();
  //enemy.update();

  //ship.isCollide(enemy);

  for (let i = 0; i < astroids.length; i++) {
    astroids[i].display();
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW) {
    ship.engineOff();
  }
}

function keyPressed() {
  if (keyCode == 32) {
    ship.shoot();
  }

  if (keyCode == DOWN_ARROW) {
    ship.hyperspace();
  }
}
