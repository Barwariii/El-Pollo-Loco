/**
 * Represents a normal chicken enemy that walks left and can die.
 * @class normalChicken
 * @extends MovableObject
 * @property {number} y - Vertical position on the canvas.
 * @property {{top:number,bottom:number,left:number,right:number}} offset - Collision offsets.
 */
class normalChicken extends MovableObject {
    height = 105;
    width = 105;
    y = 340;
    energy = 10;
    offset = {
        top: 10,
        bottom: 15,
        left: 6,
        right: 10,
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];

    /**
     * Creates a normal chicken, preloads sprites, sets position/speed, and starts animations.
     * @constructor
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 1200 + Math.random() * 500;
        this.speed = 1.2 + Math.random() * 0.25;
        this.animate();
    }


    /**
     * Starts the animation and movement loops.
     * - Animation loop: updates sprite frames every 100ms based on alive/dead state.
     * - Movement loop: moves left at ~60 FPS while alive and game not ended.
     * @returns {void}
     */
    animate() {
        this.animationInterval = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                // console.log('Chicken is dead');
            } else {
                this.playAnimation(this.IMAGES_WALKING);
                console.log('Chicken is walking');
            }
        }, 100);

        this.movementInterval = setInterval(() => {
            if (this.world && (this.world.gameWin || this.world.gameOver)) return;
            if (!this.isDead()) {
                this.moveLeft(); // Move only if the chicken is alive
            }
        }, 1000 / 60);
    }
}
