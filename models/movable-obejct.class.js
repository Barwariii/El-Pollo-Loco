/**
 * Base class for all movable objects in the game.
 * Extends DrawableObject and adds movement, gravity, collision, and interaction logic.
 * @class MovableObject
 * @extends DrawableObject
 * @property {number} speed - Horizontal movement speed.
 * @property {boolean} otherDirection - Whether the object is facing the opposite direction.
 * @property {number} speedY - Vertical speed (used for jumping/falling).
 * @property {number} acceleration - Gravity acceleration.
 * @property {number} energy - Health/energy of the object.
 * @property {number} lastHit - Timestamp of the last hit.
 * @property {number} coins - Number of coins collected by the object.
 * @property {number} bottles - Number of bottles collected by the object.
 */
class MovableObject extends DrawableObject {
    speed = 0.3;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    coins = 0;
    bottles = 0;

    /**
     * Applies gravity to the object, updating vertical position and speed.
     */
    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0;
                if (this instanceof Character) {
                    this.killEnemyOnJump = true;
                }
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * ThrowableObject instances always return true.
     * @returns {boolean} True if above ground.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 90;
        }
    }

    /**
     * Checks if the object is colliding with another movable object.
     * @param {MovableObject} mo - The other movable object.
     * @returns {boolean} True if colliding.
     */
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }

    /**
     * Collects a coin, updates the total, and updates the coins status bar.
     */
    collectCoin() {
        this.coins += 1;
        if (this.world) {
            const totalCoins = this.world.level.totalCoins || 1;
            const coinsPercentage = Math.min(100, Math.round((this.coins / totalCoins) * 100));
            this.world.statusBarCoins.setCoinsPercentage(coinsPercentage);
        }
    }

    /**
     * Collects a bottle, updates the total, and updates the bottles status bar.
     */
    collectBottle() {
        this.bottles += 1;
        if (this.world) {
            const totalBottles = this.world.level.totalBottles || 1;
            const bottlesPercentage = Math.min(100, Math.round((this.bottles / totalBottles) * 100));
            this.world.statusBarBottles.setBottlePercentage(bottlesPercentage);
        }
    }

    /**
     * Reduces energy when hit and records the time of the hit.
     */
    hit() {
        this.energy -= 20;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is currently in a hurt state.
     * @returns {boolean} True if hurt within the last second.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} True if energy is 0 or less.
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Plays an animation from a given array of image paths.
     * @param {string[]} images - Array of image paths.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /** Moves the object to the right. */
    moveRight() {
        this.x += this.speed;
    }

    /** Moves the object to the left. */
    moveLeft() {
        this.x -= this.speed;
    }

    /** Makes the object jump by setting vertical speed. */
    jump() {
        this.speedY = 30;
    }

    /**
     * Called when the object is added to the world.
     * @param {object} world - Reference to the world instance.
     */
    onAddedToWorld(world) {
        this.world = world;
    }
}
