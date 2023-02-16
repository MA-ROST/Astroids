let ship;

let enemy;

let speedd = 2;

function setup() {
  createCanvas(400, 400);

  let centerScreen = createVector(width / 2, height / 2);
  let enemyLocat = createVector(0, height / 2);

  ship = new Player(centerScreen, 2);
  enemy = new Saucer (enemyLocat, 2);
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
    ship.setAngle(-0.05);
  }

  if (keyIsDown(RIGHT_ARROW)) {
    ship.setAngle(0.05);
  }

  enemy.display();
  enemy.move();

}

function keyReleased() {
  if (keyCode === UP_ARROW) {
    ship.engineOff();
  }
}
