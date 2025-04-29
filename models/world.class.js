class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new statusBar();
    statusBarHealth = new statusBarHealth();
    statusBarCoins = new statusBarCoins();
    statusBarBottles = new statusBarBottles();
    throwableobjects = [];
    gameOverScreen = new Image(); // Add game over screen image
    gameOver = false; // Flag to check if game is over

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; // Access canvas on line 10
        this.keyboard = keyboard;
        this.gameOverScreen.src = 'img/9_intro_outro_screens/game_over/oh no you lost!.png'; // Set game over screen image
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            if (!this.gameOver) {
                // this.checkThrowables();
                this.checkCollectables();
                this.checkCollectableBottles();
                this.checkCollisions();
                this.checkEnemiesCollisions();
                this.checkThrowableObject();
                // this.moveCamera();
            }
        }, 200);
    }

    checkThrowableObject() {
        if (this.keyboard.D && this.character.bottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 80, this.character.y + 140);
            bottle.world = this; // Assign world
            this.throwableobjects.push(bottle);
            this.character.bottles--;
            console.log('Bottle thrown! Remaining bottles:', this.character.bottles);
            this.statusBarBottles.setBottlePercentage(
                Math.min(100, Math.round((this.character.bottles / this.level.totalBottles) * 100))
            );
        }
    }

    // Check if the character is colliding with the coin and remove it from the level
    checkCollectables() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1); // Remove the coin from the level
                this.character.collectCoin(); // Update the coin count and status bar
            }
        });
    }

    // Check if the character is colliding with the bottle and remove it from the level
    checkCollectableBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1); // Remove the bottle from the level
                this.character.collectBottle(); // Update the bottle count and status bar
            }
        });
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && enemy.energy > 0) {
                // Check if the collision is not from above
                if (this.character.speedY >= 0) {
                    let currentTime = Date.now();
                    if (currentTime - this.character.lastHit > 1000) { // Ensure 1-second cooldown between hits
                        this.character.hit(); // Reduce character's energy
                        this.statusBarHealth.setPercentage(this.character.energy); // Update health status bar
                        console.log('Character got hit by enemy. Remaining energy:', this.character.energy);

                        if (this.character.isDead()) {
                            this.endgame(); // Trigger game over when character is dead
                        }
                    }
                }
            }
        });
    }

    endgame() {
        this.gameOver = true; // Set the game over flag to true
        console.log('Game Over!'); // Log game over message
        document.getElementById('game-over-screen').style.display = 'flex'; // Show game over screen
    }

    // Check if the character is colliding with the enemy and remove it from the level
    checkEnemiesCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.speedY < 0 && enemy.energy > 0) {
                // Enemy loses energy only when hit from above
                enemy.energy -= 5;
                console.log('Collision with enemy, remaining energy:', enemy.energy);

                if (enemy.energy <= 0) {
                    console.log('Enemy defeated!');
                    // Add code here to remove or deactivate the enemy
                    // Remove the enemy after 2 seconds
                    setTimeout(() => {
                        const enemyIndex = this.level.enemies.indexOf(enemy); // Get the current index of the enemy
                        if (enemyIndex > -1) { // Ensure the enemy still exists
                            this.level.enemies.splice(enemyIndex, 1); // Remove the enemy from the array
                            console.log('Enemy removed from the game.');
                        }
                    }, 2000);
                }

                // Character bounces upwards
                this.character.speedY = 15;
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.gameOver) {
            this.ctx.drawImage(this.gameOverScreen, 0, 0, this.canvas.width, this.canvas.height); // Draw game over screen
            // return; // Stop drawing if the game is over
        } else {

            this.ctx.translate(this.camera_x, 0); // Move camera to the left with the character

            // Enemies for-loop
            this.addObjectsToMap(this.level.backgroundObjects);

            //* --------- Space for fixed objects ---------
            this.ctx.translate(-this.camera_x, 0); // Move back
            // this.addToMap(this.statusBar);
            this.addToMap(this.statusBarHealth);
            this.addToMap(this.statusBarCoins);
            this.addToMap(this.statusBarBottles);
            this.ctx.translate(this.camera_x, 0); // Move forwards

            this.addObjectsToMap(this.level.clouds);
            this.addToMap(this.character);
            this.addObjectsToMap(this.level.enemies);
            this.addObjectsToMap(this.level.coins);
            this.addObjectsToMap(this.level.bottles);
            this.addObjectsToMap(this.throwableobjects); // throwableobjects is a variable for thrown bottles  

            this.ctx.translate(-this.camera_x, 0); // Move camera to the right again with the character
        }

        let self = this; // Store 'this' in a variable because 'this' is not recognized in requestAnimationFrame
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        // this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        mo.drawRedFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}