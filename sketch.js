let player;
let enemy;

let bulletManager;
let astroidManager;
let gameManager;

let mode = 0;
let startBtn;
let resumeBtn;
let restartBtn;

let score = 0;
let canEarnPoints = true;

let thrustValue = 2;

function setup() {
  createCanvas(600, 600);

  gameManager = new GameManager(startBtn);
  bulletManager = new BulletManager();
  astroidManager = new AstroidManager();
  astroidManager.addAstroids(10, astroidManager, 3);

  //let enemyLocat = createVector(0, height / 2);

  player = new Player(bulletManager);
  //enemy = new Saucer(enemyLocat, 2.5);

  startBtn = createButton("START!");
  startBtn.position(width / 2 - 30, height - 100);
  resumeBtn = createButton("RESUME!");
  resumeBtn.position(width / 2 - 30, height - 100);
  resumeBtn.hide();

  var startToPlay = function name() {
    mode = 1;
    startBtn.hide();
  };
  startBtn.mousePressed(startToPlay);

  var freezeToPlay = function name() {
    mode = 1;
    resumeBtn.hide();
  };
  resumeBtn.mousePressed(freezeToPlay);
}

function draw() {
  background(0);

  if (mode == 0) {
    startMode();
  } else if (mode == 1) {
    playMode();
  } else if (mode == 2) {
    freezeMode();
  } else {
    finishMode(false);
  }
  fill("white");
  text("MODE = " + mode, 10, 60);
}

function keyReleased() {
  if (keyCode === UP_ARROW) {
    player.engineOff();
  }
}

function keyPressed() {
  if (keyCode == 32) {
    player.shoot();
  }

  if (keyCode == 69) {
    mode = 2;
  }

  if (keyCode == DOWN_ARROW) {
    player.hyperspace();
  }
}

function startMode() {
  push();

  fill("white");
  stroke("black");
  strokeWeight(4);
  textSize(24);
  textAlign(CENTER);
  text("ASTROIDS", width / 2, 200);

  pop();
}

function playMode() {
  if(!player.alive()){
    mode = 3;
    finishMode(false);
  }
  score += bulletManager.checkIfHitAsteroid(
    astroidManager.astroids,
    canEarnPoints
  );

  astroidManager.checkIfPlayerHitsAstroids(player);

  if (astroidManager.isEmpty()) {
    mode = 3;
    finishMode(true);
  }

  astroidManager.draw();
  astroidManager.update();

  bulletManager.draw();
  bulletManager.update();

  player.display();
  player.update();

  if (keyIsDown(UP_ARROW)) {
    player.thrust(1);
  } else {
    player.thrust(0);
  }

  if (keyIsDown(LEFT_ARROW)) {
    player.turnShip(-0.05);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.turnShip(0.05);
  }
  push();
  fill("grey");
  stroke("black");
  strokeWeight(4);
  text("LIVES: " + player.lives, 10, height - 20);
  text("SCORE: " + score, 200, height - 20);
  pop();
}

function freezeMode(context) {
  astroidManager.draw();
  bulletManager.draw();
  player.display();
  resumeBtn.show();

  push();
  fill(0, 150);
  rect(0, 0, width, height);

  fill("white");
  stroke("black");
  strokeWeight(4);
  textSize(24);
  textAlign(CENTER);
  text("PAUSED", width / 2, 200);

  pop();
}

function finishMode(isWin) {
  astroidManager.draw();
  bulletManager.draw();
  player.display();
  //restartBtn.show();

  let state = "WIN!";
  if (!isWin) {
    state = "LOST.";
  }

  push();
  fill(0, 150);
  rect(0, 0, width, height);

  fill("white");
  stroke("black");
  strokeWeight(4);
  textSize(24);
  textAlign(CENTER);
  
  text("YOU " + state, width / 2, 200);
  textSize(12);
  text("Score: " + score, width / 2, 250);

  pop();
}
