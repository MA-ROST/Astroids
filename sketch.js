let ship;

let speedd = 2;

function setup() {
  createCanvas(400, 400);
  
  
  
  let loca = createVector(width/2, height/2);
  
   ship = new Actor(loca, 2);
}

function draw() {
  background(220);
  
  ship.display();
  ship.update();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    ship.keyPress(createVector(0, -speedd));
  } else if (keyCode === DOWN_ARROW) {
    ship.keyPress(createVector(0, speedd));
  }
  
  
  
  if (keyCode === LEFT_ARROW) {
    ship.keyPress(createVector(-speedd, 0));
  } else if (keyCode === RIGHT_ARROW) {
    ship.keyPress(createVector(speedd, 0));
  }
}


function keyReleased() {
  if (keyCode === UP_ARROW) {
    ship.keyRelease(true);
  } else if (keyCode === DOWN_ARROW) {
    ship.keyRelease(true);
  }
  
  if (keyCode === LEFT_ARROW) {
    ship.keyRelease(false);
  } else if (keyCode === RIGHT_ARROW) {
    ship.keyRelease(false);
  }
}