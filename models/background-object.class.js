/**
 * Represents a static background object in the game (e.g., scenery layers).
 * @class BackgroundObject
 * @extends MovableObject
 * @property {number} width - The width of the background object (default 720px).
 * @property {number} height - The height of the background object (default 480px).
 * @property {number} x - Horizontal position of the background object.
 * @property {number} y - Vertical position of the background object.
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Creates a background object at a given horizontal position.
     * @param {string} imagePath - The path to the background image file.
     * @param {number} x - The x-coordinate where the background object should be placed.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}
