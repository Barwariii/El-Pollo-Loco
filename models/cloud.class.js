/**
 * Represents a moving cloud in the background.
 * Clouds move slowly to the left to create a parallax scrolling effect.
 * @class Cloud
 * @extends MovableObject
 * @property {number} y - Vertical position of the cloud.
 * @property {number} x - Horizontal position of the cloud.
 */
class Cloud extends MovableObject {
    y = -5;
    width = 500;
    height = 300;

    /**
     * Creates a cloud at a random horizontal position and starts its movement animation.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }

    /**
     * Continuously moves the cloud to the left at ~60 FPS.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}
