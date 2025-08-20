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
    rafId = null;

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

        this.setWorld(); 
        this.initEnemies();

        this.draw();
        this.run();
    }


    /**
     * Assign world references and start enemy logic.
    */
    initEnemies() {
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
            if (enemy instanceof Endboss) {
                enemy.animate();
            }
        });
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


        if (this.gameOver) {
            if (this.rafId) { cancelAnimationFrame(this.rafId); this.rafId = null; }
            this.stopAllIntervals();
            this.clearWorldInstantly();
        }

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
            if (this.character.isCollidingRedFrame(bottle)) {
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


    clearWorldInstantly() {
        this.level.enemies.length = 0;
        this.level.coins.length = 0;
        this.level.bottles.length = 0;
        this.throwableobjects.length = 0;

        if (this.character) {
            this.character.energy = 0;
            this.character.x = this.character.y = -9999;
        }

        this.renderBackgroundOnly();
    }


    /**
     * Ends the game by stopping all loops, clearing objects, and showing the correct end screen.
     */
    endgame() {
        this.stopGameLoops();
        this.stopEntityIntervals();
        this.clearAllEntities();
        this.finalizeUI();      
        this.renderBackgroundOnly();
        this.showSingleEndOverlay();
    }


    /**
    * ====== Helper ======
    * Stops all running animation and interval loops in the world.
    */
    stopGameLoops() {
        this.stopAllIntervals();
        if (this.rafId) { cancelAnimationFrame(this.rafId); this.rafId = null; }
    }


    /**
    * Clears individual entity-related intervals (enemies, throwable objects, character gravity).
    */
    stopEntityIntervals() {
        this.level?.enemies?.forEach(e => {
            if (e.animationInterval) clearInterval(e.animationInterval);
            if (e.movementInterval) clearInterval(e.movementInterval);
        });
        this.throwableobjects?.forEach(o => o.throwInterval && clearInterval(o.throwInterval));
        if (this.character?.gravityInterval) clearInterval(this.character.gravityInterval);
    }


    /**
    * Removes all entities (enemies, coins, bottles and throwable objects) from the world.
    */
    clearAllEntities() {
        if (this.level) {
            this.level.enemies.length = 0;
            this.level.coins.length = 0;
            this.level.bottles.length = 0;
        }
        this.throwableobjects.length = 0;
    }


    /**
    * Finalizes the UI after game end (pause music, hide mobile controls).
    */
    finalizeUI() {
        try { backgroundMusic?.pause?.(); } catch (_) { }
        document.querySelector('.mobile-controls')?.classList.add('hidden-controls');
    }


    /**
    * Shows either the win or lose overlay depending on the current state.
    */
    showSingleEndOverlay() {
        const winEl = document.getElementById('winScreen');
        const loseEl = document.getElementById('gameOverScreen');

        
        [winEl, loseEl].forEach(el => {
            if (!el) return;
            el.style.display = 'none';
            el.style.pointerEvents = 'none';
        });


        const show = (el) => { if (el) { el.style.display = 'flex'; el.style.pointerEvents = 'auto'; } };
        if (this.gameOver) show(loseEl);
        else if (this.gameWin) show(winEl);
    }


    /**
     * Clears the canvas and renders only the background elements.
     *
     * This resets the entire canvas using clearRect(), then draws the static
     * background and cloud layers based on the current camera position.
     * Useful when you want to show an empty world (e.g. before starting the game
     * or immediately after ending it) without character/enemy rendering.
    */
    renderBackgroundOnly() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.restore();
    }


    /**
     * Checks if the character kills an enemy by jumping on it.
     */
    checkEnemiesCollisions() {
        const enemy = this.level.enemies.find(e => this.isJumpKill(this.character, e));
        if (!enemy) return false;
        this.handleJumpKill(enemy);
        return true;
    }


    isJumpKill(c, e) {
        if (!c?.isColliding?.(e)) return false;
        if (e instanceof Endboss) return false;
        const characterBottom = c.y + c.height;
        const enemyTop = e.y;
        return (
            characterBottom > enemyTop &&
            c.speedY < 0 &&
            e.energy > 0 &&
            c.killEnemyOnJump
        );
    }


    handleJumpKill(enemy) {
        enemy.energy -= 200;
        if (enemy.energy <= 0) this.scheduleEnemyRemoval(enemy, 2000);
        this.afterJumpKillEffects();
    }


    scheduleEnemyRemoval(enemy, delay = 2000) {
        setTimeout(() => {
            const i = this.level.enemies.indexOf(enemy);
            if (i > -1) this.level.enemies.splice(i, 1);
        }, delay);
    }


    afterJumpKillEffects() {
        this.character.speedY = 0;
        this.character.killEnemyOnJump = false;
    }


    /**
     * Main rendering loop for the game world.
     */
    draw() {
        if (this.ended) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.gameOver) return this.drawEndScreen(this.gameOverScreen);
        if (this.gameWin) return this.drawEndScreen(this.gameWinnerScreen);

        this.renderWorld();
        this.renderHUD();
        this.rafId = requestAnimationFrame(() => this.draw());
    }


    drawEndScreen(img) {
        if (!img) return;
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    }


    renderWorld() {
        const L = this.level ?? {};
        this.ctx.save();
        this.ctx.translate(this.camera_x || 0, 0);
        this.addObjectsToMap(L.backgroundObjects || []);
        this.addObjectsToMap(L.clouds || []);
        this.addObjectsToMap(L.enemies || []);
        if (this.character) this.addToMap(this.character);
        this.addObjectsToMap(L.coins || []);
        this.addObjectsToMap(L.bottles || []);
        this.addObjectsToMap(this.throwableobjects || []);
        this.ctx.restore();
    }


    renderHUD() {
        [this.statusBarHealth, this.statusBarCoins, this.statusBarBottles]
            .forEach(sb => sb && this.addToMap(sb));
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
     * 
     * - draw frame and red frame for debugging.
     * mo.drawFrame(this.ctx);
     * mo.drawRedFrame(this.ctx);
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
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
