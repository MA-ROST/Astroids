class GameManager {
  constructor() {
    this.mode = [0, 1, 2];
    this.activeMode = 0;

    this.bulletManager = new BulletManager();
    this.astroidManager = new AstroidManager();
    this.astroidManager.addAstroids(10, this.astroidManager, 3);

    this.player = new Player(this.bulletManager);
    //let enemyLocat = createVector(0, height / 2);

    this.canEarnPoints = true;
  }

  keyPress(keyCode){
    if (keyCode == 32) {
      this.player.shoot();
    }
  
    if (keyCode == DOWN_ARROW) {
      this.player.hyperspace();
    }

    if(keyCode == 49){
      console.log("DAA");
      this.destroyAllAstroids();
    }
    if(keyCode == 50){
      console.log("KP");
      this.killPlayer();
    }
  }

  keyReleased(keyCode){
    if (keyCode === UP_ARROW) {
      this.player.engineOff();
    }
  }

  checkPlayerState(){
    //console.log(this.player.lives);
    return this.player.alive();
  }

  checkIfAstroidManagerEmpty(){
    return this.astroidManager.isEmpty();
  }

  drawPlayText(score){
    push();
    fill("grey");
    stroke("black");
    strokeWeight(4);
    text("LIVES: " + this.player.lives, 10, height - 20);
    text("SCORE: " + score, 200, height - 20);
    pop();
  }

  play(){
    let score = 0;
    score += this.bulletManager.checkIfHitAsteroid(
      this.astroidManager.astroids,
      this.canEarnPoints
    );

    this.astroidManager.checkIfPlayerHitsAstroids(this.player);

    this.astroidManager.draw();
    this.astroidManager.update();

    this.bulletManager.draw();
    this.bulletManager.update();

    this.player.display();
    this.player.update();

    this.keyCheck();

    return score;
  }

  pause(){
    this.astroidManager.draw();
    this.bulletManager.draw();
    this.player.display();
  }

  keyCheck(){
    if (keyIsDown(UP_ARROW)) {
      this.player.thrust(1);
    } else {
      this.player.thrust(0);
    }
  
    if (keyIsDown(LEFT_ARROW)) {
      this.player.turnShip(-0.05);
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.player.turnShip(0.05);
    }
  }

  restartGame(){
    this.astroidManager.clearAstroids();
    this.astroidManager.addAstroids(10, this.astroidManager, 3);
    this.player.lives = 3;
  }

  destroyAllAstroids(){
    this.astroidManager.clearAstroids();
  }
  killPlayer(){
    this.player.lives = 0;
  }
}
