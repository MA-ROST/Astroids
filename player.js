class Player extends Actor {
	constructor(bulletManager, warp) {
		super(createVector(width / 2, height / 2), 3);
		this.lives = 3;

		this.radius = 20;

		this.bulletManager = bulletManager;

		this.bulletPosition = createVector(0, -30);

		this.warp = warp;
	}

	alive() {
		return this.lives > 0;
	}

	hasCollided() {
		if (!this.increment) {
			this.lives -= 1;
			this.increment = true;
			this.respawn();
		}
	}

	turnShip(key) {
		this.angle += key;
	}

	thrust(isOn) {
		if (isOn) {
			let thrust = createVector(0, 1);
			thrust.setHeading(this.angle - HALF_PI);
			this.acceleration.add(thrust);
		} else {
			// Stops infinite numbers
			if (this.velocity.mag() < 0.05) {
				this.acceleration.set(0, 0);
				this.velocity.set(0);
			} else {
				this.velocity.lerp(0, 0, 0, 0.03);
			}
		}
	}

	update() {
		this.velocity.limit(this.thrustLimit);
		// Acceleration changes the mover's velocity.
		this.velocity.add(this.acceleration);
		// Velocity changes the mover's position.
		this.position.add(this.velocity);
		this.acceleration.set(0, 0);

		this.loopEdge(30);
	}

	shoot() {
		if (!this.alive()) {
			return;
		}
		let forwardVector = p5.Vector.fromAngle(this.angle - HALF_PI, 30);
		this.bulletManager.addBullet(
			this.position,
			forwardVector,
			"red",
			175,
			true
		);

		let thrust = createVector(0, 0.1);
		thrust.setHeading(this.angle - HALF_PI);
		this.acceleration.sub(thrust);
	}

	engineOff() {
		// Stops infinite numbers
		if (this.velocity.mag() < 0.05) {
			this.acceleration.set(0, 0);
			this.velocity.set(0);
		} else {
			this.velocity.lerp(0, 0, 0, 0.03);
		}
	}

	keyRelease(isVert) {
		if (isVert) {
			this.velocity.y = 0;
		} else {
			this.velocity.x = 0;
		}
	}

	hyperspace() {
		if (!this.alive()) {
			return;
		}
		this.warp.play();
		this.position = createVector(
			random(100, width - 100),
			random(100, height - 100)
		);

		this.angle = random(0, 359);

		this.velocity.set(0);
	}

	respawn() {
		this.position = createVector(width / 2, height / 2);
		this.angle = 0;
		this.isHit = false;
		this.increment = false;

		this.velocity.set(0);
	}

	drawShip() {
		push();
		noFill();
		if (this.isHit == true) stroke("red");
		else stroke("white");
		translate(this.position.x, this.position.y);
		rotate(this.angle);
		triangle(
			0,
			-this.radius,
			this.radius / 2,
			this.radius,
			-this.radius / 2,
			this.radius
		);
		pop();
	}

	drawDebugText() {}

	display() {
		this.drawShip();
		this.drawDebugText();
	}
}
