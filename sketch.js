let ship;

let speedd = 2;

function setup() {
  createCanvas(400, 400);

  let loca = createVector(width / 2, height / 2);

  ship = new Player(loca, 2);
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
}

function keyReleased() {
  if (keyCode === UP_ARROW) {
    ship.engineOff();
  }
}
