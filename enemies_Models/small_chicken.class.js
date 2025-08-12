class smallChicken extends MovableObject {
    height = 65;
    width = 65;
    y = 375;
    energy = 5;
    offset = {
        top: 60,
        bottom: 60,
        left: 4,
        right: 9,
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);


        this.x = 600 + Math.random() * 200;
        this.speed = 1.2 + Math.random() * 0.25;
        this.animate();
    }

    
    animate() {
        this.animationInterval = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                setTimeout(() => {
                    clearInterval(this.animationInterval);
                    clearInterval(this.movementInterval);
                }, 500); // Remove the chicken after 500ms
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50);

        this.movementInterval = setInterval(() => {
            if (this.world && (this.world.gameWin || this.world.gameOver)) return;
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }
}