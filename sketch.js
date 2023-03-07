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

  gameManager = new GameManager();

  //let enemyLocat = createVector(0, height / 2);
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
  if(!gameManager.checkPlayerState()){
    mode = 3;
    finishMode(false);
  }

  if (gameManager.checkIfAstroidManagerEmpty()) {
    mode = 3;
    finishMode(true);
  }

  gameManager.play();

  gameManager.drawPlayText(score);
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
