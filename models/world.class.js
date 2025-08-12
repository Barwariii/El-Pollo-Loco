class World {

    intervals = []; // <-- Array to store intervals

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
    gamewinerScreen = new Image(); // Add game win screen image
    gameWin = false; // Flag to check if game is won
    ended = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; // Store the canvas element
        this.keyboard = keyboard;

        this.level = createLevel1(); // <-- Create new level!


        // Only create character now and set the reference!
        this.character = new Character();
        this.character.world = this;

        // Assign the world object to all enemies
        this.level.enemies.forEach(enemy => {
            enemy.world = this; // Assign the world object to each enemy

            // Call animate() only after assigning the world object
            if (enemy instanceof Endboss) {
                enemy.animate();
            }
        });

        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this; // Assign the world object to the character
    }

    run() {
        const intervalId = setInterval(() => {
            if (this.ended) return;
            if (!this.gameOver && !this.gameWin) {
                this.checkCollectables();
                this.checkCollectableBottles();
                this.checkCollisions();
                this.checkEnemiesCollisions();
                this.checkThrowableObject();
            }
        }, 200);
        this.intervals.push(intervalId); // <-- store the interval ID
    }

    endState(state) {
        if (this.ended) return;
        this.ended =true;
        this.gameWin = state === 'win';
        this.gameOver = state === 'lose'
        this.endgame();
    }

    stopAllIntervals() {
        this.intervals.forEach(id => clearInterval(id));
        this.intervals = [];
    }

    checkThrowableObject() {
        if (this.keyboard.wasDPressOnce() && this.character.bottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 80, this.character.y + 140);
            bottle.world = this; // Assign the world object to the throwable bottle
            this.throwableobjects.push(bottle);
            this.character.bottles--;

            this.statusBarBottles.setBottlePercentage(
                Math.min(100, Math.round((this.character.bottles / this.level.totalBottles) * 100))
            );
            this.character.lastMoveTime = Date.now();
        }
    }

    /**
     * Check if the character is colliding with the coin and remove it from the level
     */
    checkCollectables() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isCollidingRedFrame(coin)) {
                this.level.coins.splice(index, 1); // Remove the coin from the level
                this.character.collectCoin(); // Update the coin count and status bar
            }
        });
    }

    /**
     * Check if the character is colliding with the Bottles and remove it from the level
     */
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
            if (this.gameWin || this.gameOver) return;
            if (this.character.isColliding(enemy) && enemy.energy > 0) {
                // Check if the collision is not from above
                if (this.character.speedY >= 0) {
                    let currentTime = Date.now();
                    if (currentTime - this.character.lastHit > 1000) { // Ensure 1-second cooldown between hits
                        this.character.hit(); // Reduce character's energy
                        this.statusBarHealth.setPercentage(this.character.energy); // Update health status bar

                        if (this.character.isDead()) {
                            this.endState('lose');
                            // this.gameOver = true; // Set game over flag to true
                            // this.endgame(); // Trigger game over when character is dead
                        }
                    }
                }
            }
        });
    }


        endgame() {
        // 1. stop world loops
        this.stopAllIntervals();
        
        // 2. stop enemy animations and movements
        this.level.enemies.forEach(enemy => {
            if (enemy.animationInterval) clearInterval(enemy.animationInterval);
            if (enemy.movementInterval) clearInterval(enemy.movementInterval);
        });
        // 3. clear enemy list
        this.level.enemies.length = 0;

        // 4. stop throwable object loops and clear
        this.throwableobjects.forEach(obj => {
            if (obj.throwInterval) clearInterval(obj.throwInterval);
        });
        this.throwableobjects.length = 0;

        // 5. stop character gravity
        if (this.character.gravityInterval) clearInterval(this.character.gravityInterval);

        // 6. pause music and hide controls
        backgroundMusic.pause();
        document.querySelector('.mobile-controls').classList.add('hidden-controls');

        // 7. show correct screen
        if (this.gameOver) {
            document.getElementById('gameOverScreen').style.display = 'flex';
        } else if (this.gameWin) {
            document.getElementById('winScreen').style.display = 'flex';
        }
    }

    checkEnemiesCollisions() {
        const margin = 15; // Small margin to check that the descent is really from above.
        this.level.enemies.some((enemy) => {
            const characterBottom = this.character.y + this.character.height;
            const enemyTop = enemy.y;

            const isJumpKill =
                this.character.isColliding(enemy) &&
                (characterBottom > enemyTop) &&
                this.character.speedY < 0 &&
                enemy.energy > 0 &&
                !(enemy instanceof Endboss) &&
                this.character.killEnemyOnJump;

            if (isJumpKill) {
                enemy.energy -= 200;

                if (enemy.energy <= 0) {
                    setTimeout(() => {
                        const enemyIndex = this.level.enemies.indexOf(enemy);
                        if (enemyIndex > -1) {
                            this.level.enemies.splice(enemyIndex, 1);
                        }
                    }, 2000);
                }

                this.character.speedY = 0;
                this.character.killEnemyOnJump = false; // Prevents killing another enemy until jumping again.
                return true; // Stops at the first enemy that is killed.
            }
            return false;
        });
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.gameOver) {
            this.ctx.drawImage(this.gameOverScreen, 0, 0, this.canvas.width, this.canvas.height); // Draw game over screen
            console.log("DRAW:", "gameWin", this.gameWin, "gameOver", this.gameOver);
            return; // WICHTIG: Kein requestAnimationFrame mehr!
        } else if (this.gameWin) {
            this.ctx.drawImage(this.gamewinerScreen, 0, 0, this.canvas.width, this.canvas.height); // Draw game win screen
            console.log("DRAW:", "gameWin", this.gameWin, "gameOver", this.gameOver);
            return; // WICHTIG: Kein requestAnimationFrame mehr!
        } else {

            this.ctx.translate(this.camera_x, 0); // Move camera to the left with the character

            // Enemies for-loop
            this.addObjectsToMap(this.level.backgroundObjects);

            //* --------- Space for fixed objects ---------
            this.ctx.translate(-this.camera_x, 0); // Move back
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
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        // mo.drawRedFrame(this.ctx);

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