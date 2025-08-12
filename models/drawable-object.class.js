/**
 * Base class for all drawable objects in the game.
 * Provides functionality for loading images, drawing to canvas, and collision detection.
 * @class DrawableObject
 * @property {number} x - Horizontal position of the object.
 * @property {number} y - Vertical position of the object.
 * @property {Object<string, HTMLImageElement>} imageCache - Cached images for animations.
 * @property {number} currentImage - Index of the current animation frame.
 */
class DrawableObject {
    x = 120;
    y = 190;
    img;
    height = 250;
    width = 100;
    imageCache = {};
    currentImage = 0;

    /**
     * Loads a single image for the object.
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object on the given canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a blue debug frame around certain object types.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof smallChicken || this instanceof normalChicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * Draws a red debug frame around certain object types considering their collision offsets.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawRedFrame(ctx) {
        if (this instanceof Coins || this instanceof smallChicken || this instanceof normalChicken || this instanceof Character || this instanceof Bottles || this instanceof Endboss) {
            const xPos = this.x + this.offset.left;
            const yPos = this.y + this.offset.top;
            const width = this.width - this.offset.left - this.offset.right;
            const height = this.height - this.offset.top - this.offset.bottom;

            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(xPos, yPos, width, height);
            ctx.stroke();
        }
    }

    /**
     * Loads multiple images into the image cache.
     * @param {string[]} arr - Array of image file paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Checks if this object is colliding with another based on their red frame bounds.
     * @param {DrawableObject} other - Another drawable object to check collision with.
     * @returns {boolean} True if the objects collide, false otherwise.
     */
    isCollidingRedFrame(other) {
        const a = {
            left: this.x + (this.offset?.left || 0),
            right: this.x + this.width - (this.offset?.right || 0),
            top: this.y + (this.offset?.top || 0),
            bottom: this.y + this.height - (this.offset?.bottom || 0)
        };
        const b = {
            left: other.x + (other.offset?.left || 0),
            right: other.x + other.width - (other.offset?.right || 0),
            top: other.y + (other.offset?.top || 0),
            bottom: other.y + other.height - (other.offset?.bottom || 0)
        };
        return (
            a.right > b.left &&
            a.left < b.right &&
            a.bottom > b.top &&
            a.top < b.bottom
        );
    }
}
