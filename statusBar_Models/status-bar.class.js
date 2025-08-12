/**
 * Base class for status bars such as health, coins, and bottles.
 * Extends DrawableObject to display a visual representation of percentage-based values.
 * @class statusBar
 * @extends DrawableObject
 * @property {string[]} IMAGES - Array of image paths representing different fill levels.
 * @property {number} percentage - Current percentage for health or general use.
 * @property {number} coinsPercentage - Current coin collection percentage.
 * @property {number} bottlePercentage - Current bottle collection percentage.
 */
class statusBar extends DrawableObject {

    /**
     * Array of status bar images, to be defined in subclasses.
     * @type {string[]}
     */
    IMAGES = [];

    /**
     * Sets the current percentage and updates the displayed image accordingly.
     * @param {number} percentagePara - A number from 0 to 100 representing the fill level.
     */
    setPercentage(percentagePara) {
        this.percentage = percentagePara;
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    /**
     * Resolves the appropriate image index based on the current percentage value.
     * @returns {number} Index of the image in the IMAGES array.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * Sets the current coin collection percentage and updates the displayed image.
     * @param {number} coinPercentagePara - A number from 0 to 100 representing the coin fill level.
     */
    setCoinsPercentage(coinPercentagePara) {
        this.coinsPercentage = coinPercentagePara;
        let imagePath = this.IMAGES[this.resolveCoinsImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    /**
     * Resolves the appropriate image index based on the current coin percentage.
     * @returns {number} Index of the image in the IMAGES array.
     */
    resolveCoinsImageIndex() {
        if (this.coinsPercentage == 100) {
            return 5;
        } else if (this.coinsPercentage > 80) {
            return 4;
        } else if (this.coinsPercentage > 60) {
            return 3;
        } else if (this.coinsPercentage > 40) {
            return 2;
        } else if (this.coinsPercentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * Sets the current bottle collection percentage and updates the displayed image.
     * @param {number} bottlePercentagePara - A number from 0 to 100 representing the bottle fill level.
     */
    setBottlePercentage(bottlePercentagePara) {
        this.bottlePercentage = bottlePercentagePara;
        let imagePath = this.IMAGES[this.resolveBottleImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    /**
     * Resolves the appropriate image index based on the current bottle percentage.
     * @returns {number} Index of the image in the IMAGES array.
     */
    resolveBottleImageIndex() {
        if (this.bottlePercentage == 100) {
            return 5;
        } else if (this.bottlePercentage > 80) {
            return 4;
        } else if (this.bottlePercentage > 60) {
            return 3;
        } else if (this.bottlePercentage > 40) {
            return 2;
        } else if (this.bottlePercentage > 10) {
            return 1;
        } else {
            return 0;
        }
    }
}
