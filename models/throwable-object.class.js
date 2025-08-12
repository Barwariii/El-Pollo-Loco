class ThrowableObject extends MovableObject {

    hasCollided = false; // New property to prevent multiple collisions

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

    throw() {
        this.speedY = 25;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            this.x += 10;
            this.checkCollisionWithEnemies(); // Check collision with enemies
        }, 25);
    }

    checkCollisionWithEnemies() {
        this.world.level.enemies.forEach((enemy, index) => {
            if (enemy instanceof Endboss ? this.isCollidingRedFrame(enemy) : this.isColliding(enemy)) {
                this.hasCollided = true;
                this.bottle_sound.currentTime = 0; // Reset, falls schon gespielt wird
                this.bottle_sound.play(); // <-- Sound NUR hier beim Treffer!
                enemy.energy -= 10; // Reduce the enemy's energy by 10
                if (enemy instanceof Endboss && !enemy.isDead) {
                    enemy.state = 'hurt'; // <-- Hurt-Animation 
                }
                if (enemy.energy <= 0) {
                    if (!(enemy instanceof Endboss)) {
                        this.world.level.enemies.splice(index, 1); // Only remove regular enemies immediately.
                    }
                }
                this.destroy(); // Remove the bottle after the first collision
                return; // Exit the loop after the first collision
            }
        });
    }

    destroy() {
        clearInterval(this.throwInterval); // Stop the bottle's movement
        const index = this.world.throwableobjects.indexOf(this);
        if (index > -1) {
            this.world.throwableobjects.splice(index, 1); // Remove the bottle from the array
        }
    }
}