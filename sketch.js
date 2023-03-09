let player;
let saucer;

let bulletManager;
let astroidManager;
let gameManager;

let mode = 0;
let startBtn;
let resumeBtn;
let restartBtn;

let score = 0;
let canEarnPoints = true;
let winMode = false;

let thrustValue = 2;

function setup() {
  createCanvas(600, 600);

  gameManager = new GameManager();

  startBtn = createButton("START!");
  startBtn.position(width / 2 - 30, height - 100);

  resumeBtn = createButton("RESUME!");
  resumeBtn.position(width / 2 - 30, height - 100);
  resumeBtn.hide();

  restartBtn = createButton("RESTART!");
  restartBtn.position(width / 2 - 30, height - 100);
  restartBtn.hide();

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

  var restartPlay = function name() {
    mode = 1;
    winMode = false;
    gameManager.restartGame();
    restartBtn.hide();
  };
  restartBtn.mousePressed(restartPlay);
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
    finishMode();
  }
  fill("white");
  text("MODE = " + mode, 10, 60);

  if (!focused && mode == 1) {
    mode = 2;
  }
}

function keyReleased() {
  gameManager.keyReleased(keyCode);
}

function keyPressed() {
  if (keyCode == 69) {
    mode = 2;
  }

  gameManager.keyPress(keyCode);
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
  if (
    !gameManager.checkPlayerState() ||
    gameManager.checkIfAstroidManagerEmpty()
  ) {
    if (gameManager.checkIfAstroidManagerEmpty()) {
      winMode = true;
    }
    mode = 3;
    finishMode();
  }

  score += gameManager.play();
  gameManager.drawPlayText(score);
}

function freezeMode(context) {
  gameManager.pause();
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

function finishMode() {
  gameManager.pause();
  restartBtn.show();

  let state = "WIN!";
  if (!winMode) {
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
