class normalChicken extends MovableObject {
    height = 105;
    width = 105;
    y = 325;
    energy = 10;
    offset = {
        top: 4,
        bottom: 9,
        left: 3,
        right: 5,
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 1200 + Math.random() * 500;
        this.speed = 1.2 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        // Animation: Chickens move and play animations
        this.animationInterval = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD); // Play death animation
            } else {
                this.playAnimation(this.IMAGES_WALKING); // Play walking animation
            }
        }, 200); // The animation changes every 200ms

        // Movement: Chickens continuously move to the left as long as they are not dead
        this.movementInterval = setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft(); // Move only if the chicken is alive
            }
        }, 1000 / 60); // Movement: 60 FPS
    }
}