let ship;
let enemy;

let bulletManager;
let astroidManager;
let gameManager;

let startBtn;

let thrustValue = 2;

function setup() {
  createCanvas(400, 400);

  startBtn = createButton("START!");
  startBtn.position(0, 0);

  gameManager = new GameManager(startBtn);
  bulletManager = new BulletManager();
  astroidManager = new AstroidManager();

  let enemyLocat = createVector(0, height / 2);

  ship = new Player(bulletManager);
  //enemy = new Saucer(enemyLocat, 2.5);
  astroidManager.addAstroids(10, astroidManager);

  var startMode = function name() {
    gameManager.activeMode = 1;
    startBtn.hide();
  }
  startBtn.mousePressed(startMode);
}

function draw() {
  background(220);

  //enemy.display();
  //enemy.update();

  //ship.isCollide(enemy);
  bulletManager.checkIfHitAsteroid(astroidManager, astroidManager.astroids);

  gameManager.draw();

  astroidManager.draw();
  astroidManager.update();

  bulletManager.draw();
  bulletManager.update();

  ship.display();
  ship.update();

  if (keyIsDown(UP_ARROW)) {
    ship.thrust(1);
  } else {
    ship.thrust(0);
  }

  if (keyIsDown(LEFT_ARROW)) {
    ship.turnShip(-0.05);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    ship.turnShip(0.05);
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
