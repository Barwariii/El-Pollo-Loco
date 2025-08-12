/**
 * Represents a throwable object in the game (e.g., a bottle).
 * Throwable objects can be thrown, collide with enemies, and cause damage.
 * @class ThrowableObject
 * @extends MovableObject
 * @property {boolean} hasCollided - Whether the object has already collided (prevents multiple collisions).
 */
class ThrowableObject extends MovableObject {

    hasCollided = false;

    /**
     * Creates a throwable object at a specified position.
     * @param {number} x - The horizontal position.
     * @param {number} y - The vertical position.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 80;

        this.bottle_sound = new Audio('audio/bottle-sound.mp3');
        this.bottle_sound.volume = 0.05;
        this.bottle_sound.muted = localStorage.getItem('musicMuted') === 'true';
        allSounds.push(this.bottle_sound);

        this.throw();
    }

    /**
     * Starts the throwing motion and applies gravity.
     */
    throw() {
        this.speedY = 25;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            this.x += 10;
            this.checkCollisionWithEnemies();
        }, 25);
    }

    /**
     * Checks collision with enemies and applies damage when hit.
     * Removes regular enemies immediately when their energy reaches zero.
     */
    checkCollisionWithEnemies() {
        this.world.level.enemies.forEach((enemy, index) => {
            if (enemy instanceof Endboss ? this.isCollidingRedFrame(enemy) : this.isColliding(enemy)) {
                this.hasCollided = true;
                this.bottle_sound.currentTime = 0;
                this.bottle_sound.play();
                enemy.energy -= 10;
                if (enemy instanceof Endboss && !enemy.isDead) {
                    enemy.state = 'hurt';
                }
                if (enemy.energy <= 0) {
                    if (!(enemy instanceof Endboss)) {
                        this.world.level.enemies.splice(index, 1);
                    }
                }
                this.destroy();
                return;
            }
        });
    }

    /**
     * Destroys the throwable object and removes it from the world's throwable objects list.
     */
    destroy() {
        clearInterval(this.throwInterval);
        const index = this.world.throwableobjects.indexOf(this);
        if (index > -1) {
            this.world.throwableobjects.splice(index, 1);
        }
    }
}
