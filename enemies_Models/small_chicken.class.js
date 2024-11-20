class smallChicken extends MovableObject {
    height = 65;
    width = 65;
    y = 360;
    energy = 20;
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


        this.x = 800 + Math.random() * 500;
        this.speed = 0.2 + Math.random() * 0.25;
        this.animate();
    }

    animate() {

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);

        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {

            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 50);
    }
}