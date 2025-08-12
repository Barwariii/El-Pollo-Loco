/**
 * Represents the main game world where all entities, objects, and logic interact.
 * Handles rendering, updates, collisions, collectible management, and game state.
 * @class World
 * @property {Array<number>} intervals - Stores IDs of all intervals for easy clearing.
 * @property {HTMLCanvasElement} canvas - The canvas element used for rendering.
 * @property {CanvasRenderingContext2D} ctx - The rendering context for the canvas.
 * @property {Keyboard} keyboard - Keyboard input handler.
 * @property {number} camera_x - Horizontal camera offset for scrolling.
 * @property {statusBar} statusBar - General status bar instance.
 * @property {statusBarHealth} statusBarHealth - Health bar instance.
 * @property {statusBarCoins} statusBarCoins - Coins status bar instance.
 * @property {statusBarBottles} statusBarBottles - Bottles status bar instance.
 * @property {Array<ThrowableObject>} throwableobjects - List of throwable objects currently active.
 * @property {boolean} gameOver - Whether the game is over.
 * @property {boolean} gameWin - Whether the player has won.
 * @property {boolean} ended - Whether the game has ended (either win or lose).
 */
class World {

    intervals = [];

    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new statusBar();
    statusBarHealth = new statusBarHealth();
    statusBarCoins = new statusBarCoins();
    statusBarBottles = new statusBarBottles();
    throwableobjects = [];
    gameOverScreen = new Image();
    gameOver = false;
    gamewinerScreen = new Image();
    gameWin = false;
    ended = false;

    /**
     * Creates the game world with the given canvas and keyboard handler.
     * Initializes level, character, and assigns world references.
     * @param {HTMLCanvasElement} canvas - The game canvas.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.level = createLevel1();

        this.character = new Character();
        this.character.world = this;

        this.level.enemies.forEach(enemy => {
            enemy.world = this;
            if (enemy instanceof Endboss) {
                enemy.animate();
            }
        });

        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Assigns the world reference to the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts the game update loop for collision checks and object updates.
     */
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
        this.intervals.push(intervalId);
    }

    /**
     * Sets the end state of the game and calls endgame().
     * @param {'win'|'lose'} state - The final state of the game.
     */
    endState(state) {
        if (this.ended) return;
        this.ended = true;
        this.gameWin = state === 'win';
        this.gameOver = state === 'lose';
        this.endgame();
    }

    /**
     * Stops all intervals currently running in the world.
     */
    stopAllIntervals() {
        this.intervals.forEach(id => clearInterval(id));
        this.intervals = [];
    }

    /**
     * Checks if the player throws a bottle and updates the game state accordingly.
     */
    checkThrowableObject() {
        if (this.keyboard.wasDPressOnce() && this.character.bottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 80, this.character.y + 140);
            bottle.world = this;
            this.throwableobjects.push(bottle);
            this.character.bottles--;

            this.statusBarBottles.setBottlePercentage(
                Math.min(100, Math.round((this.character.bottles / this.level.totalBottles) * 100))
            );
            this.character.lastMoveTime = Date.now();
        }
    }

    /**
     * Checks and collects coins when the character collides with them.
     */
    checkCollectables() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isCollidingRedFrame(coin)) {
                this.level.coins.splice(index, 1);
                this.character.collectCoin();
            }
        });
    }

    /**
     * Checks and collects bottles when the character collides with them.
     */
    checkCollectableBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                this.character.collectBottle();
            }
        });
    }

    /**
     * Checks collisions between the character and enemies, applying damage if necessary.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.gameWin || this.gameOver) return;
            if (this.character.isColliding(enemy) && enemy.energy > 0) {
                if (this.character.speedY >= 0) {
                    let currentTime = Date.now();
                    if (currentTime - this.character.lastHit > 1000) {
                        this.character.hit();
                        this.statusBarHealth.setPercentage(this.character.energy);

                        if (this.character.isDead()) {
                            this.endState('lose');
                        }
                    }
                }
            }
        });
    }

    /**
     * Ends the game by stopping all loops, clearing objects, and showing the correct end screen.
     */
    endgame() {
        this.stopAllIntervals();

        this.level.enemies.forEach(enemy => {
            if (enemy.animationInterval) clearInterval(enemy.animationInterval);
            if (enemy.movementInterval) clearInterval(enemy.movementInterval);
        });
        this.level.enemies.length = 0;

        this.throwableobjects.forEach(obj => {
            if (obj.throwInterval) clearInterval(obj.throwInterval);
        });
        this.throwableobjects.length = 0;

        if (this.character.gravityInterval) clearInterval(this.character.gravityInterval);

        backgroundMusic.pause();
        document.querySelector('.mobile-controls').classList.add('hidden-controls');

        if (this.gameOver) {
            document.getElementById('gameOverScreen').style.display = 'flex';
        } else if (this.gameWin) {
            document.getElementById('winScreen').style.display = 'flex';
        }
    }

    /**
     * Checks if the character kills an enemy by jumping on it.
     */
    checkEnemiesCollisions() {
        const margin = 15;
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
                this.character.killEnemyOnJump = false;
                return true;
            }
            return false;
        });
    }

    /**
     * Main rendering loop for the game world.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.gameOver) {
            this.ctx.drawImage(this.gameOverScreen, 0, 0, this.canvas.width, this.canvas.height);
            return;
        } else if (this.gameWin) {
            this.ctx.drawImage(this.gamewinerScreen, 0, 0, this.canvas.width, this.canvas.height);
            return;
        } else {
            this.ctx.translate(this.camera_x, 0);

            this.addObjectsToMap(this.level.backgroundObjects);
            this.addObjectsToMap(this.level.clouds);
            this.addToMap(this.character);
            this.addObjectsToMap(this.level.enemies);
            this.addObjectsToMap(this.level.coins);
            this.addObjectsToMap(this.level.bottles);
            this.addObjectsToMap(this.throwableobjects);


            this.ctx.translate(-this.camera_x, 0);
            this.addToMap(this.statusBarHealth);
            this.addToMap(this.statusBarCoins);
            this.addToMap(this.statusBarBottles);
        }

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds multiple objects to the map.
     * @param {Array} objects - List of objects to draw.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Draws a single object to the map.
     * @param {MovableObject|DrawableObject} mo - The object to draw.
     */
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

    /**
     * Flips the given object horizontally before drawing.
     * @param {MovableObject} mo - The object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the object's original orientation after drawing.
     * @param {MovableObject} mo - The object to flip back.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
